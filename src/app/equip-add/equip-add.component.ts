import { UserService } from './../user/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { History } from "./history.interface";
import { Observable } from 'rxjs';

@Component({
  selector: 'equip-add',
  templateUrl: './equip-add.component.html',
  styleUrls: ['./equip-add.component.css']
})
export class EquipAddComponent implements OnInit {
  
  @Output() newStatusEvent = new EventEmitter<string>();

  history!: History;

  equipments!: Observable<{ id: number; title: string; }[]>;

  equip_id!: number;
  equip_serial!: number;
  register_date!: string;
  report!: string;

  result!: string ;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.equipments = this.userService.section_equipments ;
    this.equipments.subscribe((result: any) => console.log(result)) ;
    
  }

  addHistory () {
    this.history = {
      equipment_id : Number(this.equip_id) ,
      equipment_serial_number : Number(this.equip_serial) ,
      damage_report : this.report ,
      register_date : new Date().toISOString().split('T')[0] ,
      user_id : Number(this.authService.currentUser.id) ,
      section_id : Number(this.authService.currentUser.section_id) ,
      name : this.authService.currentUser.name ,
      military_id : Number(this.authService.currentUser.military_id) ,
      title : "" ,
      id: 0,
      equipment_title: "",
      created_at: new Date().toISOString().split('T')[0]
    }
    
    
    this.userService.add_history(this.history).subscribe((res) => {
      this.result = "done" ;
      this.newStatusEvent.emit(this.result) ;
    },
    (e) => this.newStatusEvent.emit("error")) ;
  }

}
