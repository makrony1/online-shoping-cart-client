import { Injectable } from '@angular/core';
import { CurrentUser } from '../shared/models/user';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessengerService } from '../shared/service/messenger.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SysAdminService {

  constructor(
    private http: HttpClient,
    private messengerService: MessengerService,
    private router: Router
  ) {}
}