import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SliderComponent, SliderChangeEventArgs } from "@syncfusion/ej2-angular-inputs";
import { MessageService } from "../_services/message.service";
import { Subscription } from "rxjs";

import { ServiceType } from '../_services/constents';

@Component({
  selector: "app-subtitle-element",
  templateUrl: "./subtitle-element.component.html",
  styleUrls: ["./subtitle-element.component.scss"]
})
export class SubtitleElementComponent implements OnInit, OnDestroy {
  public eventSlider: SliderComponent;
  public maxvalue: number;
  public rangevalue: any;
  public rangetype: string = "Range";
  public startTimeString: string;
  public endTimeString: string;

  @Input() index: number;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(evt => {
      switch (evt.evtName) {
        case ServiceType.ST_TIMERANGE_SET_START: {
          if (evt.evtVal.index == this.index)
            this.setSubTitleTimeRange(evt.evtName, evt.evtVal.value);
          break;
        }
        case ServiceType.ST_TIMERANGE_SET_END: {
          if (evt.evtVal.index == this.index)
            this.setSubTitleTimeRange(evt.evtName, evt.evtVal.value);
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.maxvalue = 1537;
    this.rangevalue = [0, 400];
    this.formartTimeString();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  formartTimeString() {
    this.startTimeString = this.formartCurTime(this.rangevalue[0]);
    this.endTimeString = this.formartCurTime(this.rangevalue[1]);
  }

  formartCurTime(curTime) {
    var minString, secString;
    if (curTime / 60 < 10) {
      minString = "0" + (curTime - (curTime % 60)) / 60;
    } else {
      minString = "" + (curTime - (curTime % 60)) / 60;
    }
    if (curTime % 60 < 10) {
      secString = "0" + curTime % 60;
    } else {
      secString = "" + curTime % 60;
    }
    return minString + ":" + secString;
  }

  // Slider Events
  onRangeValueChange(args: SliderChangeEventArgs) {
    this.rangevalue = args.value;
    this.formartTimeString();
  }

  // Delete Button Event
  deleteSubTitleElement() {
    this.sendMessage("delete", this.index);
  }

  // SetTime Button Events
  onSetStartTime() {
    this.messageService.sendMessage(ServiceType.ST_TIMERANGE_EVT_START, this.index);
  }

  onSetEndTime() {
    this.messageService.sendMessage(ServiceType.ST_TIMERANGE_EVT_END, this.index);
  }

  // Communication Events between here and editor-panel
  sendMessage(evt, value): void {
    this.messageService.sendMessage(evt, value);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  setSubTitleTimeRange(evt, value) {
    switch (evt) {
      case ServiceType.ST_TIMERANGE_SET_START: {
        const endValue = this.rangevalue[1];
        this.rangevalue = [value, endValue];
        break;
      }
      case ServiceType.ST_TIMERANGE_SET_END: {
        const startValue = this.rangevalue[0];
        this.rangevalue = [startValue, value];
        break;
      }
    }
  }
}
