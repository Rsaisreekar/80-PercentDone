import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsersComponent {
  roles = ['ADMIN', 'STUDENT', 'EXAMINER'];

  users = [
    { userId: 1, name: 'Alice', email: 'alice@gmail.com', role: 'STUDENT' },
    { userId: 2, name: 'Bob', email: 'bob@example.com', role: 'EXAMINER' },
    { userId: 3, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN' }
  ];

  updateRole(userId: number, newRole: string) {
    const user = this.users.find(u => u.userId === userId);
    if (user) {
      user.role = newRole;
      alert(`Updated role for ${user.name} to ${newRole}`);
      // Later: Call backend PUT API to update role
    }
  }
}
