import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(evt: string, value: any) {
    this.subject.next({ evtName: evt, evtVal: value });
  }

  singleMessage(evt: string) {
    this.subject.next({evtName: evt});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
