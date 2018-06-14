import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
selector: 'navigation', 
templateUrl: './nav.component.html', 
styleUrls: ['./nav.component.css']
 })
 export class NavComponent { 

    searchForm;

    constructor(private authService: AuthService,
                private webService: WebService,
                private formBuilder: FormBuilder,
                private router: Router) {

        this.searchForm = formBuilder.group({
            search: ['', Validators.required]
            })
        }
         
    onSubmit(){
        var searchQuery = this.searchForm.get('search').value;
        console.log(searchQuery);
        console.log(this.searchForm.value);
        this.webService.searchMovies(searchQuery);
        this.router.navigate(['searchResults'])
        this.searchForm.reset();
    }     
 }