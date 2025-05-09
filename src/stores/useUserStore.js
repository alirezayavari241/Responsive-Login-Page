import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [], 
    isLogged: localStorage.getItem('isLogged') === 'true',
  }),
  actions: {
    loadUsersFromStorage() {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    },
    login(email, password) {
      this.loadUsersFromStorage(); 
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        this.isLogged = true;
        localStorage.setItem('isLogged', 'true');
        return 'Login successful';
      } else {
        return 'Invalid email or password';
      }
    },
    register(username, email, password) {
      this.loadUsersFromStorage();
      const userExists = this.users.find((user) => user.email === email);
      if (userExists) {
        return 'User already exists';
      }

      const newUser = { username, email, password };
      const updatedUsers = [...this.users, newUser];
      this.users = updatedUsers;
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      this.isLogged = true;
      localStorage.setItem('isLogged', 'true');
      return 'Registration successful';
    },
  },
});
