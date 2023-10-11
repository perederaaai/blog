import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    public form: FormGroup;
    public message: string;

    constructor(public auth: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertService,
                private fb: FormBuilder,
    ) {
    };

    ngOnInit() {
        this.initForm();
        this.checkQueryParams();
    }

    initForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]],
        });
    }

    checkQueryParams():void {
        this.route.queryParams.subscribe((params): void => {
            if (params['loginAgain']) {
                this.message = 'Спочатку увійдіть в систему'
            }
        });
    }

    submit(): void {
        if (!this.form.valid) return;

        const userData: IUserData = this.form.value;
        this.auth.logIn(userData)
            .subscribe((resp) => {
                this.form.reset();
                this.alert.warning('Авторизацію пройдено');
                this.router.navigate(['/admin', 'dashboard']);
                this.auth.panelFlag = true;
            });
    }


}
