import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class EditUsersComponent {
  // Example users
  users = [
    { name: 'Alice', surname: 'Johnson', email: 'alice@gmail.com', role: 'User' },
    { name: 'Bob', surname: 'Smith', email: 'bob@gmail.com', role: 'Mentor' },
    { name: 'Clara', surname: 'Williams', email: 'clara@gmail.com', role: 'User' },
    { name: 'Admin', surname: '123', email: 'admin@gmail.com', role: 'Admin' },
  ];

  editUser(userIndex: number) {
    const user = this.users[userIndex];
    const newName = prompt('New Name', user.name);
    const newSurname = prompt('New Surname', user.surname);
    const newEmail = prompt('New Email', user.email);
    const newRole = prompt('New Role', user.role);

    if (newName && newSurname && newEmail && newRole) {
      this.users[userIndex] = {
        name: newName,
        surname: newSurname,
        email: newEmail,
        role: newRole
      };
      alert('✅ User updated!');
    }
  }

  deleteUser(userIndex: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(userIndex, 1);
      alert('✅ User deleted!');
    }
  }
}
