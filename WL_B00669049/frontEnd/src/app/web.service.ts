import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class WebService {

    private movie_private_list = [];
    private movieSubject = new Subject();
    movie_list = this.movieSubject.asObservable();

    private discussions_private_list = [];
    private discussionsSubject = new Subject();
    discussions = this.discussionsSubject.asObservable();

    constructor(private http: Http) {}
    movieID;
    getMovies() {
        return this.http.get( 
                'http://localhost:3000/api/movies')
                .subscribe(response => {
                    this.movie_private_list = response.json()
                    this.movieSubject.next(this.movie_private_list);
                })
    }

    searchMovies(search) {
        return this.http.get( 
                'http://localhost:3000/api/movies/title/'+search)
                .subscribe(response => {
                    this.movie_private_list = response.json()
                    this.movieSubject.next(this.movie_private_list);
                })
    }  
    
    getMovie(id) {
        return this.http.get( 
                'http://localhost:3000/api/movies/'+id)
            .subscribe(response => { 
                this.movie_private_list = [];
                this.movie_private_list.push(response.json());
                this.movieSubject.next(this.movie_private_list);
                this.movieID = id;
            })
    }

    getMoviePoster(movieID){
        var movie = movieID;
        let runSearch = function(movieID) {
            const APIKEY = '98a586b0916eebcab0ec5752eca2ee82';
            var baseURL ='https://api.themoviedb.org/3/movie/';
            let url = ''.concat(baseURL, movie, '?api_key=', APIKEY);
            fetch(url)
            .then(result=>result.json())
            .then((data)=>{
              console.log(data);
            })
          
          }
    }

    getDiscussions(id) {
        return this.http.get( 
                'http://localhost:3000/api/movies/' + id + '/discussions')
                .subscribe(response => {
                    this.discussions_private_list = response.json()
                    this.discussionsSubject.next(this.discussions_private_list);
                })
    }

    postDiscussion(discussion) {
        let urlSearchParams = new URLSearchParams(); 
        urlSearchParams.append('username', discussion.name); 
        urlSearchParams.append('text', discussion.discussion);

        this.http.post( 
            "http://localhost:3000/api/movies/" + 
            discussion.movieID + "/discussions", 
            urlSearchParams)
        .subscribe(
            response => {
            this.getDiscussions(discussion.movieID);
            } 
        )
    }
        
}