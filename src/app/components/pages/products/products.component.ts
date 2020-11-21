import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { ViewProjectComponent } from '../_dialogs/view-project/view-project.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 products =  [
  {
    id:1,
    name: 'iphone one',
    img: 'assets/img/iphone.jpg',
    price: 10000,
  },
  {
    id:2,
    name: 'iphone two',
    img: 'assets/img/iphone.jpg',
    price: 20000,
  },
  {
    id:3,
    name: 'iphone three',
    img: 'assets/img/iphone.jpg',
    price: 30000,
  },
  {
    id:4,
    name: 'iphone four',
    img: 'assets/img/iphone.jpg',
    price: 40000,
  },
  {
    id:5,
    name: 'iphone five',
    img: 'assets/img/iphone.jpg',
    price: 50000,
  },
 
  {
    id: 6,
    name: 'iphone six',
    img: 'assets/img/iphone.jpg',
    price: 60000,
  },
  {
    id:7,
    name: 'iphone seven',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 70000,
  },
  {
    id:8,
    name: 'iphone eight',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 80000,
  },
  {
    id:9,
    name: 'iphone nine',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 90000,
  },
  {
    id:10,
    name: 'iphone ten',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 100000,
  },
  {
    id:11,
    name: 'iphone eleven',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 110000,
  },
  {
    id: 12,
    name: 'iphone twelve',
    description: 'Portfolio website',
    link: '',
    img: 'assets/img/iphone.jpg',
    price: 120000,
  }
];
loading = true;
  constructor(private dialog: MatDialog, public sharedService: SharedService, private apiService: ApiService) { 
  }

  viewProduct(name, img, price, id){
    let dialogRef = this.dialog.open(ViewProjectComponent, {
      width: this.sharedService.isHandset? '100%' : '400px',
      height: '100vh',
      data: {
        name, img, price, id
      },
      // disableClose: true,
      position: { right: '0px', },
      panelClass: ['animated','fadeInRight', 'faster', 'dialog-rounded-none'],
    });
  
    dialogRef.afterClosed().subscribe(userType =>{
     if(userType){ 
      //  alert('We got it')
      this.pay(name, price, id);
      this.sharedService.openSnackBar('Processing..', 'CLOSE',9000000, 'bg-dark')
     }
    });
  }

pay(name, price, id){
    if(!name || !price || !id){
      this.sharedService.openSnackBar('Something is not right..', 'OK', 5000, 'bg-danger');
    }else{
      this.sharedService.LOADING = true;
      let data = {
        name, price, id
      }
      this.apiService.pay(data).subscribe(
        res => {
          setTimeout( () => {
            this.sharedService.LOADING =  false;
            console.log(res)
            this.sharedService.openSnackBar('Payment successful!!', 'OK', 9000, 'bg-success')
            }, 3000)
        },
        err => {
          setTimeout( () => {
            console.log(err)
            this.sharedService.LOADING =  false;
            this.sharedService.openSnackBar(err.error.message ? err.error.message : 'Oops..!! Something is not right.. please try later', 'OK', 9000, 'bg-danger')
            }, 3000)
        });
    }
  }

  ngOnInit(): void {
    setTimeout( () => {
this.loading = false;
    }, 3000)
    this.sharedService.initBreakPoint();
  }

}
