import { Component, OnInit, OnDestroy } from "@angular/core";
import { SliderChangeEventArgs } from "@syncfusion/ej2-angular-inputs";
import { MessageService } from "../_services/message.service";
import { Subscription } from "rxjs";

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
      }
    });
  }

  ngOnInit() {
    this.bVideoStarted = false;
    this.curTime = 0;
    this.totalTime = 1537;
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

  restartVideo() {
    this.curTime = 0;
  }

  onTimeValueChange(args: SliderChangeEventArgs) {
    const curValue: any = args.value;
    this.curTime = curValue;
    this.formartCurTime();
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

  addSubTitle() {
    this.subTitleElements.push(this.subTitleElements.length);
    this.messageService.singleMessage("showBtnComplete");
  }

  deleteSubTitle(index) {
    this.subTitleElements.splice(this.subTitleElements.indexOf(index), 1);
    if (this.subTitleElements.length == 0) {
      this.messageService.singleMessage("hideBtnComplete");
    }
  }
}
