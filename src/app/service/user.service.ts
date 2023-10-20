import { Injectable } from '@angular/core';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private nextId: number = this.users.length + 1;

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  addUser(user: User): void {
    user.id = this.nextId++;
    this.users.push(user);
    this.saveUsers();
  }

  editUser(user: User): void {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
    this.saveUsers();
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
    this.saveUsers();
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
