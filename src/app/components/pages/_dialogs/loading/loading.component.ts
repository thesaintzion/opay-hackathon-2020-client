import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public sharedService: SharedService, public dialogRef: MatDialogRef<LoadingComponent>) { }

  ngOnInit(): void {

    if(!this.sharedService.LOADING){
      // this.dialogRef.close();
      document.getElementById('close').click()
      // alert('Close');
    }
    
  }

}
