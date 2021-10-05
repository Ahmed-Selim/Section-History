import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Input()

  showPassword: boolean = false ;
  invalidLogin: boolean = false ;
  user: User = {
    id: null,
    name: null,
    military_id: null,
    section_id: null,
    pswrd: null
  }
  
  constructor(private http: HttpClient, private router: Router,
      private authService: AuthService) {
    // const form = $("form.needs-validation") ;
    // form.keypress(function () {
    //     form[0].checkValidity() ;
    //     form[0].classList.add('was-validated') ;
    // })
    
    // $("#go").click(function (e) { 
    //     e.preventDefault();
    // });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
   }
  }

  signIn() {
    this.authService.login(this.user)
      .subscribe((result: any) => {
        if (result) {
          this.user = result ;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['/user/' + this.user.id ]) ;
        }
      },
      (e)=> {
        this.invalidLogin = true ;
      })
  }

}
