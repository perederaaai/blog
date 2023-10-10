import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay: number = 2000;
  public text: string;
  public type: string;
  alSub: Subscription;
  alertFlag: boolean = false

  constructor(private alertS: AlertService) {
  }

  ngOnInit() {
    console.log(121212)
    this.alSub = this.alertS.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    });

  };

  ngOnDestroy() {
    if (this.alSub) {
      this.alSub.unsubscribe()
    }
  };

}
