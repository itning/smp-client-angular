import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../../service/security.service';
import videojs from 'video.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', {static: true})
  videoElement: ElementRef;
  validateForm: FormGroup;
  isLoading = false;
  videoJs: videojs.Player;

  constructor(private fb: FormBuilder,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    const that = this;
    videojs(this.videoElement.nativeElement, {
      controls: false,
      autoplay: true,
      preload: 'auto'
    }).ready(function() {
      that.videoJs = this;
      // noinspection JSIgnoredPromiseFromCall
      this.play();
    });
  }

  ngOnDestroy(): void {
    this.videoJs.dispose();
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.securityService.login(this.validateForm.value.username, this.validateForm.value.password)
        .subscribe(() => {
          this.securityService.afterLogin();
        }, () => {
        }, () => {
          this.isLoading = false;
        });
    }
  }
}
