import React, { useState, useEffect } from "react"
import Images from './Images'
export default function Unsplash() {
  const [img, setImg] = useState("")
  const [res, setRes] = useState([])
  const [cartres, cartSetRes] = useState([])

  const fetchRequestCartoon = async () => {
    const data = await fetch(`https://api.openverse.engineering/v1/images?q=cartoon%20${img}&category=illustration,digitized_artwork`, {
      method: 'GET',
      headers: {
        "Authorization": import.meta.env.VITE_OPENVERSE_AUTHKEY
      },
    })
    // console.log(data)
    const dataJ = await data.json()
    const result = dataJ.results
    // console.log(result)
    cartSetRes(result)
  }

  const fetchRequestUnsplash = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/collections?page=1&query=${img}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESSKEY}`
    )
    const dataJ = await data.json()
    const result = dataJ.results
    // console.log(result)
    setRes(result)
  }
  useEffect(() => {
    fetchRequestUnsplash()
    fetchRequestCartoon()
    // add another fetch request for famous
  }, [img])

  const Submit = () => {
    fetchRequestUnsplash()
    fetchRequestCartoon()
    setImg("")
  }


  return <div>
    <Images cartoon={cartres[0]?.url} real={res[0]?.cover_photo.urls.regular} />
    <form className="text-center"
      onSubmit={(e) => {
        e.preventDefault()
        setImg(e.target.elements[0].value)
      }

      }
    >
      <input
        className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
        type="text"
        placeholder="Search Anything..."
      />
    </form>
    {/* second input for famous ? !famous image */}
  </div>
}


