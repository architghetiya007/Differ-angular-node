import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DifferServiceList } from "./../differ-service-list/differ-service-list.service";
// import { AuthService } from './../register/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-differ-customer-information',
  templateUrl: './differ-customer-information.component.html',
  styleUrls: ['./differ-customer-information.component.css']
})
export class DifferCustomerInformationComponent implements OnInit {

  InformationForm!: FormGroup;
  submitted = false;
  model: any;
  constructor(private router: Router, private differServiceList: DifferServiceList) { }


  ngOnInit(): void {
    this.InformationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      serviceAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
      birthday: new FormControl('', [Validators.required,]),
    });
  }

  get informationFormHas(): { [key: string]: AbstractControl } {
    return this.InformationForm.controls;
  }

  handleSubmit() {
    this.submitted = true;
    if (this.InformationForm.invalid) {
      return;
    }
    console.log(this.InformationForm.value);

    let reqData = {
      email: this.InformationForm.value.email,
      firstName: this.InformationForm.value.firstName,
      lastName: this.InformationForm.value.lastName,
      password: this.InformationForm.value.password,
      serviceAddress: this.InformationForm.value.serviceAddress,
      birthday: this.InformationForm.value.birthday,
    };
    this.differServiceList.differCustomerInformation(reqData).subscribe((result: any) => {
      if (result['code'] == 200) {
        this.router.navigate(['/differ-checkout']);
      }
    },
      (err: any) => {
        console.log(err, "error");
      });
  }

}
