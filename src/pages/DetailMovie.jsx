import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { API_KEY_MOVIE } from '../api/ApiKeyMovie'
import { MovieApi, Movie } from '../api/MovieApi'
import { scroller } from 'react-scroll'
import VideoList from '../components/VideoList'

function DetailMovie () {
  const [movie, setMovie] = useState({})
  const [casts, setCasts] = useState([])
  const [bookmark, setBookmark] = useState([])
  const { id } = useParams()

  const scrollToSection = () => {
    scroller.scrollTo('trailer', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  useEffect(() => {
    let bookmark = localStorage.getItem('bookmarks')
      ? JSON.parse(localStorage.getItem('bookmarks'))
      : []
    async function fetchMovie () {
      const response = await MovieApi.get(
        `/${id}?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { data } = response
      setMovie(data)
    }

    async function fetchActor () {
      const response = await MovieApi.get(
        `${id}/credits?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { cast } = await response.data
      setCasts(cast)
    }

    setBookmark(bookmark)

    fetchMovie()
    fetchActor()
  }, [])

  function clickBookmark () {
    let bookmarks = localStorage.getItem('bookmarks')
      ? JSON.parse(localStorage.getItem('bookmarks'))
      : []

    const payload = {
      movie: movie,
      status: true
    }

    let newBookmark = [...bookmarks, payload]
    setBookmark(newBookmark)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmark))
  }

  const VideoList = () => {
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

  const Video = props => {
    const item = props.item

    const iframeRef = useRef(null)

    useEffect(() => {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
      iframeRef.current.setAttribute('height', height)
    }, [])

    return (
      <div className='video'>
        <div className='video__title'>
          <h2>{item.name}</h2>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/${item.key}`}
          ref={iframeRef}
          width='68%'
          style={{ marginLeft: '125px', height: '270px', marginTop: '15px' }}
          title='video'
        ></iframe>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
      }}
    >
      <div className='description-movie-detail'>
        <h4 className='title-movie-detail'>{movie.title}</h4>
        <p className='overview-movie-detail'>{movie.overview}</p>
        <div className='button-genre-movie-detail'>
          {movie.genres &&
            movie.genres.map(genre => {
              return (
                <>
                  <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded genre-movie-detail'>
                    {genre.name}
                  </button>
                </>
              )
            })}
        </div>

        <div>
          {bookmark.length === 0 ? (
            <button
              class='bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 mr-3 rounded movie-bookmark-detail'
              onClick={() => clickBookmark(movie.id)}
            >
              unBookmark
            </button>
          ) : (
            bookmark.map(favs => {
              if (favs.movie.id === movie.id && favs.status === true) {
                return (
                  <button
                    class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded movie-bookmark-detail'
                    onClick={() => clickBookmark(movie.id)}
                  >
                    Bookmark
                  </button>
                )
              }

              if (favs.movie.id !== movie.id) {
                return (
                  <button
                    class='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mr-3 rounded movie-bookmark-detail'
                    onClick={() => clickBookmark(movie.id)}
                  >
                    Bookmark
                  </button>
                )
              }
            })
          )}
          <button
            class='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded movie-trailer-detail'
            onClick={scrollToSection}
          >
            Watch Trailer
          </button>
        </div>
      </div>
      <div className='cast-movie-section'>
        <h3 className='cast-text-section'>CASTS</h3>
        <div class='p-7 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 s:grid-cols-5 gap-5'>
          {casts &&
            casts.map(cast => {
              return (
                <>
                  <div class='rounded overflow-hidden shadow-lg card-cast-movie-section'>
                    <img
                      class='w-full'
                      src={Movie.w500Image(cast.profile_path)}
                    />
                    <div class='px-6 py-4'>
                      <div class='font-bold text-xl mb-2'>{cast.character}</div>
                      <div class='font-bold text-m mb-2'>{cast.name}</div>
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
      <div>
        <div className='section mb-3 trailer' id='trailer'>
          <VideoList id={movie.id} />
        </div>
      </div>
      <img
        src={Movie.w500Image(movie.poster_path)}
        className='image-movie-detail'
      />
    </div>
  )
}

export default DetailMovie
