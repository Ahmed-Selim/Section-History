import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'equip-search',
  templateUrl: './equip-search.component.html',
  styleUrls: ['./equip-search.component.css']
})
export class EquipSearchComponent implements OnInit {

  @Output() newQueryEvent = new EventEmitter<number|null>();
  query!: number ;

  constructor() { }

  ngOnInit(): void {
  }

  returnQuery(value: number|null) {
    this.newQueryEvent.emit(value) ;
  }

}
