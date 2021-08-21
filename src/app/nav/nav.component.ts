import { isLoweredSymbol } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  isLoggedIn : boolean = false;
  userName ?: String; 

  ngOnInit(): void {

    if (localStorage.getItem('UserName') != null || sessionStorage.getItem('UserName') != null) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('UserName')?.toString();
    } else {
      this.isLoggedIn = false;
    }

  }

}
