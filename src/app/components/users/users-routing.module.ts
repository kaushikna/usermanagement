import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [  
  { path: '', component: UsersComponent, pathMatch: 'full' }, 
  { path: '', component: UsersComponent },
  { path: 'edit-user/:id',component: EditUserComponent,},
  { path: 'add-user',component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
