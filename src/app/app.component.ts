import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.production;
  toggler = false;
  
  constructor(public authService:AuthService) {}
}
