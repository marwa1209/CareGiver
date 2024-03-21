import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Core/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('../Components/signin/signin.component').then(
            (m) => m.SigninComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../Components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('../Components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'reset Password',
      },
      {
        path: 'forgetpassword2',
        loadComponent: () =>
          import(
            '../Components/forgetpassword2/forgetpassword2.component'
          ).then((m) => m.Forgetpassword2Component),
        title: 'reset Password',
      },
      {
        path: 'updatePassword',
        loadComponent: () =>
          import(
            '../Components/update-password/update-password.component'
          ).then((m) => m.UpdatePasswordComponent),
        title: 'reset Password',
      },
      {
        path: 'registerFormCaregiver',
        loadComponent: () =>
          import(
            '../Components/register-form-caregiver/register-form-caregiver.component'
          ).then((m) => m.RegisterFormCaregiverComponent),
        title: 'CareGiver Register',
      },
      {
        path: 'registernurse2',
        loadComponent: () =>
          import('../Components/registernurse2/registernurse2.component').then(
            (m) => m.Registernurse2Component
          ),
        title: 'ContactsDetails',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../Components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('../Components/about/about.component').then(
            (m) => m.AboutComponent
          ),
        title: 'About',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('../Components/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Contact Us',
      },
      {
        path: 'customerNurseDetails',
        loadComponent: () =>
          import('../Components/customer-nurse-details/customer-nurse-details.component').then(
            (m) => m.CustomerNurseDetailsComponent
          ),
        title: 'Nurse details',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('../Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
