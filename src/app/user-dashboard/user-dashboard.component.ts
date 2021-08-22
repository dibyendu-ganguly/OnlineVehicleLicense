import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  val = localStorage.getItem('UserName');

  ngOnInit(): void {

    // $("#menu-toggle").click(function (e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   $("#sidebar-wrapper").css("display","block");
    //   $("#page-content-wrapper").css("opacity","0.5");
    //   $("#page-content-wrapper").css("z-index","-1");
    // });

    // $("#close-sidebar").click(function (e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   $("#sidebar-wrapper").css("display","none");
    //   $("#page-content-wrapper").css("opacity","1");
    //   $("#page-content-wrapper").css("z-index","0");
    // });

    


    if (localStorage.getItem('UserName') == null && sessionStorage.getItem('UserName') == null) {
      this.router.navigate(['forbidden']);
    }
  }

}
