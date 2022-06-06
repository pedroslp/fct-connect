import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  @Input() userUid: string = ''
  @Input() companyName: string = ''

  constructor(public dataApi: DataApiService) { }

  ngOnInit() {
  }

  onSaveOffer(offerForm: NgForm): void {
    if (offerForm.value.id == undefined || offerForm.value.id == null || offerForm.value.id == '') {
      if (offerForm.value.title != null && offerForm.value.startDate != null && offerForm.value.description != null && offerForm.value.salary != null) {
        offerForm.value.userUid = this.userUid
        offerForm.value.companyName = this.companyName
        this.dataApi.addOffer(offerForm.value)
      }
    } else {
      this.dataApi.updateOffer(offerForm.value)
    }
    offerForm.resetForm()
    this.closeModal.nativeElement.click()
  }
}
