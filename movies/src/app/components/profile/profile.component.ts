import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   user!:{
    name:string,
    email:string
   }
  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
   this.user=JSON.parse(localStorage.getItem('UserData')!);

  }

}
