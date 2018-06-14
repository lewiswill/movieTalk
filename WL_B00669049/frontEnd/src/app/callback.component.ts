import { Component } from '@angular/core';
import { Router } from '@angular/router';

 @Component({
   selector: 'app-callback',
   template: `<p>Loading...</p>`,
   styleUrls: []
 })

 export class CallbackComponent {
    constructor(private router: Router) {}
        
        ngOnInit() {
            setTimeout(function() {
            window.location.href = sessionStorage.url;
            this.router.navigate(['']);
            }, 300);
        } 
    }