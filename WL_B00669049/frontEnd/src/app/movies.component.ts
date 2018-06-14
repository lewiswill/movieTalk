import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
selector: 'movies',
templateUrl: './movies.component.html', 
styleUrls: ['./movies.component.css']
 })

 export class MoviesComponent {
     constructor(private webService: WebService,
                private authService: AuthService) {}

    ngOnInit() {
        this.webService.getMovies();
    }
    movie_list;
}
                                             