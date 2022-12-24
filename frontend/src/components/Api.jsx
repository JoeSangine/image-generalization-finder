
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

const useFamousQuery = (query) => {
  const [famousQuery, setFamousQueryValue] = useState();

  useEffect(() => {
    if (!query) return;
    fetch(`/api/famous-image/${query}`)
      .then((response) => response.json())
      .then((famousQuery) => setFamousQueryValue(famousQuery));
  }, [query]);

  const setFamousQuery = async (keyword) => {
    const response = await fetch("/api/famous-image/createFamousImage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ FamousURL: keyword, query: query }),
    });
    const dataJ = await response.json();
    setFamousQueryValue(dataJ);
  };
  return [famousQuery, setFamousQuery];
};

const useFamousApi = () => {
  const [famousRes, famousSetRes] = useState([]);
  const fetchRequestFamous = async (newBadImages, newFamousImages) => {
    let usedUrls = [];
    for (let page = 1; usedUrls.length === 0; page++) {
      const allUrls = await fetchFromLaionAPI(newFamousImages?.FamousURL, {}, page);
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
      const allUrls = await fetchFromLaionAPI('clipart ' + query, {}, page);
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
      const allUrls = await fetchFromLaionAPI('real' + query, {
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
  const [famousQuery, setFamousQuery] = useFamousQuery(query);
  const [badImages, addBadImage, removeBadImage] = useBadImages();

  useEffect(() => {
    if (!query) return;
    fetchRequestReal(query, badImages);
    fetchRequestCartoon(query, badImages);
  }, [query, badImages]);
  useEffect(() => {
    if (famousQuery) fetchRequestFamous(badImages, famousQuery);
  }, [badImages, famousQuery]);

  const reRollButton = (url, type) => {
    addBadImage(url, type)
  };
  const addFamousImage = (keyword) => {
    setFamousQuery(keyword)
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
              className="input text-center input-bordered input-primary col-3 form-control-sm py-1 fs-4 text-capitalize border-[3px] drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark"
              type="text"
              placeholder="Search for Images Here...
                  "
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
        famousTrueOrFalse={famousQuery}
        badImages={badImages}
      >
        {!famousQuery && user && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addFamousImage(e.target.elements[0].value);
            }}
            className="text-center"
          >
            <input
              className="input input-bordered input-secondary col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 drop-shadow-[0_0_25px_rgba(225,225,225,.10)] border-dark "
              type="text"
              placeholder="Enter Famous Figure..."

            />
            <button type="submit" className="btn btn-secondary ml-5">Submit</button>
          </form>
        )}
      </Images>
    </div>
  );
}

