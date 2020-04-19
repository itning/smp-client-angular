import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../../service/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
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
          this.router.navigate(['/']).catch((error) => console.error(error));
        }, () => {
        }, () => {
          this.isLoading = false;
        });
    }
  }
}
