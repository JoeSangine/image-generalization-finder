
import React, { useState, useEffect, useMemo, useRef } from "react";
import Images from "./Images";

const fetchFromLaionAPI = async (query, options, page) => {
  const response = await fetch("https://knn5.laion.ai/knn-service", {
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
    const goodImageIndex = goodImages[type].findIndex(goodImage => goodImage._id === id)
    const response = await fetch("/api/GoodImages/select/" + id);
    const newGoodImage = await response.json();
    const newGoodImages = { ...goodImages };
    newGoodImages[type] = [...newGoodImages[type]]
    newGoodImages[type].splice(goodImageIndex, 1)
    newGoodImages[type].unshift(newGoodImage);
    setGoodImagesValues(newGoodImages);
  }

  return [goodImages, addGoodImage, deleteGoodImage, selectGoodImage];
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
  const [famousRes, famousSetRes] = useState([]);
  const fetchRequestFamous = async (query, newBadImages) => {
    famousSetRes([]);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, {}, page);
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    famousSetRes(usedUrls);
  };
  return [famousRes, fetchRequestFamous];
};

const useCartoonApi = () => {
  const [cartres, cartSetRes] = useState([]);
  const fetchRequestCartoon = async (query, newBadImages) => {
    cartSetRes([]);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, {}, page);
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    // should be good now +1
    cartSetRes(usedUrls);
  };
  return [cartres, fetchRequestCartoon];
};

const useRealApi = () => {
  const [res, setRes] = useState([]);
  const fetchRequestReal = async (query, newBadImages) => {
    setRes([]);
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(query, {
        aesthetic_score: '5'
      }, page);
      usedUrls = allUrls.filter((url) => {
        return !newBadImages.some((badImage) => {
          return badImage.BadURL === url;
        });
      });
    }
    setRes(usedUrls);
  };
  return [res, fetchRequestReal];
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
  const [cartres, fetchRequestCartoon] = useCartoonApi();
  const [res, fetchRequestReal] = useRealApi();
  const [famousRes, fetchRequestFamous] = useFamousApi();
  const [customQueries, setCustomQuery, deleteCustomQuery] = useCustomQueries(query);
  const [goodImages, addGoodImage, deleteGoodImage, selectGoodImage] = useGoodImages(query);
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
    if (!badImagesChanged && !customQueriesChanged && !queryChanged) return;

    const realQuery = customQueries.real?.convertedQuery || (query ? 'real ' + query : '');
    if (realQuery) fetchRequestReal(realQuery, realBadImages);
  }, [query, badImages, customQueries]);
  useEffect(() => {
    const cartoonBadImages = badImages.filter(bad => bad.type === 'cartoon');
    const oldCartoonBadImages = prevBadImages.filter(bad => bad.type === 'cartoon');
    const badImagesChanged = cartoonBadImages.length !== oldCartoonBadImages.length;
    const customQueriesChanged = customQueries.cartoon?.convertedQuery !== prevCustomQueries.cartoon?.convertedQuery;
    const queryChanged = query !== prevQuery;
    if (!badImagesChanged && !customQueriesChanged && !queryChanged) return;

    const cartoonQuery = customQueries.cartoon?.convertedQuery || (query ? 'clipart ' + query : '');
    if (cartoonQuery) fetchRequestCartoon(cartoonQuery, cartoonBadImages);
  }, [query, badImages, customQueries])
  useEffect(() => {
    const famousBadImages = badImages.filter(bad => bad.type === 'famous');
    const oldFamousBadImages = prevBadImages.filter(bad => bad.type === 'famous');
    const badImagesChanged = famousBadImages.length !== oldFamousBadImages.length;
    const customQueriesChanged = customQueries.famous?.convertedQuery !== prevCustomQueries.famous?.convertedQuery;
    const queryChanged = query !== prevQuery;
    if (!badImagesChanged && !customQueriesChanged && !queryChanged) return;

    if (customQueries.famous) fetchRequestFamous(customQueries.famous.convertedQuery, famousBadImages);
    // TODO - clear when not famous or something?
  }, [badImages, customQueries.famous?.convertedQuery]);

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

  return (
    <div>

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
      />
    </div>
  );
}

