import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

    @Input() delay: number = 2000;
    public text: string;
    public type: string;
    public destroy$: Subject<void> = new Subject<void>();

    constructor(private alertS: AlertService) {
    }

    ngOnInit(): void {
        this.showAlertModal();
    };

    showAlertModal(): void {
        this.alertS.alert$
            .pipe(takeUntil(this.destroy$))
            .subscribe(alert => {
                this.text = alert.text;
                this.type = alert.type;
                const timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    this.text = '';
                }, this.delay);
            });
    };

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    };

}
