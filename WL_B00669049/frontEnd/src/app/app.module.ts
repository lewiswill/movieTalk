import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie.component';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';
import { NavComponent } from './nav.component';
import { MovieSearchComponent } from './moviesearch.component';

import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

var routes = [
  {
    path: '',
    component: MovieComponent
  }, 
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'movies/:id',
    component: MovieComponent
  },
  {
    path: 'movies/title/:search',
    component: MovieSearchComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'searchResults',
    component: MovieSearchComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent, MoviesComponent, 
    MovieComponent, CallbackComponent, NavComponent, MovieSearchComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
