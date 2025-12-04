const User = require('../models/User');

class MemoryUserManager {
    constructor() {
        this.users = [];
        this.initializeData();
    }

    initializeData() {
        // Datos de ejemplo
        this.users.push(new User("1", "Juan", "Pérez", "González", "password123", "juan@example.com"));
        this.users.push(new User("2", "María", "López", "Rodríguez", "password456", "maria@example.com"));
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        return this.users.find(user => user.id === id);
    }

    add(user) {
        const exists = this.users.find(u => u.id === user.id);
        if (exists) {
            throw new Error("User with this ID already exists");
        }
        this.users.push(user);
        return user;
    }

    update(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error("User not found");
        }

        this.users[index] = new User(
            id,
            userData.name || this.users[index].name,
            userData.fLastName || this.users[index].fLastName,
            userData.sLastName || this.users[index].sLastName,
            userData.password || this.users[index].password,
            userData.email || this.users[index].email
        );

        return this.users[index];
    }

    remove(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error("User not found");
        }
        const removed = this.users.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryUserManager();
