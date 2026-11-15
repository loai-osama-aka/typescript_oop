// Notes Managment System

// base class user class
class User {
  //  note: Note={title,content,userId:this._id}
  private note: Note[] = [];
  constructor(
    private _id: number,
    public name: string,
    public email: string,
    private _password: string,
    protected phone: string,
    public age: number,
    public noteBooks: NoteBook[],
  ) {
    if (this.age < 18 || this.age > 60) {
      throw new Error("you cant add this user ");
    }
  }

  public get id(): number {
    return this._id;
  }

  addNoteBook(noteBook: NoteBook) {
    this.noteBooks.push(noteBook);
  }

  removeNoteBook(notebookName: string) {
    this.noteBooks.filter((notebook) => {
      return notebook.name !== notebookName;
    });
  }

  public displayInfo() {
    console.log(
      `userName:${this.name},\nemail:${this.email},\nphone:${this.phone},\nage:${this.age}`,
    );
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
}

// Class Admin
class Admin extends User {
  private notes: string[] = [];
  constructor(
    _id: number,
    public name: string,
    public email: string,
    _password: string,
    protected phone: string,
    public age: number,
    public noteBook: NoteBook[],
  ) {
    super(_id, name, email, _password, phone, age, noteBook);
  }

  manageNotes(action: "add" | "delete", noted: string) {
    if (action == "add") {
      this.notes.push(noted);
      console.log("note add succfully");
    } else if (action == "delete") {
      let index: number = this.notes.findIndex((note) => note == noted);
      //   console.log(index);
      if (index == -1) {
        throw new Error("note not found");
      }
      this.notes.splice(index, 1);
      console.log("Note deleted successfully!");
      //   console.log(this.notes);
    }
  }
  showNotes() {
    console.log(this.notes);
  }
}

//Class Notes
class Note {
  id: number;
  title: string;
  content: string;
  userId: User;

  constructor(id: number, title: string, content: string, userId: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    console.log("===================");
    console.log(userId, "useeeerId");
  }

  preview(): string {
    if (this.content.length <= 30) {
      return this.content;
    }
    return `${this.content.slice(0, 30)}...`;
  }
}

//classNoteBook
class NoteBook {
  private notes: Note[] = [];
  constructor(
    public name: string,
    public pages: number,
  ) {}

  addNote(id: number, title: string, content: string, userId: User) {
    const note = new Note(id, title, content, userId);
    this.notes.push(note);
  }
  removeNote(id: number) {
    const index = this.notes.findIndex((value: Note) => {
      return value.id == id;
    });

    if (index !== -1) {
      this.notes.splice(index, 1);
      console.log("note deleted successfully");
    } else if (index === -1) {
      throw new Error("Note not found");
    }
  }
}
// generic class
class Storage<T> {
  private items: T[] = [];

  constructor() {}

  getAllItems(): T[] {
    return [...this.items];
  }
  addItem(item: T): T[] {
    this.items.push(item);
    return this.items;
  }
  removeItem(index: number): T[] {
    // this.items.splice(index, 1);
    const found = this.items.splice(index, 1);
    if (found.length === 0) {
      throw new Error("no element found");
    }

    return this.items;
  }
}
const storeString = new Storage<string>();
console.log(storeString.getAllItems());
console.log(storeString.addItem("s"));
console.log(storeString.removeItem(0));

//============================= objects =============================
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
// note1.userId.displayInfo();
// console.log(note1.preview());

noteBook1.addNote(1, "backend", "nodejs", user2);
console.log(noteBook1, "noteBook1");
noteBook1.removeNote(1);
//noteBook2
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
// admin2.manageNotes("add", "sara7a");
admin2.showNotes();
// admin2.manageNotes("delete", "sara7a");
admin2.showNotes();
