import axios from 'axios'

export const MovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie'
})

export const GenreApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/genre'
})

export const SearchMovieApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/search/movie`
})
export const Movie = {
  baseUrl: 'https://api.themoviedb.org/3/',
  originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default Movie
