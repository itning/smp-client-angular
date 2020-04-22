import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../../service/security.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isCollapsed = false;
  logoImageSrc = 'assets/logo.png';
  loginName: string;
  isChangePasswordModalVisible = false;
  passwordVisible = false;
  newPassword: string;
  isChangePasswordModalLoading = false;

  constructor(private securityService: SecurityService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.loginName = this.securityService.getUserInfo().name;
  }

  onCollapsedChange() {
    if (this.isCollapsed) {
      this.logoImageSrc = 'assets/logo.png';
    } else {
      this.logoImageSrc = 'assets/logo-small.png';
    }
    this.isCollapsed = !this.isCollapsed;
  }

  changePwd() {
    if (this.newPassword && this.newPassword.trim() !== '') {
      this.isChangePasswordModalLoading = true;
      this.securityService.changePassword(this.newPassword.trim()).subscribe(() => {
        this.isChangePasswordModalVisible = false;
        this.message.success('修改成功，请重新登录').onClose.subscribe(() => {
          this.securityService.logout();
        });
      }, () => {
      }, () => {
        this.isChangePasswordModalLoading = false;
      });
    } else {
      this.message.error('密码不能为空');
    }
  }

  logout() {
    this.securityService.logout();
  }
}
