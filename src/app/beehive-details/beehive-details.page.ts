import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beehive-details',
  templateUrl: './beehive-details.page.html',
  styleUrls: ['./beehive-details.page.scss'],
})
export class BeehiveDetailsPage implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data['qrCodeData']) {
      this.data = this.route.snapshot.data['qrCodeData'];
      console.log(this.data);
    }
  }

}
