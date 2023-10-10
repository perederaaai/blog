import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './shared/component/admin-layout/admin-layout.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePostAdminComponent } from './create-page/create-page.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MainLayoutComponent } from '../shared/component/main-layout/main-layout.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { PostPageComponent } from '../post-page/post-page.component';
import { CardComponent } from '../shared/component/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { CustomInputComponent } from './shared/component/custom-input/custom-input.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AlertComponent } from './shared/component/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreatePostAdminComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'post/:id/edit',
        component: EditPostComponent,
        canActivate: [AuthGuard]

      },
    ]
  }
]


@NgModule({
  declarations: [
    AdminLayoutComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePostAdminComponent,
    EditPostComponent,
    CardComponent,
    CustomInputComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard, AlertService]
})
export class AdminModule {
}
