import { Link } from 'react-router-dom'
import Movie from '../api/MovieApi'

function TopRateReusable ({ top_rate, genres }) {
  return (
    <>
      <Link to={`/movie/${top_rate.id}/detail-movie`}>
        <div class='rounded overflow-hidden shadow-lg card-top-rated-section'>
          <img
            class='w-full'
            src={Movie.w500Image(top_rate.poster_path)}
            style={{
              height: '70%'
            }}
          />
          <div class='px-6 py-4'>
            <div class='font-bold text-xl mb-2'>{top_rate.title}</div>
            <p class='text-gray-700 text-base'>{top_rate.vote_average}</p>
          </div>
          <div class='px-6 pt-4 pb-2'>
            {genres &&
              genres.map(genre => {
                const { genre_ids } = top_rate
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
}

export default TopRateReusable
