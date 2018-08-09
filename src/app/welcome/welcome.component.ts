import { Component } from '@angular/core';
import { FormControl } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {
  public mobile = new FormControl('');

  constructor(private router: Router) {
    //
  }

  public saveMobileNumber(mobileControl: FormControl) {
    const mobile = mobileControl.value;
    localStorage.setItem('mobile', mobile);
    this.router.navigateByUrl('/users');
  }
}
