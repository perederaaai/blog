import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserData } from '../../shared/interface';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
message: string;

  constructor(public auth: AuthService,
              private router: Router,
              private route : ActivatedRoute,
              private alert: AlertService,
              ) {};

  ngOnInit() {

    this.route.queryParams.subscribe((params)=>{
      if(params['loginAgain']){
        this.message = 'Спочатку увійдіть в систему'
      }
    })

    this.form = new FormGroup<any>({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  };

  submit() {
    if (this.form.invalid) {
      return;
    }

    const userData: IUserData = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.logIn(userData)
      .subscribe((resp) => {
        this.form.reset()
        this.alert.warning('Авторизацію пройдено')
        this.router.navigate(['/admin', 'dashboard'])
        return this.auth.panelFlag = true
      });
    // console.log(this.auth)

  }
}
