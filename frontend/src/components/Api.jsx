
import React, { useState, useEffect, useMemo, useRef } from "react";
import Images from "./Images";

const fetchFromLaionAPI = async (query, options, page, abortController) => {
  const response = await fetch("https://knn5.laion.ai/knn-service", {
    signal: abortController.signal,
    "body": JSON.stringify({
      text: query,
      modality: "image",
      num_images: 50 * page,
      indice_name: "laion5B",
      use_mclip: false,
      deduplicate: true,
      use_safety_model: true,
      use_violence_detector: true,
      aesthetic_score: "9",
      aesthetic_weight: "0.5",
      ...options
    }),
    method: "POST",
  });
  const data = await response.json();
  // Success: data = [{ caption: '', id: 1, similarity: 0.9, url: 'https://...'}]
  // Failure: data = { message: 'error messsage' }
  return data.map(obj => obj.url);
}

const useBadImages = () => {
  const [badImages, setBadImages] = useState([]);
  useEffect(() => {
    fetch("/api/bad-images")
      .then((response) => response.json())
      .then((badImages) => setBadImages(badImages));
  }, []);

  const addBadImage = async (url, type) => {
    const response = await fetch("/api/BadImages/createBadImage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ BadURL: url, type }),
    });
    const dataJ = await response.json();
    const newBadImages = [...badImages, dataJ];
    setBadImages(newBadImages);
  };

  const removeBadImage = async (type) => {
    const lastBadImageOfThisType = badImages.findLastIndex(bad => bad.type === type)
    if (lastBadImageOfThisType === -1) return;
    await fetch("/api/BadImages/" + badImages[lastBadImageOfThisType]._id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const newBadImages = [...badImages];
    newBadImages.splice(lastBadImageOfThisType, 1);
    setBadImages(newBadImages);
  }

  return [badImages, addBadImage, removeBadImage];
};

const useGoodImages = (query) => {
  const [goodImages, setGoodImagesValues] = useState({});

  useEffect(() => {
    if (!query) return;
    fetch(`/api/GoodImages/${query}`)
      .then((response) => response.json())
      .then((goodImages) => setGoodImagesValues(goodImages));
  }, [query]);

  const addGoodImage = async (type, { imageURL, image }) => {
    const body = new FormData();
    if (imageURL) body.append("imageURL", imageURL)
    if (image) body.append("image", image);
    body.append("type", type);

    const response = await fetch("/api/GoodImages/" + query, {
      method: "POST",
      body
    });
    const dataJ = await response.json();
    const newGoodImages = { ...goodImages };
    if (newGoodImages[type]) {
      newGoodImages[type] = [dataJ, ...newGoodImages[type]]
    } else {
      newGoodImages[type] = [dataJ];
    }
    setGoodImagesValues(newGoodImages);
  };

  const deleteGoodImage = async (type, id) => {
    const goodImageIndex = goodImages[type].findIndex(goodImage => goodImage._id === id)
    await fetch("/api/GoodImages/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const newGoodImages = { ...goodImages };
    if (newGoodImages[type].length === 1) {
      delete newGoodImages[type];
    } else {
      newGoodImages[type] = [...newGoodImages[type]]
      newGoodImages[type].splice(goodImageIndex, 1);
    }
    setGoodImagesValues(newGoodImages);
  };

  const selectGoodImage = async (type, id) => {
    await fetch("/api/GoodImages/select/" + id);
    const newGoodImages = { ...goodImages };
    newGoodImages[type] = newGoodImages[type].map(img => ({ ...img, selected: img._id === id }));
    setGoodImagesValues(newGoodImages);
  }

  const unselectGoodImage = async (type, id) => {
    await fetch("/api/GoodImages/unselect/" + id);
    const newGoodImages = { ...goodImages };
    newGoodImages[type] = newGoodImages[type].map(img => ({ ...img, selected: false }));
    setGoodImagesValues(newGoodImages);
  }

  return [goodImages, addGoodImage, deleteGoodImage, selectGoodImage, unselectGoodImage];
}

const useCustomQueries = (originalQuery) => {
  const [customQueries, setCustomQueriesValues] = useState({});

  useEffect(() => {
    if (!originalQuery) return;
    fetch(`/api/custom-query/${originalQuery}`)
      .then((response) => response.json())
      .then((customQueries) => setCustomQueriesValues(customQueries));
  }, [originalQuery]);

  const setCustomQuery = async (type, convertedQuery) => {
    const response = await fetch("/api/custom-query/" + originalQuery, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, convertedQuery }),
    });
    const dataJ = await response.json();
    const newCustomQueries = { ...customQueries };
    newCustomQueries[type] = dataJ;
    setCustomQueriesValues(newCustomQueries);
  };

  const deleteCustomQuery = async (type) => {
    const customQueryID = customQueries[type]._id;
    await fetch("/api/custom-query/" + customQueryID, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const newCustomQueries = { ...customQueries };
    delete newCustomQueries[type];
    setCustomQueriesValues(newCustomQueries);
  };

  return [customQueries, setCustomQuery, deleteCustomQuery];
};

const useFamousApi = () => {
  const [hasImages, setHasImages] = useState(false);
  const [famousRes, famousSetRes] = useState([]);
  const fetchRequestFamous = async (query, newBadImages, abortController) => {
    setHasImages(false);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, {}, page, abortController).catch(() => undefined);
      if (abortController.signal.aborted) return;
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    famousSetRes(usedUrls);
    setHasImages(true);
  };
  return [hasImages, famousRes, fetchRequestFamous];
};

const useCartoonApi = () => {
  const [hasImages, setHasImages] = useState(false);
  const [cartres, cartSetRes] = useState([]);
  const fetchRequestCartoon = async (query, newBadImages, abortController) => {
    setHasImages(false);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, {}, page, abortController).catch(() => undefined);
      console.log('cartoon aborted', abortController.signal)
      if (abortController.signal.aborted) return;
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    // should be good now +1
    cartSetRes(usedUrls);
    setHasImages(true);
  };
  return [hasImages, cartres, fetchRequestCartoon];
};

const useRealApi = () => {
  const [hasImages, setHasImages] = useState(false);
  const [res, setRes] = useState([]);
  const fetchRequestReal = async (query, newBadImages, abortController) => {
    setHasImages(false);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, { aesthetic_score: '5' }, page, abortController).catch(() => undefined);
      if (abortController.signal.aborted) return;
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    setRes(usedUrls);
    setHasImages(true);
  };
  return [hasImages, res, fetchRequestReal];
};

function usePrevious(initial, value) {
  const ref = useRef(initial);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function Api({ user }) {
  const [query, setQuery] = useState("");
  const prevQuery = usePrevious('', query);
  const [hasCartoon, cartres, fetchRequestCartoon] = useCartoonApi();
  const [hasReal, res, fetchRequestReal] = useRealApi();
  const [hasFamous, famousRes, fetchRequestFamous] = useFamousApi();
  const [customQueries, setCustomQuery, deleteCustomQuery] = useCustomQueries(query);
  const [goodImages, addGoodImage, deleteGoodImage, selectGoodImage, unselectGoodImage] = useGoodImages(query);
  const prevCustomQueries = usePrevious({}, customQueries);
  const [badImages, addBadImage, removeBadImage] = useBadImages();
  const prevBadImages = usePrevious([], badImages);

  const [showRerollDialog, setShowRerollDialogValue] = useState(localStorage.getItem('showRerollDialog') !== 'false');

  const setShowRerollDialog = (value) => {
    localStorage.setItem('showRerollDialog', value);
    setShowRerollDialogValue(value);
  };

  useEffect(() => {
    const realBadImages = badImages.filter(bad => bad.type === 'real');
    const oldRealBadImages = prevBadImages.filter(bad => bad.type === 'real');
    const badImagesChanged = realBadImages.length !== oldRealBadImages.length;
    const customQueriesChanged = customQueries.real?.convertedQuery !== prevCustomQueries.real?.convertedQuery;
    const queryChanged = query !== prevQuery;
    if (hasReal && !badImagesChanged && !customQueriesChanged && !queryChanged) return;

    const realQuery = customQueries.real?.convertedQuery || (query ? 'real ' + query : '');
    if (realQuery) {
      const abortController = new AbortController();
      fetchRequestReal(realQuery, realBadImages, abortController);
      return () => abortController.abort();
    }
  }, [hasReal, query, badImages, customQueries]);

  useEffect(() => {
    const cartoonBadImages = badImages.filter(bad => bad.type === 'cartoon');
    const oldCartoonBadImages = prevBadImages.filter(bad => bad.type === 'cartoon');
    const badImagesChanged = cartoonBadImages.length !== oldCartoonBadImages.length;
    const customQueriesChanged = customQueries.cartoon?.convertedQuery !== prevCustomQueries.cartoon?.convertedQuery;
    const queryChanged = query !== prevQuery;

    if (hasCartoon && !badImagesChanged && !customQueriesChanged && !queryChanged) return;

    const cartoonQuery = customQueries.cartoon?.convertedQuery || (query ? 'clipart ' + query : '');
    if (cartoonQuery) {
      const abortController = new AbortController();
      console.log('fetching cartoon', cartoonQuery);
      fetchRequestCartoon(cartoonQuery, cartoonBadImages, abortController);
      return () => {
        console.log('aborting cartoon', cartoonQuery);
        abortController.abort();
      }
    }
  }, [hasCartoon, query, badImages, customQueries])

  useEffect(() => {
    const famousBadImages = badImages.filter(bad => bad.type === 'famous');
    const oldFamousBadImages = prevBadImages.filter(bad => bad.type === 'famous');
    const badImagesChanged = famousBadImages.length !== oldFamousBadImages.length;
    const customQueriesChanged = customQueries.famous?.convertedQuery !== prevCustomQueries.famous?.convertedQuery;
    const queryChanged = query !== prevQuery;
    if (hasFamous && !badImagesChanged && !customQueriesChanged && !queryChanged) return;

    if (customQueries.famous) {
      const abortController = new AbortController();
      fetchRequestFamous(customQueries.famous.convertedQuery, famousBadImages, abortController);
      return () => abortController.abort();
    }
  }, [hasFamous, badImages, customQueries.famous?.convertedQuery]);

  const reRollButton = (url, type) => {
    addBadImage(url, type)
  };
  const submitCustomQuery = (type, convertedQuery) => {
    if (convertedQuery) return setCustomQuery(type, convertedQuery);
    else return deleteCustomQuery(type);
  };

  const undoBadImage = type => {
    removeBadImage(type);
  }

  const [printingImages, setPrintingImages] = useState([]);

  const handleImagePrintCheck = url => setPrintingImages(images => {
    const newImages = [...images];
    if (newImages.includes(url)) {
      newImages.splice(newImages.indexOf(url), 1);
    } else {
      newImages.push(url);
    }
    return newImages;
  });

  return (
    <div className="print:h-[80vh]">

      {/* BELOW is the input forms for rendering the images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <span></span>
        {user
          ?
          <form
            className="text-center flex flex-col xl:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(e.target.elements[0].value);
            }}
          >
            <input
              className="input flex-auto text-center xl:ml-24 input-bordered input-accent form-control-sm py-1 text-capitalize drop-shadow-[0_0_25px_rgba(0,0,0,.4)] border-2 border-[#ffffff50]"
              type="text"
              placeholder="Search for Images Here..."
            />
            <button type="submit" className="btn flex-auto btn-secondary">
              Submit
            </button>
          </form>
          : null
        }
        <label htmlFor="print-modal" className="btn w-max float-right justify-self-end mr-5"><i className="fa fa-print"></i></label>

        <input type="checkbox" id="print-modal" className="peer hidden" />
        <div className="hidden peer-checked:block cursor-pointer absolute top-0 left-0 right-0 w-[100vw] min-h-[100vh] bg-[#ffffffc4] z-10">
          <div className="flex justify-evenly print:hidden">
            <label htmlFor="print-modal" className="btn btn-pimary">Close</label>
            <button htmlFor="print-modal" className="btn btn-pimary float-right" onClick={window.print}>Print</button>
          </div>
          <div className="flex gap-1 justify-between flex-wrap">
            {printingImages.map((img, i) => <img key={img + i} src={img} className="h-[267.5px] w-[480px] p-1 border border-black border-dotted cursor-pointer" onClick={() => handleImagePrintCheck(img)} />)}
          </div>
        </div>

      </div>

      <Images
        famous={famousRes[0]}
        cartoon={cartres[0]}
        real={res[0]}
        keyword={query}
        addBadImage={reRollButton}
        undoBadImage={undoBadImage}
        badImages={badImages}
        submitCustomQuery={submitCustomQuery}
        customQueries={customQueries}
        user={user}
        showRerollDialog={showRerollDialog}
        setShowRerollDialog={setShowRerollDialog}
        goodImages={goodImages}
        addGoodImage={addGoodImage}
        deleteGoodImage={deleteGoodImage}
        selectGoodImage={selectGoodImage}
        unselectGoodImage={unselectGoodImage}
        handleImagePrintCheck={handleImagePrintCheck}
        printingImages={printingImages}
        hasCartoon={hasCartoon}
        hasReal={hasReal}
        hasFamous={hasFamous}
      />
    </div >
  );
}

