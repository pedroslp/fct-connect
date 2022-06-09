import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  @Input() userUid: string = ''
  @Input() companyName: string = ''

  constructor(public dataApi: DataApiService, private toast: ToastrService) { }

  ngOnInit() {
  }

  onSaveOffer(offerForm: NgForm): void {
    if (offerForm.value.id == undefined || offerForm.value.id == null || offerForm.value.id == '') {
      try {
        if (offerForm.value.title != null && offerForm.value.startDate != null && offerForm.value.description != null && offerForm.value.salary != null) {
          offerForm.value.userUid = this.userUid
          offerForm.value.companyName = this.companyName
          this.dataApi.addOffer(offerForm.value)
        }
        this.toast.success('Offer added successfully', 'Success', {
          toastClass: 'toast'
        })
      } catch (error) {
        this.toast.error('Error adding offer', 'Error', {
          toastClass: 'toast'
        })
      }
    } else {
      try {
        this.dataApi.updateOffer(offerForm.value)
        this.toast.success('Offer updated successfully', 'Success')
      }
      catch (error) {
        this.toast.error('Error updating offer', 'Error')
      }
    }
    offerForm.resetForm()
    this.closeModal.nativeElement.click()
  }
}
