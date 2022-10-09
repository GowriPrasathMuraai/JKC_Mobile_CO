import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService,) { }

  ngOnInit() {
    this.translatePlaceholder('SEARCH.NAME_OF_FIRM');
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
  translatePlaceholder(text: string) {
    this.translateService.get(text).subscribe((result) => {
      this.placeholder = result;
    });
  }
}
