import { Component, OnInit } from '@angular/core'
import { DataApiService } from '../../../services/data-api.service'
import { OfferInterface } from '../../../models/offer'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  public offers: OfferInterface | any = []

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getOffersList()
  }

  getOffersList() {
    this.dataApi.getAllOffers().subscribe(offers => {
      this.offers = offers
    })
  }

  onDeleteOffer() {
    console.log('delete offer')
  }
}
