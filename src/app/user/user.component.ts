// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../interface/User';
import { ModalDirective } from 'ngx-bootstrap';
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

  private userMobile: string;

  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  @ViewChild('userFormModal') public userFormModal: ModalDirective;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this.myForm = this.createUserForm();
  }

  ngOnInit() {

    this.userMobile = localStorage.getItem('mobile');

    this.getAllUsers(this.userMobile);

    this.searchText.valueChanges.subscribe(value => {
      const filteredUsers = this.allUsers.filter((user: IUser) => user.name.toLowerCase().includes(value));
      this.usersStream$ = Observable.of(filteredUsers);
    });
  }

  private createUserForm() {
    return this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: '',
      hobbies: '',
      address: ['', Validators.required],
    });
  }

  private getAllUsers(mobile: string) {
    this._userService.getAllUsers(mobile).subscribe((res: IUser[]) => {
      if (res) {
        this.allUsers = res;
        this.usersStream$ = Observable.of(this.allUsers);
      }
    });
  }

  public onSubmit(data) {
    console.log('the form data is :', data);
    if (this.operationType === 'Update') {
      this._userService.updateUser(this.userMobile, data.value).subscribe((res) => {
        console.log('the response is :', res);
        this.userFormModal.hide();
        this.getAllUsers(this.userMobile);
      });
    } else {
      this._userService.createUser(this.userMobile, data.value).subscribe((res) => {
        console.log('the response is :', res);
        this.userFormModal.hide();
        this.getAllUsers(this.userMobile);
      });
    }

  }

  public onUpdateUser(user: IUser) {
    this.operationType = 'Update';
    this.myForm = this._fb.group(user);
    console.log('the user is :', user);
  }

  public onDeleteUser(user: IUser) {
    this.selectedUser = user;
    this.confirmationMessage = 'Are you sure want to delete?';
    console.log('the user is :', user);
  }

  public onConfirmation(data: boolean) {
    if (data) {
      this._userService.deleteUser(this.userMobile, this.selectedUser.id).subscribe((res) => {
        console.log('the delete response is :', res);
        this.getAllUsers(this.userMobile);
      });
    }
    this.confirmationModal.hide();
  }

  public createNewUser() {
    this.userFormModal.show();
    this.operationType = 'Create';
    this.myForm = this.createUserForm();
    this.selectedUser = null;
  }
}
