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

  Equipments!: Observable<{ id: number; title: string; }[]>;
  Parts: RepairParts[] = [
    {id: 1 ,title: 'part1' ,sec_id: 1 ,equip_id: 1 ,quantity: 1 },
    {id: 2 ,title: 'part2' ,sec_id: 1 ,equip_id: 1 ,quantity: 1 },
  ] ;
  Bugs: Bug[] = [
    {id: 1 ,title: 'bug1' ,sec_id: 1 ,equip_id: 1 ,quantity: 1 },
    {id: 2 ,title: 'bug2' ,sec_id: 1 ,equip_id: 1 ,quantity: 1 },
  ] ;
  
  parts = this.Parts ;
  bugs = this.Bugs ;
  selectedBugs : Bug[] = [] ;
  selectedParts : RepairParts[] = [] ;
  
  equip_id!: number;
  equip_serial!: number;
  register_date!: string;
  report!: string;
  
  result!: string ;
  history!: History;
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.Equipments = this.userService.section_equipments ;
    // this.Equipments.subscribe((result: any) => console.log(result)) ;
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

  add_part(index: string) {
    if (!index) {
      return ;
    }
    let i = Number(index) ;
    this.selectedParts.push(this.parts[i]) ;
    this.parts.splice(i,1) ;
  }

  remove_selected_part(index: number) {
    let part = this.selectedParts[index] ;
    part.quantity = 1 ;
    this.selectedParts.splice(index,1) ;
    this.parts.push(part) ;
  }
  
  add_bug(index: string) {
    if (!index) {
      return ;
    }
    let i = Number(index) ;
    this.selectedBugs.push(this.bugs[i]) ;
    this.bugs.splice(i,1) ;
  }

  remove_selected_bug(index: number) {
    let bug = this.selectedBugs[index] ;
    bug.quantity = 1 ;
    this.selectedBugs.splice(index,1) ;
    this.bugs.push(bug) ;
  }

  print() {
    console.log("Equipment id : " , this.equip_id);
    console.log("Equipment serial : " , this.equip_serial);
    console.log("Register date : " , this.register_date);
    console.log("Notes : " , this.report);

    console.log(" Bugs : " , this.selectedBugs);
    console.log(" Parts : " , this.selectedParts);    
  }
}

interface RepairParts {
  id: number ;
  title: string ;
  sec_id: number ;
  equip_id: number ;
  quantity: number ;
}

interface Bug {
  id: number ;
  title: string ;
  sec_id: number ;
  equip_id: number ;
  quantity: number ;
}
