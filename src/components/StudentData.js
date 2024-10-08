import React, { useState } from 'react';
import StudentForm from './StudentForm';
import SingleStudent from './SingleStudent';

const StudentData = () => {
  const [newStudent, setNewStudent] = useState(null);
  const [rollNoFilter, setRollNoFilter] = useState('');

  const handleStudentAdded = (student) => {
    setNewStudent(student);
  };

  const handleRollNoChange = (e) => {
    setRollNoFilter(e.target.value);
  };

  return (
    <div>
      {/* <StudentForm onStudentAdded={handleStudentAdded} /> */}
      <div>
        {/* <input type="text" value={rollNoFilter} onChange={handleRollNoChange} placeholder='Roll No' /> */}
      </div>
      <SingleStudent/>
    </div>
  );
};

export default StudentData;
