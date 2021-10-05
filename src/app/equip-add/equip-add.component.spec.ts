import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipAddComponent } from './equip-add.component';


describe('EquipAddComponent', () => {
  let component: EquipAddComponent;
  let fixture: ComponentFixture<EquipAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
