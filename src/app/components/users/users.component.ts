import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'email', 'role','actions'];
  users: User[] = [];
  public dataSource: MatTableDataSource<any> 

    constructor(private userService:UserService,    private router: Router
      ) {   this.dataSource = new MatTableDataSource;
      }

  ngOnInit(): void {
  const users = this.userService.getUsers();
    console.log("this.users",this.users);
    this.dataSource =new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;

  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  const users = this.userService.getUsers();

    this.dataSource =  new MatTableDataSource<User>(users);
  }

  editUser(userId: number): void {
    // Navigate to the edit user page with the user's ID as a parameter
    this.router.navigate(['/edit-user', userId]);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
