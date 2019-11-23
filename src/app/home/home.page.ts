import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrData = 'https://ionicacademy.com/';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  user = {
    name: 'Simon Grimm',
    website: 'www.ionicacademy.com',
    address: {
      zip: 48149,
      city: 'Muenster',
      country: 'DE'
    },
    interests: [
      'Ionic', 'Angular', 'YouTube', 'Sports'
    ]
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController,
    private router: Router,
    private dataService: DataService) {}

    scanCode() {
      this.barcodeScanner.scan().then(
        barcodeData => {
          this.scannedCode = barcodeData.text;

        }
      );
    }

    downloadQR() {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const imageData = canvas.toDataURL('image/jpeg').toString();
      console.log('data: ', imageData);

      let data = imageData.split(',')[1];

      this.base64ToGallery.base64ToGallery(data,
        { prefix: '_img', mediaScanner: true })
        .then(async res => {
          let toast = await this.toastCtrl.create({
            header: 'QR Code save in your photoLibrary'
          });
        }, err => console.log('err" ', err));
    }

    openDetaislWithQueryParams() {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.user)
        }
      };
      this.router.navigate(['details'], navigationExtras);
    }

    openDetailsWithService() {
      this.dataService.setData(42, this.user);
      this.router.navigateByUrl('/details/42');
    }

    openDetailsWithState() {}

    openDetailPageWithQrCodeData() {
      this.dataService.setData(1, this.scannedCode);
      this.router.navigateByUrl('')
    }
}
