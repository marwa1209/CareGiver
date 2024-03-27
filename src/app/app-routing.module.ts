import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { authGuard } from './Core/guard/auth-guard';
import { nurseGuard } from './Core/guard/nurse.guard';
import { blankGuard } from './Core/guard/blank.guard';

const routes: Routes = [
  // auth-layout
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
    ],
  },

  // blank-layout

  {
    path: '',
    canActivate: [blankGuard],
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
        path: 'services',
        loadComponent: () =>
          import('../Components/services/services.component').then(
            (m) => m.ServicesComponent
          ),
        title: 'Our Services',
      },
      {
        path: 'customerNurseDetails/:nurseId',
        loadComponent: () =>
          import(
            '../Components/customer-nurse-details/customer-nurse-details.component'
          ).then((m) => m.CustomerNurseDetailsComponent),
        title: 'Nurse details',
      },
      {
        path: 'nurses/:role',
        loadComponent: () =>
          import('../Components/Categories/nurses/nurses.component').then(
            (m) => m.NursesComponent
          ),
        title: 'Nurses',
      },
      {
        path: 'caregivers/:role',
        loadComponent: () =>
          import(
            '../Components/Categories/caregivers/caregivers.component'
          ).then((m) => m.CaregiversComponent),
        title: 'Care Givers',
      },
      {
        path: 'babysitters/:role',
        loadComponent: () =>
          import(
            '../Components/Categories/babysitters/babysitters.component'
          ).then((m) => m.BabysittersComponent),
        title: 'Baby Sitters',
      },
    ],
  },

  // Nurse-layout

  {
    path: '',
    canActivate: [nurseGuard],
    loadComponent: () =>
      import('./Layouts/nurse-layout/nurse-layout.component').then(
        (m) => m.NurseLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: '/schedule',
        pathMatch: 'full',
      },
      {
        path: 'schedule',
        loadComponent: () =>
          import('../Components/schedule/schedule.component').then(
            (m) => m.ScheduleComponent
          ),
        title: 'schedule',
      },
      {
        path: 'caregiverForm',
        loadComponent: () =>
          import(
            '../Components/caregivers-form/caregivers-form.component'
          ).then((m) => m.CaregiversFormComponent),
        title: 'Form',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../Components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        title: 'Orders',
      },
      {
        path: 'Nurseprofile',
        loadComponent: () =>
          import('../Components/nurse-profile/nurse-profile.component').then(
            (m) => m.NurseProfileComponent
          ),
        title: 'Profile',
      },
      {
        path: 'aboutnurse',
        loadComponent: () =>
          import('../Components/about/about.component').then(
            (m) => m.AboutComponent
          ),
        title: 'About',
      },
      {
        path: 'contactnurse',
        loadComponent: () =>
          import('../Components/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Contact Us',
      },
    ],
  },

  //admin-layout
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/Admin-layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: '/admin-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin-dashboard',
        loadComponent: () =>
          import('../Components/Admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard',
      },
      {
        path: 'manageCustomers',
        loadComponent: () =>
          import(
            '../Components/Admin/manage-customers/manage-customers.component'
          ).then((m) => m.ManageCustomersComponent),
        title: 'manageCustomers',
      },
      {
        path: 'manageNurses',
        loadComponent: () =>
          import(
            '../Components/Admin/manage-nurses/manage-nurses.component'
          ).then((m) => m.ManageNursesComponent),
        title: 'ManageNurses',
      },
      {
        path: 'manageCaregivers',
        loadComponent: () =>
          import(
            '../Components/Admin/manage-caregivers/manage-caregivers.component'
          ).then((m) => m.ManageCaregiversComponent),
        title: 'manageCaregivers',
      },
      {
        path: 'manageBabysitters',
        loadComponent: () =>
          import(
            '../Components/Admin/manage-babysitters/manage-babysitters.component'
          ).then((m) => m.ManageBabysittersComponent),
        title: 'manageBabysitters',
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('../Components/Admin/requests/requests.component').then(
            (m) => m.RequestsComponent
          ),
        title: 'Requests',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            '../Components/Admin/notifications/notifications.component'
          ).then((m) => m.NotificationsComponent),
        title: 'Notifications',
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('../Components/Admin/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
        title: 'Requests',
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import(
            '../Components/Admin/transactions/transactions.component'
          ).then((m) => m.TransactionsComponent),
        title: 'Transactions',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            '../Components/Admin/settings/settings.component'
          ).then((m) => m.SettingsComponent),
        title: 'settings',
      },
    ],
  },

  // not-found
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
