import { map } from 'rxjs/operators';
import { History } from '../equip-add/history.interface';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  section_history = this.userService.load_section_history ;
  
  status: string | null = null ;
  query: number | null = null ;
  data = this.section_history ;
  doSearch = true ;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.load_history();
    
  }

  getQuery(query:number|null) {
    this.query = query ;
    this.data = this.section_history ;
    if (query) {
      this.data = this.data.pipe (
        map(items => 
         items.filter(row =>  row.equipment_serial_number == query ))) ;
    }
  }

  getStatus(status:string) {
    // this.status = status ;
    if (status == "done") {
      this.data = this.section_history = this.userService.load_section_history ;
    } 
  }

  search() { this.doSearch = true ;  }

  add() { 
      this.doSearch = false ;
      this.data = this.section_history ; 
  }

}
