import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { authGuard } from './Core/guard/auth-guard';
import { nurseGuard } from './Core/guard/nurse.guard';
import { blankGuard } from './Core/guard/blank.guard';
import { reservationGuard } from './Core/guard/reservation.guard';
import { blockedGuard } from './Core/guard/blocked.guard';
import { formGuard } from './Core/guard/form.guard';
import { nurseChilderenGuard } from './Core/guard/nurse-childeren.guard';
import { pendingGuard } from './Core/guard/pending.guard';
import { adminGuard } from './Core/guard/admin.guard';

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
        path: 'customerprofile',
        loadComponent: () =>
          import(
            '../Components/customerprofile/customerprofile.component'
          ).then((m) => m.CustomerprofileComponent),
        title: 'Profile',
      },
      {
        path: 'terms',
        loadComponent: () =>
          import(
            '../Components/termsandconditions/termsandconditions.component'
          ).then((m) => m.TermsandconditionsComponent),
        title: 'Terms and conditions',
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
      // Reservations
      {
        canActivate: [reservationGuard],
        path: '',
        children: [
          {
            path: 'customerdetailsreservation/:nurseid',
            loadComponent: () =>
              import(
                '../Components/Reservations/customer-details-reservation/customer-details-reservation.component'
              ).then((m) => m.CustomerDetailsReservationComponent),
            title: 'Customer Details Reservation',
          },
          {
            path: 'Orderconfirmeddetails/:orderid',
            loadComponent: () =>
              import(
                '../Components/Reservations/orderconfirmeddetails/orderconfirmeddetails.component'
              ).then((m) => m.OrderconfirmeddetailsComponent),
            title: 'Order details',
          },
          {
            path: 'allorders',
            loadComponent: () =>
              import(
                '../Components/Reservations/all-orders/all-orders.component'
              ).then((m) => m.AllOrdersComponent),
            title: 'My Orders',
          },
        ],
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
        redirectTo: '/orders',
        pathMatch: 'full',
      },
      {
        path: 'schedule',
        canActivate: [nurseChilderenGuard],
        loadComponent: () =>
          import('../Components/schedule/schedule.component').then(
            (m) => m.ScheduleComponent
          ),
        title: 'schedule',
      },
      {
        path: 'orders',
        canActivate: [nurseChilderenGuard],
        loadComponent: () =>
          import('../Components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        title: 'Orders',
      },
      {
        path: 'orderdetails/:orderid',
        canActivate: [nurseChilderenGuard],
        loadComponent: () =>
          import(
            '../Components/order-nurse-details/order-nurse-details.component'
          ).then((m) => m.OrderNurseDetailsComponent),
        title: 'Details',
      },
      {
        path: 'Nurseprofile',
        canActivate: [nurseChilderenGuard],
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
      //form
      {
        path: 'caregiverForm',
        canActivate: [formGuard],
        loadComponent: () =>
          import(
            '../Components/caregivers-form/caregivers-form.component'
          ).then((m) => m.CaregiversFormComponent),
        title: 'Form',
      },
      // pending page
      {
        path: 'pending',
        canActivate: [pendingGuard],
        loadComponent: () =>
          import('../Components/pending-page/pending-page.component').then(
            (m) => m.PendingPageComponent
          ),
        title: 'request pending',
      },
      //blocked
      {
        path: 'blocked',
        canActivate: [blockedGuard],
        loadComponent: () =>
          import('../Components/blocked/blocked.component').then(
            (m) => m.BlockedComponent
          ),
        title: 'Request Rejected',
      },
    ],
  },

  //admin-layout
  {
    path: '',
    canActivate: [adminGuard],
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
        path: 'allReservation',
        loadComponent: () =>
          import(
            '../Components/Admin/all-reservation/all-reservation.component'
          ).then((m) => m.AllReservationComponent),
        title: 'All Reservation',
      },
      {
        path: 'AllSystemCaregivers',
        loadComponent: () =>
          import(
            '../Components/Admin/all-system-caregivers/all-system-caregivers.component'
          ).then((m) => m.AllSystemCaregiversComponent),
        title: 'All System Caregivers',
      },
      {
        path: 'orderdetailsad/:orderid',
        loadComponent: () =>
          import(
            '../Components/Admin/orderdetails/orderdetails.component'
          ).then((m) => m.OrderdetailsComponent),
        title: 'orderdetails',
      },
      {
        path: 'adminprofile',
        loadComponent: () =>
          import(
            '../Components/Admin/admin-profile/admin-profile.component'
          ).then((m) => m.AdminProfileComponent),
        title: 'Profile',
      },
      {
        path: 'customerprofile/:id',
        loadComponent: () =>
          import(
            '../Components/Admin/customeradmiprofile/customeradmiprofile.component'
          ).then((m) => m.CustomeradmiprofileComponent),
        title: 'Profile',
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
        path: 'transactions',
        loadComponent: () =>
          import(
            '../Components/Admin/transactions/transactions.component'
          ).then((m) => m.TransactionsComponent),
        title: 'Transactions',
      },
      {
        path: 'caregiverprofile/:nurseId',
        loadComponent: () =>
          import(
            '../Components/Admin/admin-nurse-profile/admin-nurse-profile.component'
          ).then((m) => m.AdminNurseProfileComponent),
        title: 'caregiver profile',
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
