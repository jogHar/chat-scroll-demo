import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  viewSpinner: Boolean = false;
  message:String = '';
  messageCount: Number=0;

  months: String[] = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  @ViewChild(PerfectScrollbarDirective, { static: false }) psContainer: PerfectScrollbarDirective;

  ngOnInit() {
    this.initMessage();
    this.scrollToBottom();
  }

  initMessage() {
    for(var i=0;i<20;i++){
      let classMe = this.isClassMe();
      this.message += '<div class="messages '+classMe+'">INITIAL messages<br/><span class="date-css">'+ new Date()+'</span> </div>';
      this.messageCount = i+1;
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.psContainer.update();
      this.psContainer.scrollToBottom(0, 400);
    })
  }

  onScroll($event) {
    if($event.srcElement.scrollTop == 0){
      this.viewSpineer =true;
      // get older message by service
      setTimeout (() => {
        for(var i=0; i<10; i++) {
          let classMe = this.isClassMe();
          this.messageCount = this.messageCount+1;
          this.message = '<div class="messages '+classMe+'">NEW '+ this.messageCount +' messages<br/><span class="date-css">'+ new Date()+'</span> </div>'  + this.message;
        }
        this.psContainer.update();
        this.psContainer.scrollToTop(300, 400);
        this.viewSpineer =false;
      }, 1000);
    }
  }

  isClassMe() {
     let me = Math.floor((Math.random() * 2) + 1);
      let classMe = '';
      if(me == 1) {
        classMe = 'me';
      }

      return classMe;
  }

  getDate() {
    let current_datetime = new Date();
    return current_datetime.getDate() + "-" + this.months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
  }
}
