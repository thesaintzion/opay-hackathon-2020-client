import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isHandset = false;
  LOADING = false;

  constructor(   @Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
  private breakpointObserver: BreakpointObserver,private snackBar: MatSnackBar,) { }

  openSnackBar(message: string, action: string, duration: number, panelClass: string) {
    this.snackBar.open(message, action, {
      duration,
      panelClass,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'end',
    });
  }

  initBreakPoint(){
    this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isHandset = true;
      } else {
        this.isHandset = false;
      }
    });
}

}
