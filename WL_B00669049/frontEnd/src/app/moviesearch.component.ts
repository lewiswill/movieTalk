import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
selector: 'movies',
templateUrl: './moviesearch.component.html', 
styleUrls: ['./moviesearch.component.css']
 })

 export class MovieSearchComponent {
     constructor(private webService: WebService,
                private authService: AuthService) {}

    ngOnInit() {
        this.webService.getMovies();
    }
    movie_list;
}