import { Component, OnInit } from '@angular/core';
import { Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';

import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio-one';
  audio = false;
  loading = false;


  constructor( public sharedService: SharedService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          
          // setTimeout( () => {
            this.loading = false;
        // }, 1000)
        
          break;
        }
        default: {
          break;
        }
      }
    });
  }
    
   


   ngOnInit(): void {
     setTimeout( () => {
      this.audio = true;
     }, 3000)
  }




}


