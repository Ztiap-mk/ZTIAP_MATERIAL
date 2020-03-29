class Person {
    constructor(firstName, lastName, age, genderValue) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = genderValue;
    }

    set gender(genderValue) {
        if (genderValue !== 'M' && genderValue !== 'F') {
            throw new Error('Invalid gender');
        }
        this._gender = genderValue;
    }

    get gender() {
        return this._gender;
    }

    salutation() {
        return this._gender === 'M'
            ? 'Pan'
            : 'Pani';
    }

    greetings() {
        return `Ahoj, Ja som ${this.salutation()} ${this.firstName} ${this.lastName}`;
    }
}

class Teacher extends Person {
    constructor(firstName, lastName, age, genderValue, subject) {
        super(firstName, lastName, age, genderValue)

        this.subject = subject;
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    greetings() {
        return `Ahoj, Volam sa ${this.firstName} ${this.lastName} a budem vas ucit tento predment '${this.subject}'`;
    }

    pickRandomStudent() {
        const min = 0;
        const max = this.students.length === 0 
            ? 0 
            : this.students.length - 1;
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
        return this.students[randomIndex];
    }
}

class Student extends Person {
    constructor(firstName, lastName, age, genderValue) {
        super(firstName, lastName, age, genderValue)

        this._subjects = [];
    }

    get subjects() {
        return this._subjects;
    }

    addSubject(subject) {
        this._subjects.push(subject);
        return this;
    }

    greetings() {
        return `Ahoj, Som student a volam sa ${this.firstName} ${this.lastName}`;
    }
}


const person1 = new Person('Jozo', 'Veselica', 24, 'M');
const teacher1 = new Teacher('Fero', 'Veselica', 47, 'M', 'ZTIAP');
const student1 = new Student('Jan', 'Mrkvica', 26, 'M');
const student2 = new Student('Zlatica', 'Puskarova', 76, 'F');
console.log(person1.greetings());
console.log(teacher1.greetings());
console.log(student1.greetings());

teacher1.addStudent(student1);
teacher1.addStudent(student2);

student1.addSubject('ZTIAP').addSubject('ZMTMO');
student2.addSubject('ZTIAP').addSubject('DSA');
console.log(teacher1.pickRandomStudent());