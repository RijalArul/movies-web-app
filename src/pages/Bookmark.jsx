import { useEffect, useState } from 'react'
import { API_KEY_MOVIE } from '../api/ApiKeyMovie'
import Movie, { MovieApi } from '../api/MovieApi'

function Bookmark () {
  const [movie, setMovie] = useState([])
  const [bookmark, setBookmark] = useState([])

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
      ? JSON.parse(localStorage.getItem('bookmarks'))
      : []
    async function fetchMovie () {
      const response = await MovieApi.get(
        `/634649?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { data } = response
      setMovie(data)
      setBookmark(bookmarks)
    }

    fetchMovie()
  }, [])

  function deleteBookmark (id) {
    const filterBookmark = bookmark.filter(favs => favs.movie.id !== id)
    setBookmark(filterBookmark)
    localStorage.setItem('bookmarks', JSON.stringify(filterBookmark))
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
      <div class='p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5'>
        {bookmark &&
          bookmark.map(favs => {
            return (
              <div class=' w-full lg:max-w-full lg:flex'>
                <div
                  class='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
                  style={{
                    backgroundImage: `url(${Movie.w500Image(
                      favs.movie.poster_path
                    )})`
                  }}
                ></div>
                <div class='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
                  <div class='mb-8'>
                    <div class='text-gray-900 font-bold text-xl mb-2'>
                      {favs.movie.title}
                    </div>
                    <p class='text-gray-700 text-base'>{favs.movie.overview}</p>
                    <button
                      class='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded'
                      onClick={() => deleteBookmark(favs.movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Bookmark
