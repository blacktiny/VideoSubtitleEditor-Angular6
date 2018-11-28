import { Component, OnInit } from '@angular/core';
import { MessageService } from "../_services/message.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-video-panel',
  templateUrl: './Video-panel.component.html',
  styleUrls: ['./Video-panel.component.scss']
})
export class VideoPanelComponent implements OnInit {
  public fonts: any;
  public fontSizes: any;
  public bShowBtnComplete: boolean = false;
  public screenSizeType: number = 3;

  message: any;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(evt => {
      switch (evt.evtName) {
        case 'showBtnComplete': {
          this.bShowBtnComplete = true;
          break;
        }
        case 'hideBtnComplete': {
          this.bShowBtnComplete = false;
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.fonts = [
      'Helvetica',
      'Al Bayan',
      'Al Nile',
      'Al Tarikh'
    ];
    this.fontSizes = [
      100.3
    ]
  }

  onCompleteClicked() {
    this.messageService.singleMessage('goToComplete');
  }

  onScreenSizeChanged(nSizeType) {
    this.screenSizeType = nSizeType;
  }
}
