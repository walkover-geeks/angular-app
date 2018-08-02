// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export interface IUser {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  city: string;
  hobbies: string[];
  address: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public userStream$: Observable<IUser[]>;

  public myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.createUserForm();
  }

  ngOnInit() {
    this.userStream$ = Observable.of([{
      name: 'Arpit',
      email: 'abc@gmail.com',
      mobile: '1234567890',
      gender: 'M',
      city: 'Indore',
      hobbies: ['game'],
      address: 'Indore'
    }]);
  }

  private createUserForm() {
    return this.fb.group({
      name: ['', Validators.required],
      email: '',
      mobile: '',
      gender: '',
      city: '',
      hobbies: '',
      address: '',
    });
  }

  public onSubmit(data) {
    console.log('the form data is :', data);
  }
}
