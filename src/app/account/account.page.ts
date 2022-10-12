import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../Services/toast.service';
import { TranslatetextService } from '../Services/translatetext.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPage implements OnInit {
  title: string;
  companyInformationForm: FormGroup;
  addressInformationForm: FormGroup;
  personalInformationForm: FormGroup;
  placeholder = '';  date = '';
  constructor(private formbuilder: FormBuilder,
    public toastService: ToastService, private translateTextService: TranslatetextService) { }

  ngOnInit() {
    this.title = 'Personal Information';
    this.companyInformation();
    this.addressInformation();
    this.personalInformation();
  }
  companyInformation() {
    this.companyInformationForm = this.formbuilder.group({
      categoryTypes: ['', Validators.required],
      productTypes: ['',Validators.required],
      firmName: ['', Validators.required]
    });
  }
  addressInformation() {
    this.addressInformationForm = this.formbuilder.group({
      address: ['', Validators.required],
      city: ['',Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      firmStatus: ['', Validators.required]
    });
  }
  personalInformation() {
    this.personalInformationForm = this.formbuilder.group({
      identityPerson: ['', Validators.required],
      personName: ['',Validators.required],
      dob: ['', Validators.required],
      mobileno1: ['', Validators.required],
      mobileno2: ['', Validators.required],
      email1: ['', Validators.required],
      email2: ['', Validators.required]
    });
  }
  sortOption(event) {
    console.log(event);
  }

  SubmitFormDetails() {
    if(this.companyInformationForm.valid && this.addressInformationForm && 
       this.personalInformationForm) {
        // console.log(this.companyInformationForm.value,
        //   this.addressInformationForm.value, this.personalInformationForm.value);
        this.personalInformationForm.reset();
        this.companyInformationForm.reset();
        this.addressInformationForm.reset();
    } else {
      // Object.keys(this.companyInformationForm.controls && this.addressInformationForm.controls 
      //   && this.personalInformationForm.controls).forEach(key => {
      //   const companyabstractControl = this.companyInformationForm.get(key);
      //   companyabstractControl.markAsDirty();
      //   const addressabstractControl = this.addressInformationForm.get(key);
      //   addressabstractControl.markAsDirty();
      //   const personalinfoabstractControl = this.personalInformationForm.get(key);
      //   personalinfoabstractControl.markAsDirty();
      // });
      this.toastService.warning(
        this.translateTextService.getTranslatedText(
          'FORM_ERROR'
        ),
        1000,
        'warning',
        'top'
      );
    }
  }
}
