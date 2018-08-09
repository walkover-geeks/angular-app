
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../interface/User';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public usersStream$: Observable<IUser[]>;

  public myForm: FormGroup;

  public operationType: 'Create' | 'Update' = 'Create';

  public searchText = new FormControl('');

  public confirmationMessage: string;

  private allUsers = [];

  private selectedUser: IUser;

  @ViewChild('confirmationModal') public confirmationModal: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService
  ) {
    this.myForm = this.createUserForm();
  }

  ngOnInit() {

    this.getAllUsers();

    this.searchText.valueChanges.subscribe(value => {
      const filteredUsers = this.allUsers.filter((user: IUser) => user.name.toLowerCase().includes(value));
      this.usersStream$ = Observable.of(filteredUsers);
    });
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

  private getAllUsers() {
    this._userService.getAllUsers().subscribe((res: IUser[]) => {
      if (res && res.length) {
        this.allUsers = res;
        this.usersStream$ = Observable.of(this.allUsers);
      }
    });
  }

  public onSubmit(data) {
    console.log('the form data is :', data);
    this._userService.createUser(data.value).subscribe((res) => {
      console.log('the response is :', res);
    });
  }

  public onUpdateUser(user: IUser) {
    this.operationType = 'Update';
    this.myForm = this.fb.group(user);
    console.log('the user is :', user);
  }

  public onDeleteUser(user: IUser) {
    this.selectedUser = user;
    this.confirmationMessage = 'Are you sure want to delete?';
    console.log('the user is :', user);
  }

  public onConfirmation(data: boolean) {
    if (data) {
      this._userService.deleteUser(this.selectedUser.id).subscribe((res) => {
        console.log('the delete response is :', res);
        this.getAllUsers();
      });
    }
    this.confirmationModal.hide();
  }
}
