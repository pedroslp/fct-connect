import { Component, OnInit } from '@angular/core'
import { DataApiService } from '../../services/data-api.service'
import { OfferInterface } from '../../models/offer'
import {ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  public offer: OfferInterface = {}
    
  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const offerId = this.route.snapshot.params['id']
    this.getDetails(offerId)
  }

  getDetails(offerId: string) {
    this.dataApi.getOneOffer(offerId).subscribe(offer => {
      this.offer = offer!
    })
  }

}
