import { Component, OnInit, Input } from "@angular/core";
import { SliderChangeEventArgs } from "@syncfusion/ej2-angular-inputs";
import { MessageService } from "../_services/message.service";

@Component({
  selector: "app-subtitle-element",
  templateUrl: "./subtitle-element.component.html",
  styleUrls: ["./subtitle-element.component.scss"]
})
export class SubtitleElementComponent implements OnInit {
  public maxvalue: number;
  public rangevalue: any;
  public rangetype: string = "Range";
  public startTimeString: string;
  public endTimeString: string;

  @Input() index: number;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.maxvalue = 1537;
    this.rangevalue = [0, 400];
    this.formartTimeString();
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

  // Communication Events between here and editor-panel
  sendMessage(evt, value): void {
    this.messageService.sendMessage(evt, value);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }
}
