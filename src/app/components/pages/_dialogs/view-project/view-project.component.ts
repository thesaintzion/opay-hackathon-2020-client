import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
form: FormGroup;
buyNow = false;
  constructor( public dialogRef: MatDialogRef<ViewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private sharedService: SharedService) {
      this.form = this.formBuilder.group({
        phone: ['+2348131393827', [Validators.required]],
      })
     }

     onFormSubmit(){
       if(this.form.invalid){
        this.sharedService.openSnackBar('Please enter your phone number', 'OK', 5000, 'bg-danger');
       }else{
         let data = {
           phone: this.form.value.phone
         }
         this.dialogRef.close(data);
       
       }
     }

  ngOnInit(): void {
  }

}
