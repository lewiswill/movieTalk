let runSearch = function(keyword) {
    const APIKEY = '98a586b0916eebcab0ec5752eca2ee82';
    baseURL ='https://api.themoviedb.org/3/movie/';
    let url = ''.concat(baseURL, keyword, '?api_key=', APIKEY);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
      console.log(data);
    })
  
  }
  movieID = document.getElementById(id);
  document.addEventListener('DOMContentLoaded', runSearch(movieID));