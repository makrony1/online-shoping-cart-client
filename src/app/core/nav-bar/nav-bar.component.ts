import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { CurrentUser } from '../../shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<CurrentUser>;
  isLogedIn:boolean=false;
  isAdmin: boolean=false;
  isVendor: boolean=false;
  currentUserRoles:any[]=[];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(data=>{

      if(data!= null){
        this.isLogedIn=true;
        if(data.roles!= null || data.roles!= undefined){
          this.isAdmin= data.roles.find(x=>x=='ROLE_ADMIN')!= null;
          this.isVendor= data.roles.find(x=>x=='ROLE_VENDOR')!= null;
        }else{
          this.isAdmin=false;
          this.isVendor=false;

        }

      }else{
        this.isLogedIn=false;
        this.isAdmin=false;
        this.isVendor=false;

      }
      console.log(data);
      
    })
  }

  logout(): void {
    this.accountService.logout();
  }
}
