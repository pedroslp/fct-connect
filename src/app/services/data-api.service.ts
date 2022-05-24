import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable'
import { OfferInterface } from '../models/offer'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private offersCollection: AngularFirestoreCollection<OfferInterface>
  private offers: Observable<OfferInterface[]>
  private offerDoc!: AngularFirestoreDocument<OfferInterface>
  private offer!: Observable<OfferInterface | any>
  public selectedOffer : OfferInterface = {
    id: null,
  }

  constructor(private afs: AngularFirestore) {
    this.offersCollection = afs.collection<OfferInterface>('offers')
    this.offers = this.offersCollection.valueChanges()
  }

  getAllOffers() {
    return this.offers = this.offersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as OfferInterface
        data.id = action.payload.doc.id
        return data
      })
    }))
  }

  getOneOffer(offerId: string) {
    this.offerDoc = this.afs.doc<OfferInterface>(`offers/${offerId}`)
    return this.offer = this.offerDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists) {
        const data = action.payload.data() as OfferInterface
        data.id = action.payload.id
        return data
      }
      return null
    }))
  }

  addOffer(offer: OfferInterface): void {
    this.offersCollection.add(offer)
  }

  updateOffer(offer: OfferInterface): void {
    let offerId = offer.id
    this.offerDoc = this.afs.doc<OfferInterface>(`offers/${offerId}`)
    this.offerDoc.update(offer)
  }

  deleteOffer(offerId: string): void {
    this.offerDoc = this.afs.doc<OfferInterface>(`offers/${offerId}`)
    this.offerDoc.delete()
  }
}
