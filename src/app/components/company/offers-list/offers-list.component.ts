import { Component, OnInit } from '@angular/core'
import { DataApiService } from '../../../services/data-api.service'
import { OfferInterface } from '../../../models/offer'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {
  public offers: OfferInterface | any = []
  public userUid: string = ''
  public companyName: string = ''

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getOffersList()
  }

  getOffersList() {
    this.dataApi.getAllOffers().subscribe(offers => {
      this.offers = offers
    })
    this.getDataUser()
  }

  getDataUser() {
    this._getUidAndCompany()
  }

  _getUidAndCompany() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid
        this.companyName = auth.displayName!
      }
    })
  }

  onDeleteOffer(offerId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this offer?')
    if (confirmDelete) {
      this.dataApi.deleteOffer(offerId)
    }
  }

  onPreUpdateOffer(offer: OfferInterface): void {
    this.dataApi.selectedOffer = Object.assign({}, offer)
  }
}
