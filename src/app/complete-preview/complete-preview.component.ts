import { Component, OnInit } from '@angular/core';
import { MessageService } from "../_services/message.service";

@Component({
  selector: 'app-complete-preview',
  templateUrl: './complete-preview.component.html',
  styleUrls: ['./complete-preview.component.scss']
})
export class CompletePreviewComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onBackClicked() {
    this.messageService.singleMessage('goToEditor');
  }
}
