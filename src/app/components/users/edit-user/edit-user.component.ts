import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;
  userId!: number;
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.user = this.userService.getUserById(this.userId) || { id: 0, name: '', email: '', role: '' };

    if (!this.user) {
      // Handle user not found, redirect to a not found page or show an error message.
      this.router.navigate(['/not-found']);
    }

    // Populate the form with the user's data
    this.userForm.setValue({
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = { ...this.user, ...this.userForm.value };
      this.userService.editUser(updatedUser);
      this.router.navigate(['/']);
    }
  }

}
