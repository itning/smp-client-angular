import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  logoImageSrc = 'assets/logo.png';

  ngOnInit(): void {

  }

  onCollapsedChange() {
    if (this.isCollapsed) {
      this.logoImageSrc = 'assets/logo.png';
    } else {
      this.logoImageSrc = 'assets/logo-small.png';
    }
    this.isCollapsed = !this.isCollapsed;
  }

  onBtnClick(e) {
    console.log(e);
  }
}
