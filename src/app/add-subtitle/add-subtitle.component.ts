import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subtitle',
  templateUrl: './add-subtitle.component.html',
  styleUrls: ['./add-subtitle.component.scss']
})
export class AddSubtitleComponent implements OnInit {
  public maxvalue: number;
  public rangevalue: any;

  constructor() { }

  ngOnInit() {
    this.maxvalue = 1537;
    this.rangevalue = [0, 400];
  }

}
