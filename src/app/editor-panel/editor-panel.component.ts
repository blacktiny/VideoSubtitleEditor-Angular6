import { Component, OnInit, OnDestroy } from "@angular/core";
import { SliderChangeEventArgs } from "@syncfusion/ej2-angular-inputs";
import { Subscription } from "rxjs";

import { MessageService } from "../_services/message.service";
import { ServiceType } from '../_services/constents';

@Component({
  selector: "app-editor-panel",
  templateUrl: "./editor-panel.component.html",
  styleUrls: ["./editor-panel.component.scss"]
})
export class EditorPanelComponent implements OnInit, OnDestroy {
  bVideoStarted: Boolean;
  curTime: any;
  totalTime: any;
  curTimeString: string;
  totalTimeString: string;
  subTitleElements = [];
  curElementIndex: number;
  interval;

  message: any;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(evt => {
      switch (evt.evtName) {
        case "delete": {
          this.deleteSubTitle(evt.evtVal);
          break;
        }
        case ServiceType.ST_TIMERANGE_EVT_START: {
          this.curElementIndex = evt.evtVal;
          this.setSubTitleTimeRange(ServiceType.ST_TIMERANGE_SET_START);
          break;
        }
        case ServiceType.ST_TIMERANGE_EVT_END: {
          this.curElementIndex = evt.evtVal;
          this.setSubTitleTimeRange(ServiceType.ST_TIMERANGE_SET_END);
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.bVideoStarted = false;
    this.curTime = 0;
    this.totalTime = 1537;
    this.curElementIndex = 0;
    this.formartCurTime();
    this.formartTotalTime();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formartCurTime() {
    var minString, secString;
    if (this.curTime / 60 < 10) {
      minString = "0" + (this.curTime - (this.curTime % 60)) / 60;
    } else {
      minString = "" + (this.curTime - (this.curTime % 60)) / 60;
    }
    if (this.curTime % 60 < 10) {
      secString = "0" + this.curTime % 60;
    } else {
      secString = "" + this.curTime % 60;
    }
    this.curTimeString = minString + ":" + secString;
  }

  formartTotalTime() {
    var minString, secString;
    if (this.totalTime / 60 < 10) {
      minString = "0" + (this.totalTime - (this.totalTime % 60)) / 60;
    } else {
      minString = "" + (this.totalTime - (this.totalTime % 60)) / 60;
    }
    if (this.totalTime % 60 < 10) {
      secString = "0" + this.totalTime % 60;
    } else {
      secString = "" + this.totalTime % 60;
    }
    this.totalTimeString = minString + ":" + secString;
  }

  // Button Evetns
  startVideo() {
    if (!this.bVideoStarted) {
      this.bVideoStarted = true;
      this.interval = setInterval(() => {
        if (this.curTime < this.totalTime) {
          this.curTime++;
        } else {
          this.curTime = 0;
        }
      }, 100);
    } else {
      this.bVideoStarted = false;
      clearInterval(this.interval);
    }
    this.formartCurTime();
  }

  onTimeValueChange(args: SliderChangeEventArgs) {
    const curValue: any = args.value;
    this.curTime = curValue;
    this.formartCurTime();
  }

  restartVideo() {
    this.curTime = 0;
  }

  backVideo() {
    this.curTime -= 5;
    if (this.curTime < 0) {
      this.curTime = 0;
    }
    this.formartCurTime();
  }

  forwardVideo() {
    this.curTime += 5;
    if (this.curTime > this.totalTime) {
      this.curTime = this.totalTime;
    }
    this.formartCurTime();
  }

  // Communication Events between here and video-panel
  addSubTitle() {
    this.subTitleElements.push(this.subTitleElements.length);
    this.curElementIndex = this.subTitleElements.length;
    this.messageService.singleMessage("showBtnComplete");
  }

  deleteSubTitle(index) {
    this.subTitleElements.splice(this.subTitleElements.indexOf(index), 1);
    if (this.subTitleElements.length == 0) {
      this.messageService.singleMessage("hideBtnComplete");
    }
  }

  // 
  setSubTitleTimeRange(evt) {
    console.log("curTime = ", this.curTime);
    const value = {
      "index": this.curElementIndex,
      "value": this.curTime
    }
    this.messageService.sendMessage(evt, value);
  }
}
