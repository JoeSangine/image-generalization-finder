import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import Images from "./Images";

const useBadImages = () => {
  const [badImages, setBadImages] = useState([]);
  useEffect(() => {
    fetch("/api/bad-images")
      .then((response) => response.json())
      .then((badImages) => setBadImages(badImages));
  }, []);

  const addBadImage = async (url) => {
    const response = await fetch("/api/BadImages/createBadImage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ BadURL: url }),
    });
    const dataJ = await response.json();
    const newBadImages = [...badImages, dataJ];
    setBadImages(newBadImages);
  };

  return [badImages, addBadImage];
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
    const data = await fetch(
      `https://api.openverse.engineering/v1/images?q=${newFamousImages?.FamousURL}`,
      {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_OPENVERSE_AUTHKEY,
        },
      }
    );
    const dataJ = await data.json();
    const result = dataJ.results.filter((imageobject) => {
      return !newBadImages.some((badImage) => {
        return badImage.BadURL === imageobject.url;
      });
    });
    // console.log(result)
    famousSetRes(result);
  };
  return [famousRes, fetchRequestFamous];
};

const useCartoonApi = () => {
  const [cartres, cartSetRes] = useState([]);
  const fetchRequestCartoon = async (query, newBadImages) => {
    const data = await fetch(
      `https://api.openverse.engineering/v1/images?q=cartoon%20${query}&category=illustration,digitized_artwork`,
      {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_OPENVERSE_AUTHKEY,
        },
      }
    );
    const dataJ = await data.json();
    const result = dataJ.results.filter((imageobject) => {
      return !newBadImages.some((badImage) => {
        return badImage.BadURL === imageobject.url;
      });
    });
    //console.log(result, newBadImages)
    cartSetRes(result);
  };
  return [cartres, fetchRequestCartoon];
};

const useRealApi = () => {
  const [res, setRes] = useState([]);
  const fetchRequestReal = async (query, newBadImages) => {
    const data = await fetch(
      `https://api.openverse.engineering/v1/images?q=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_OPENVERSE_AUTHKEY,
        },
      }
    );
    const dataJ = await data.json();
    const result = dataJ.results.filter((imageobject) => {
      return !newBadImages.some((badImage) => {
        return badImage.BadURL === imageobject.url;
      });
    });

    // console.log(result)
    setRes(result);
  };
  return [res, fetchRequestReal];
};

export default function Api() {
  const [query, setQuery] = useState("");
  const [cartres, fetchRequestCartoon] = useCartoonApi();
  const [res, fetchRequestReal] = useRealApi();
  const [famousRes, fetchRequestFamous] = useFamousApi();
  const [famousQuery, setFamousQuery] = useFamousQuery(query);
  const [badImages, addBadImage] = useBadImages();
  useEffect(() => {
    fetchRequestReal(query, badImages);
    fetchRequestCartoon(query, badImages);
  }, [query, badImages]);
  useEffect(() => {
    fetchRequestFamous(badImages, famousQuery);
  }, [badImages, famousQuery]);
  query
  const reRollButton = (url, type) => {
    addBadImage(url)
  };
  const addFamousImage = async (keyword) => {
    setFamousQuery(keyword)
  };
  return (
    <div>
      <Images
        famous={famousRes[0]?.url}
        cartoon={cartres[0]?.url}
        real={res[0]?.url}
        keyword={query}
        addBadImage={reRollButton}
        famousTrueOrFalse={famousQuery}
      />
      <form
        className="text-center"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(e.target.elements[0].value);
        }}
      >
        <input
          className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
          type="text"
          placeholder="Search Anything..."
        />
      </form>
      {!famousQuery && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addFamousImage(e.target.elements[0].value);
          }}
          className="text-right pr-16 "
        >
          <input
            className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark "
            type="text"
            placeholder="Please Enter The name of Famous thing you want"
          />
        </form>
      )}
    </div>
  );
}
