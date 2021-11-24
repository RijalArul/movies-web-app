import React, { useState, useEffect } from 'react'
import { API_KEY_MOVIE } from '../api/ApiKeyMovie'
import { MovieApi } from '../api/MovieApi'
import Video from './Video'
function VideoList ({ id }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      const response = await MovieApi.get(
        `/${id}/videos?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { results } = await response.data

      setVideos(results.slice(0, 5))
    }
    getVideos()
  }, [])

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  )
}

export default VideoList
