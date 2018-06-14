import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'movie',
    templateUrl: './movie.component.html', 
    styleUrls: ['./movie.component.css']
    })
    export class MovieComponent { 

    discussionForm;

    discussion = {
        movieID:'',
        name: '',
        discussion: ''
    }

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private formBuilder: FormBuilder) {
        
        this.discussionForm = formBuilder.group( {
            name: ['', Validators.required],
            discussion: ['', Validators.required]
        });
    }
        ngOnInit() {
            this.webService.getMovie(this.route.snapshot.params.id);
            this.webService.getDiscussions(this.route.snapshot.params.id);
        }

        onSubmit(){
            this.discussion.movieID = this.webService.movieID;
            console.log(this.discussion);
            this.webService.postDiscussion(this.discussion);
            this.discussionForm.reset();
        }
        isInvalid(control){
            return (this.discussionForm.controls[control].invalid &&
                    this.discussionForm.controls[control].touched)
        }
        movie = { }
    }