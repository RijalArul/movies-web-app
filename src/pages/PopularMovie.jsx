import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_KEY_MOVIE } from '../api/ApiKeyMovie'
import Movie, { GenreApi, MovieApi, SearchMovieApi } from '../api/MovieApi'
import PopularReusable from '../components/PopularReusable'

function PopularMovie () {
  const [popular, setPopular] = useState([])
  const [genres, setGenres] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchPopularMovies () {
      const response = await MovieApi.get(
        `/popular?api_key=${API_KEY_MOVIE}&language=en-US&page=1`
      )
      const { results } = await response.data
      setPopular(results)
    }

    async function fetchGenreMovie () {
      const response = await GenreApi.get(
        `/movie/list?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { genres } = await response.data
      setGenres(genres)
    }

    fetchPopularMovies()
    fetchGenreMovie()
  }, [])

  function handleChange (e) {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  async function handleSearch (e) {
    e.preventDefault()
    const response = await SearchMovieApi.get(
      `?api_key=${API_KEY_MOVIE}&query=${search.query}`
    )

    const { results } = await response.data
    setPopular(results)
    setSearch('')
  }
  return (
    <>
      <div className='popular-section'>
        <h3 className='text-popular-movies'>Popular Movies</h3>
        <div class='flex items-center justify-center '>
          <div class='flex border-2 border-gray-200 rounded'>
            <input
              type='text'
              class='px-4 py-2 w-80'
              name='query'
              placeholder='Search...'
              onChange={e => handleChange(e)}
            />
            <button
              class='px-4 text-white bg-gray-600 border-l '
              onClick={e => handleSearch(e)}
            >
              Search
            </button>
          </div>
        </div>
        <div class='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
          {popular &&
            popular.map(popular => {
              return (
                <>
                  <PopularReusable popular={popular} genres={genres} />
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default PopularMovie
