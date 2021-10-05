import { HomepageComponent } from './homepage/homepage.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipAddComponent } from './equip-add/equip-add.component';
import { EquipSearchComponent } from './equip-search/equip-search.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path:'user/:id', component: UserComponent, canActivate:[AuthGuard] , children: [    
    { path:'equip-search', canActivate:[AuthGuard] , component: EquipSearchComponent, outlet: 'second'},
    { path:'equip-history', canActivate:[AuthGuard] , component: EquipAddComponent, outlet: 'second' },
  ] },
  { path: 'login', component: LoginComponent },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
