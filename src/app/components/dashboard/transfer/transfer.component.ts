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
  success = false;
  
  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private apiService: ApiService ) {
    this.transferForm = this.formBuilder.group({
      bankAccountNo: ['', [Validators.required]],
      bankCode: ['', [Validators.required]],
      countryCode: ['NG', [Validators.required]],
      amount: ['', [Validators.required]],
      reason: [''],
      currency: ['NGN', [Validators.required]],
    })
   }

  

   get f(){ return this.transferForm.controls}

// Do transfer
   onFormSubmit(){
     if(this.transferForm.invalid){
      this.sharedService.openSnackBar('Please fill in all fields', 'OK', 3000, 'bg-danger');
     }else{
       if(this.accountName == ''){
        this.sharedService.openSnackBar('Could not validate account number', 'OK', 3000, 'bg-danger');
       }else{
        this.transfer();
       }
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

  getBanks(){
    let countryCode = 'NG';
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
      amount:  this.transferForm.value.amount,
      currency: this.transferForm.value.currency,
      name: this.accountName,
      reason:  this.transferForm.value.reason,
      bankCode: this.transferForm.value.bankCode,
      bankAccountNumber: this.transferForm.value.bankAccountNo,
      country: this.transferForm.value.countryCode,
    }
    this.apiService.transfer(data).subscribe(
      res => {
        this.transferForm.reset();
        this.success = true;
          console.log(res);
          this.sharedService.LOADING = false;
          this.sharedService.openSnackBar('Transfer was successful', 'OK', 3000, 'bg-success');
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
    this.getBanks();
  }

}
