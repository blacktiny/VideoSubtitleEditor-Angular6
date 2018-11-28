import { Component } from '@angular/core';
import { MessageService } from "./_services/message.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public bComplete: boolean = false;
  title = 'video-editor';

  message: any;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    console.log(this.bComplete);
    this.subscription = this.messageService.getMessage().subscribe(evt => {
      switch (evt.evtName) {
        case 'goToEditor': {
          this.bComplete = false;
          break;
        }
        case 'goToComplete': {
          this.bComplete = true;
          break;
        }
      }
    });
  }
}
