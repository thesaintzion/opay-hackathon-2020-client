import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  countries = [];
  banks = [];
  loading = false;
  accountName = ''
  accountNo = '';
  
  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private apiService: ApiService ) {
    this.transferForm = this.formBuilder.group({
      bankAccountNo: ['', [Validators.required]],
      bankCode: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      
    })
   }

   get f(){ return this.transferForm.controls}

// Do transfer
   onFormSubmit(){
     if(this.transferForm.invalid){
      this.sharedService.openSnackBar('Please fill in all fields', 'OK', 3000, 'bg-danger');
     }else{
        this.transfer();
     }
    
   }

   getCountries(){
    this.apiService.getCountries().subscribe(
      res => {
          this.countries = res.countries;
          console.log(res);
      },
      err => {
          console.log(err)
      })
  }

  getBanks(countryCode){
    this.apiService.getBanks(countryCode).subscribe(
      res => {
          this.banks = res.banks;
          console.log(res);
      },
      err => {
          console.log(err)
      })
  }

  transfer(){
    this.sharedService.LOADING = true;
    let data = {
      bankCode: this.transferForm.value.bankCode,
      bankAccountNo: this.transferForm.value.bankAccountNo,
      countryCode: this.transferForm.value. countryCode,
    }
    this.apiService.transfer(data).subscribe(
      res => {
          console.log(res);
          this.sharedService.LOADING = false;
          this.sharedService.openSnackBar('Successful', 'OK', 3000, 'bg-success');
      },
      err => {
          console.log(err);
          this.sharedService.LOADING = false;
          this.sharedService.openSnackBar(err.error.message ? err.error.message : 'Something is not right pleas try again later.', 'OK', 3000, 'bg-danger');
      })
  }

  validateBankAccount(){
    this.loading = true;
    let data = {
      bankCode: this.transferForm.value.bankCode,
      bankAccountNo: this.transferForm.value.bankAccountNo,
      countryCode: this.transferForm.value. countryCode,
    }
    this.apiService.validateBankAccount(data).subscribe(
      res => {
          console.log(res);
          this.loading = false;
          this.accountName = res.accountName;
      },
      err => {
          console.log(err);
          this.loading = false;
          this.sharedService.openSnackBar(err.error.message ? err.error.message : 'Something is not right pleas try again later.', 'OK', 3000, 'bg-danger');
      })
  }
  
  ngOnInit(): void {
    // this.getBanks();
    this.getCountries();
  }

}
