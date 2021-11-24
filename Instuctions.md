## Instrcutions App
- Melakukan Git Clone & Npm Install 
- Setup Api Key yang ada pada folder /src/api/ApiKeyMovie.js. Untuk mendapatkan public api dan key api 
  tersebut ada di link ini https://www.themoviedb.org && https://www.themoviedb.org/settings/api
- Npm Start

## Features

### List Movie Upcoming
- Melist sebuah movie yang akan datang atau coming soon

### List Movie Top Rated & Popular
- Melist data movie berdasarkan top rated dan juga popularitas.

### Search Movie 
- Search movie dengan sebuah query yang diinginkan.

### Bookmark Movie
- Membuat bookmark movie, namun karena dari tmdb setiap request token selalu kena expired. Maka dari itu saya ganti memakai localStorage

### Trailer Movie
- Dapat melihat trailer masing-masing movie