import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  username: string;
  email: string;
  usertype: string

  isModalOpen = false;
  constructor(private service: AccountService,
    public toast: ToastComponent,) { }

  ngOnInit(): void {
  }

  getUsers(): void {

  }

  createUser(): void {

    this.isModalOpen = true;
    this.username = '';
    this.email = '';
    this.usertype = '';


    

  }


  closemodal(): void {

    this.isModalOpen = false;
  }

  saveUser(): void {
    let user = {
      "username": this.username,
      "email": this.email,
      "password": Math.random().toString(36).slice(-8),
      "role": [this.usertype]
    }

    this.service.createUser(user).subscribe(data=>{
      this.isModalOpen = false;
    this.username = '';
    this.email = '';
    this.usertype = '';

    }, er=>{
      console.log(er.error.message);
      this.toast.setMessage(er.error.message, 'danger')
    })

  }
}
