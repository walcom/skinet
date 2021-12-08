import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  // tslint:disable-next-line: no-bitwise
  private currentUserSource = new ReplaySubject<IUser>(1); // new BehaviorSubject<IUser>(IUser | null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


  // tslint:disable-next-line: typedef
   /* getCurrentUserValue() {
    return this.currentUserSource.subscribe((data) => {
    }); // .value;
  } */


  // tslint:disable-next-line: typedef
  loadCurrentUser(token: string){
    if (token == null){
      this.currentUserSource.next(undefined);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: any) => { // IUser
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }


  // tslint:disable-next-line: typedef
  login(values: any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: any) => { // IUser
        if (user) {
          localStorage.setItem('token', user.token);
          console.log(user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }


  // tslint:disable-next-line: typedef
  Register(values: any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: any) => { // IUser
        if (user) {
          console.log(user);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }


  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(undefined);
    this.router.navigateByUrl('/');

  }

  // tslint:disable-next-line: typedef
  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

}
