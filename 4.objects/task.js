function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
};

Student.prototype.addMarks = function (...marksToAdd) {
  if (!this.marks || !Array.isArray(this.marks)) {
    return;
  }

  for (const mark of marksToAdd) {
    if (typeof mark === 'number' && mark >= 1 && mark <= 5) {
      this.marks.push(mark);
    }
  }
};

Student.prototype.getAverage = function () {
  if (!this.marks || !Array.isArray(this.marks) || this.marks.length === 0) {
    return 0;
  }

  const sum = this.marks.reduce((acc, mark) => acc + mark, 0);
  return sum / this.marks.length;
};

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;

  this.excluded = reason;
};