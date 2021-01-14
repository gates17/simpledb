import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  show:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNav() {
    this.show = !this.show;
    console.log(this.show)
    if(this.show){
      document.getElementById("mySidenav").style.width = "100%"
    }
    else {
      document.getElementById("mySidenav").style.width = "0%";
    }
  }

}
