import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
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
}
