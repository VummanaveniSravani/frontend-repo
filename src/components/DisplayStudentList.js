import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayStudentList = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/studentdetails');
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Filter Student Details by RollNo</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Roll No</th>
              <th>Mobile Number</th>
              <th>Parent Number</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.fatherName}</td>
                <td>{student.rollNo}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.parentNumber}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.address}</td>
                <td>{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStudentList;
