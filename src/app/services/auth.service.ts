import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user:User) {
    
    const Url =  environment.API_URL + '/user/login.php';
      const headers = new HttpHeaders;
      const body = JSON.stringify(
        {
          military_id: user.military_id ,
          pswrd: user.pswrd
        }
      );
        headers.append('Access-Control-Allow-Origin', '*');

      return this.http.post<User>(Url,body,{headers: headers})
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }

  isLoggedIn() {
    return localStorage.getItem("user") ? true : false ;
  }
  
  get currentUser() {
    let user =  localStorage.getItem("user") ;
    if (!user)
      return {} ;
    else
      return JSON.parse(user) ;
  }
}
