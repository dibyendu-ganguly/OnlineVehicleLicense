import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onNotificationClick(){
    if(confirm("This link will take you to an external web site")) {
      window.location.href = "https://morth.nic.in/Motor-Vehicle-Legislation";
    }
  }
  onActClick(){
    if(confirm("This link will take you to an external web site")) {
      window.location.href = "https://www.indiacode.nic.in/handle/123456789/1798?view_type=browse&sam_handle=123456789/1362";
    }
  }
  onPublicMediaClick(){
    if(confirm("This link will take you to an external web site")) {
      window.location.href = "https://parivahan.gov.in/PNM-Mailer/";
    }
  }
  

  onLatestPressClick(){
    if(confirm("This link will take you to an external web site")) {
      window.location.href = "https://timesofindia.indiatimes.com/city/nagpur/now-take-learners-licence-test-from-home/articleshow/83524449.cms";
    }
  }

}
