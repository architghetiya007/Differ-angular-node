import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DifferCustomerInformationComponent } from './differ-customer-information/differ-customer-information.component';
import { DifferMyProfileComponent } from './differ-my-profile/differ-my-profile.component';
import { DifferServiceAddressComponent } from './differ-service-address/differ-service-address.component';
import { DifferServiceListComponent } from './differ-service-list/differ-service-list.component';
import { DifferSignupVerifyComponent } from './differ-signup-verify/differ-signup-verify.component';
import { DifferSignupComponent } from './differ-signup/differ-signup.component';
import { RouteGuard } from './route.guard';
import { MasterComponent } from './layouts/master/master.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : '',
    pathMatch:'full',
    redirectTo:'/webapp/differ-service-address',
  },
  {
    path : '',
    component: MasterComponent,
    children: [
      {
        path: 'webapp/differ-service-address',
        component: DifferServiceAddressComponent,
      },
      {
        path: 'webapp/differ-service-list',
        component: DifferServiceListComponent,
      },
      {
        path: 'webapp/differ-signup',
        component: DifferSignupComponent,
      },
      {
        path: 'webapp/login',
        component: LoginComponent,
      },
      {
        path: 'webapp/differ-signup-verify',
        component: DifferSignupVerifyComponent,
      },
      {
        path: 'webapp/differ-customer-information',
        component: DifferCustomerInformationComponent,
      },
      {
        path: 'webapp/differ-my-profile',
        component: DifferMyProfileComponent,
        canActivate: [RouteGuard]
      },
      {
        path: 'webapp/differ-checkout',
        component: CheckoutComponent,
        canActivate: [RouteGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
