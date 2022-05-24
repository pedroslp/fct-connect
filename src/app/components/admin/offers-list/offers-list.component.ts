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

  onDeleteOffer(offerId: string): void {
    const confirmDelete = confirm('Are you sure?') // TODO: add modal for confirm delete
    if (confirmDelete) {
      this.dataApi.deleteOffer(offerId)
    }
  }

  onPreUpdateOffer(offer: OfferInterface): void {
    this.dataApi.selectedOffer = Object.assign({}, offer)
    console.log(offer)
  }
}
