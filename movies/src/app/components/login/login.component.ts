import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData, AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$ = this.authSrv.authSubject.asObservable()
  currentUser: AuthData | undefined;
  constructor( private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){

    this.authSrv.isLoggedIn$.pipe(tap(u=> u=true ))

    this.authSrv.signIn(f.value).pipe(tap(res => {localStorage.setItem("UserData", JSON.stringify(res.user)),this.authSrv.logged=true;})).subscribe(()=>this.router.navigate(['/movies']));

  }

}
