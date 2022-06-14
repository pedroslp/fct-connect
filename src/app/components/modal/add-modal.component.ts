import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html'
})
export class AddModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  @Input() userUid: string = ''
  @Input() companyName: string = ''

  constructor(public dataApi: DataApiService, private toast: ToastrService) { }

  ngOnInit() {
  }

  onSaveOffer(offerForm: NgForm): void {
    if (offerForm.value.id === undefined || offerForm.value.id === null || offerForm.value.id === '') {
      try {
        if (offerForm.value.title != null && offerForm.value.startDate != null && offerForm.value.description != null) {
          offerForm.value.userUid = this.userUid
          offerForm.value.companyName = this.companyName
          this.dataApi.addOffer(offerForm.value)
          offerForm.resetForm()
          this.toast.success('Offer added successfully', 'Success')
        } else {
          this.toast.error('Please fill all the fields', 'Error')
        }
        offerForm.resetForm()
      } catch (error) {
        this.toast.error('Error adding offer', 'Error')
        offerForm.resetForm()
      }
    } else {
      try {
        this.dataApi.updateOffer(offerForm.value)
        this.toast.success('Offer updated successfully', 'Success')
        offerForm.resetForm()
      }
      catch (error) {
        this.toast.error('Error updating offer', 'Error')
      }
    }
    this.closeModal.nativeElement.click()
  }
}
