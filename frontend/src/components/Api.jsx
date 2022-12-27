
import React, { useState, useEffect } from "react";
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
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
    console.log('no go here', { query });
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

export default function Api({ user }) {
  const [query, setQuery] = useState("");
  const [cartres, fetchRequestCartoon] = useCartoonApi();
  const [res, fetchRequestReal] = useRealApi();
  const [famousRes, fetchRequestFamous] = useFamousApi();
  const [customQueries, setCustomQuery, deleteCustomQuery] = useCustomQueries(query);
  const [badImages, addBadImage, removeBadImage] = useBadImages();

  useEffect(() => {
    const realQuery = customQueries.real?.convertedQuery || (query ? 'real ' + query : '');
    if (realQuery) fetchRequestReal(realQuery, badImages);
    const cartoonQuery = customQueries.cartoon?.convertedQuery || (query ? 'clipart ' + query : '');
    if (cartoonQuery) fetchRequestCartoon(cartoonQuery, badImages);
  }, [query, badImages, customQueries]);
  useEffect(() => {
    if (customQueries.famous) fetchRequestFamous(customQueries.famous.convertedQuery, badImages);
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
            className="text-center"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(e.target.elements[0].value);
            }}
          >
            <input
              className="input text-center input-bordered input-primary col-3 form-control-sm py-1 fs-4 text-capitalize border-[3px] drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark mt-20"
              type="text"
              placeholder="Search for Images Here..."
            />
            <button type="submit" className="btn btn-secondary ml-4">
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
      />
    </div>
  );
}

