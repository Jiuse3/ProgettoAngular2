import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, tap } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

/*export interface AuthData {
  accessToken: string,
  user : {
      id: number,
      email: string,
  }
}
export interface SignupData {
  name: string,
  email: string,
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject  = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(map(u=>!!u))
  logged:boolean=false;


  user! : {id: number, email: string };



  path: string = 'http://localhost:4201/api'
  constructor(private http: HttpClient) { }

  signUp(user: {email: string, password:string, name: string}){
    return this.http.post<AuthData>(`${this.path}/users`, user);
  }


  signIn(user: {email: string, password: string}){
    return this.http.post<AuthData>(`${this.path}/login`, user).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data))
      this.user = data.user;
    }));
  }
}
*/
export interface AuthData {
  accessToken: string,
  user : {
      id: number,
      email: string,
  }
}
export interface SignupData {
  name: string,
  email: string,
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject  = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(map(u=>!!u))
  jwtHelper = new JwtHelperService();
  timeoutLogout: any;
 logged:boolean=false;

  user! : {id: number, email: string };



  path: string = 'http://localhost:4201/api'
  constructor(private http: HttpClient, private router: Router) {
    this.restore()
    //this.logged=true;
   }

  signUp(user: {email: string, password:string, name: string}){
    return this.http.post<AuthData>(`${this.path}/users`, user);
  }


  signIn(user: {email: string, password: string}){
    return this.http.post<AuthData>(`${this.path}/login`, user).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data))
      this.user = data.user;
    }));
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
      return
    }
    this.authSubject.next(userdata)
    this.logged=true;


  }
}
