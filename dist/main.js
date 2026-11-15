"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    _id;
    name;
    email;
    _password;
    phone;
    age;
    noteBooks;
    note = [];
    constructor(_id, name, email, _password, phone, age, noteBooks) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this._password = _password;
        this.phone = phone;
        this.age = age;
        this.noteBooks = noteBooks;
        if (this.age < 18 || this.age > 60) {
            throw new Error("you cant add this user ");
        }
    }
    get id() {
        return this._id;
    }
    addNoteBook(noteBook) {
        this.noteBooks.push(noteBook);
    }
    removeNoteBook(notebookName) {
        this.noteBooks.filter((notebook) => {
            return notebook.name !== notebookName;
        });
    }
    displayInfo() {
        console.log(`userName:${this.name},\nemail:${this.email},\nphone:${this.phone},\nage:${this.age}`);
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}
class Admin extends User {
    name;
    email;
    phone;
    age;
    noteBook;
    notes = [];
    constructor(_id, name, email, _password, phone, age, noteBook) {
        super(_id, name, email, _password, phone, age, noteBook);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.noteBook = noteBook;
    }
    manageNotes(action, noted) {
        if (action == "add") {
            this.notes.push(noted);
            console.log("note add succfully");
        }
        else if (action == "delete") {
            let index = this.notes.findIndex((note) => note == noted);
            if (index == -1) {
                throw new Error("note not found");
            }
            this.notes.splice(index, 1);
            console.log("Note deleted successfully!");
        }
    }
    showNotes() {
        console.log(this.notes);
    }
}
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        console.log("===================");
        console.log(userId, "useeeerId");
    }
    preview() {
        if (this.content.length <= 30) {
            return this.content;
        }
        return `${this.content.slice(0, 30)}...`;
    }
}
class NoteBook {
    name;
    pages;
    notes = [];
    constructor(name, pages) {
        this.name = name;
        this.pages = pages;
    }
    addNote(id, title, content, userId) {
        const note = new Note(id, title, content, userId);
        this.notes.push(note);
    }
    removeNote(id) {
        const index = this.notes.findIndex((value) => {
            return value.id == id;
        });
        if (index !== -1) {
            this.notes.splice(index, 1);
            console.log("note deleted successfully");
        }
        else if (index === -1) {
            throw new Error("Note not found");
        }
    }
}
class Storage {
    items = [];
    constructor() { }
    getAllItems() {
        return this.items;
    }
    addItem(item) {
        this.items.push(item);
        return this.items;
    }
    removeItem(index) {
        const found = this.items.splice(index, 1);
        if (found.length === 0) {
            throw new Error("no element found");
        }
        return this.items;
    }
}
const storeString = new Storage();
console.log(storeString.getAllItems());
console.log(storeString.addItem("s"));
console.log(storeString.removeItem(0));
const noteBook1 = new NoteBook("osama's nootbook", 150);
const noteBook2 = new NoteBook("ahmed's nootbook", 150);
let user1 = new User(1, "ahmed", "loai.osa5050", "12456", "011", 20, [
    noteBook1,
    noteBook2,
]);
let user2 = new User(1, "osama", "loai.osa2030", "112233", "015", 25, [
    noteBook1,
]);
let admin1 = new Admin(1, "loai", "loai.osa2525", "123", "011", 25, []);
let admin2 = new Admin(2, "anas", "anas.osa2525", "124", "012", 25, []);
let note1 = new Note(1, "book", "salam alykumasadjnalknvbadlngal", user1);
noteBook1.addNote(1, "backend", "nodejs", user2);
console.log(noteBook1, "noteBook1");
noteBook1.removeNote(1);
noteBook2.addNote(2, "front", "react", user1);
console.log("======user1======");
user1.displayInfo();
console.log("======admin1======");
admin1.displayInfo();
admin1.manageNotes("add", "sara7a");
admin1.showNotes();
admin1.manageNotes("delete", "sara7a");
admin1.showNotes();
console.log("======admin2======");
admin2.displayInfo();
admin2.showNotes();
admin2.showNotes();
