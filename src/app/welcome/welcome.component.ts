import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  public mobile = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]+')]);

  constructor(private router: Router) {
    //
  }

  ngOnInit() {
    if (localStorage.getItem('mobile')) {
      this.router.navigate(['users']);
    }
  }

  public saveMobileNumber(mobileControl: FormControl) {
    const mobile = mobileControl.value;
    localStorage.setItem('mobile', mobile);
    this.router.navigate(['users']);
  }
}
