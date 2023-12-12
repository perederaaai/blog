import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState, selectAuthList } from '../../store';
import { IAuth } from '../../store/auth/auth.reducer';
import { adminAuthGetUserData } from '../../store/auth/auth.action';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public message: string;
  public auth$: Observable<IAuth>;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private store$: Store<IState>,
  ) {
  };

  ngOnInit() {
    this.initForm();
    this.checkQueryParams();
  };

  initForm(): void {
    this.auth$ = this.store$.select(selectAuthList);
    this.form = this.fb.group({
      email: ['igor.peredera@gmail.com', [Validators.email, Validators.required]],
      password: ['111111', [Validators.minLength(6), Validators.required]],
    });
  };

  checkQueryParams(): void {
    this.route.queryParams.subscribe((params): void => {
      if (params['loginAgain']) {
        this.message = 'Спочатку увійдіть в систему'
      }
      this.auth.token ? this.message = '' : null;
    });
  };

  submit(): void {
    this.store$.dispatch(adminAuthGetUserData({userData: this.form.value}))
    if (!this.form.valid) {
      this.form.value.returnSecureToken = false;
    }
  };


}
