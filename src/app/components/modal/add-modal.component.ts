import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { OfferInterface } from '../../models/offer'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  
  constructor(public dataApi: DataApiService) { }

  ngOnInit() {
  }

  onSaveOffer(offerForm: NgForm): void {
    if (offerForm.value.id == undefined || offerForm.value.id == null) {
      this.dataApi.addOffer(offerForm.value)
    } else {
      this.dataApi.updateOffer(offerForm.value)
    }
    offerForm.resetForm()
    this.closeModal.nativeElement.click()
  } 
}
