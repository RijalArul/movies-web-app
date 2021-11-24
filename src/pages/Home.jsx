import { useEffect, useState } from 'react'
import { API_KEY_MOVIE } from '../api/ApiKeyMovie'
import { GenreApi, Movie, MovieApi } from '../api/MovieApi'
import * as moment from 'moment'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import PopularReusable from '../components/PopularReusable'
import TopRateReusable from '../components/TopRateReusable'
function Home () {
  const [upcomings, setUpcomings] = useState([])
  const [popular, setPopular] = useState([])
  const [top_rated, setTop_Rated] = useState([])
  const [genres, setGenres] = useState([])
  useEffect(() => {
    async function fetchUpcoming () {
      const response = await MovieApi.get(
        `/upcoming?api_key=${API_KEY_MOVIE}&language=en-US&page=1`
      )

      const { results } = await response.data
      let newResults = []
      results.forEach(result => {
        if (new Date(result.release_date) >= new Date()) {
          newResults.push(result)
        }
      })
      const sortUpcoming = newResults.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date)
      })

      let newData = sortUpcoming.slice(0, 3)
      setUpcomings(newData)
    }

    async function fetchPopular () {
      const response = await MovieApi.get(
        `/popular?api_key=${API_KEY_MOVIE}&language=en-US&page=1`
      )

      const { results } = await response.data

      let newData = results.slice(0, 3)
      setPopular(newData)
    }

    async function fetchTopRated () {
      const response = await MovieApi.get(
        `/top_rated?api_key=${API_KEY_MOVIE}&language=en-US&page=1`
      )

      const { results } = await response.data

      let newData = results.slice(0, 3)
      setTop_Rated(newData)
    }

    async function fetchGenreMovie () {
      const response = await GenreApi.get(
        `/movie/list?api_key=${API_KEY_MOVIE}&language=en-US`
      )

      const { genres } = response.data
      setGenres(genres)
    }

    fetchUpcoming()
    fetchPopular()
    fetchTopRated()
    fetchGenreMovie()
  }, [])

  return (
    <>
      <div className='upcoming-section'>
        <h3 className='text-upcoming-movies'>Upcoming Movies</h3>
        <div class='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
          {upcomings &&
            upcomings.map(upcoming => {
              return (
                <>
                  <Link to={`/movie/${upcoming.id}/detail-movie`}>
                    <div class='rounded overflow-hidden shadow-lg card-upcoming-section'>
                      <img
                        class='w-full'
                        src={Movie.w500Image(upcoming.poster_path)}
                        style={{
                          height: '70%'
                        }}
                      />
                      <div class='px-6 py-4'>
                        <div class='font-bold text-xl mb-2'>
                          {upcoming.title}
                        </div>
                        <p class='text-gray-700 text-base'>
                          {moment(upcoming.release_date).format(
                            'MMMM Do YYYY, dddd'
                          )}
                        </p>
                      </div>
                      <div class='px-6 pt-4 pb-2'>
                        {genres &&
                          genres.map(genre => {
                            const { genre_ids } = upcoming
                            for (let i = 0; i < genre_ids.length; i++) {
                              if (genre_ids[i] === genre.id) {
                                return (
                                  <>
                                    <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                      {genre.name}{' '}
                                    </span>
                                  </>
                                )
                              }
                            }
                          })}
                      </div>
                    </div>
                  </Link>
                </>
              )
            })}
        </div>
      </div>
      <div className='popular-section'>
        <h3 className='text-popular-movies'>
          Popular Movies
          <Link
            to={'/popular-movie'}
            style={{ color: 'blue', marginLeft: '10px' }}
          >
            See More
          </Link>
        </h3>
        <div class='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
          {popular &&
            popular.map(popular => {
              return <PopularReusable popular={popular} genres={genres} />
            })}
        </div>
      </div>

      <div className='top-rated-section'>
        <h3 className='text-top-rated-movies'>
          Top Rated Movies{' '}
          <Link
            to={'/top-rated-movie'}
            style={{ color: 'blue', marginLeft: '10px' }}
          >
            See More
          </Link>
        </h3>
        <div class='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
          {top_rated &&
            top_rated.map(top_rate => {
              return (
                <>
                  <TopRateReusable top_rate={top_rate} genres={genres} />
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Home
