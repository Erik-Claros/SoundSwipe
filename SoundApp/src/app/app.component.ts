import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SoundApp';

  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.loadUsers();
  }

  loadUsers() {
      this.userService.getUsers().subscribe(data => {
          this.users = data;
      });
  }

  addUser() {
      const newUser = { phone: '1234567890', first_name: 'John', last_name: 'Doe' };
      this.userService.addUser(newUser).subscribe(() => {
          this.loadUsers();
      });
  }

  deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(() => {
          this.loadUsers();
      });
  }
}