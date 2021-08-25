import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onActClick(){
    if(confirm("This link will take you to an external web site")) {
      window.location.href = "https://www.indiacode.nic.in/handle/123456789/1798?view_type=browse&sam_handle=123456789/1362";
    }
  }

}
