import { History } from '../equip-add/history.interface';
import { AuthService } from './../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  get load_section_history () {
    const section_id = this.authService.currentUser.section_id ;
    const Url = environment.API_URL + '/history/read_section.php?sec_id=' + section_id;
    const headers = new HttpHeaders;
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<History[]>(Url,{headers: headers})
  }

  // get search_serial (serial: number) {
  //   const section_id = this.authService.currentUser.section_id ;
  //   const Url = 'http://localhost:80/section-history/api/history/read_section.php?sec_id=' + section_id;
  //   const headers = new HttpHeaders;
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   return this.http.get<History[]>(Url,{headers: headers})
  // }

  add_history(obj: History) {
    const Url = environment.API_URL + '/history/add.php';
    const headers = new HttpHeaders;
    headers.append('Access-Control-Allow-Origin', '*');
    const body = JSON.stringify(obj) ;

    console.log(body);
    
    return this.http.post(Url,body,{headers: headers}) ;
  }

  get section_equipments() {
    const section_id = this.authService.currentUser.section_id ;
    const Url = environment.API_URL + '/equipment/read_sec.php?sec_id=' + section_id;
    const headers = new HttpHeaders;
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<{ id: number; title: string; }[]>(Url,{headers: headers}) ;
  } 
}
