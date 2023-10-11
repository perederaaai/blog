import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
    constructor(public auth: AuthService) {
    }

    logOut(event: Event): void {
        event.preventDefault()
        this.auth.logOut()
    }

}
