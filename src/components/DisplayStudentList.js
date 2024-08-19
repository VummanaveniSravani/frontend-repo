import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayStudentList = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All'); // Added state for batch selection

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/studentdetails`);
      setStudents(response.data);
      setFilteredStudents(response.data); // Initialize filtered data
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

 

 // Filter students based on selected batch
 useEffect(() => {
  if (selectedBatch) {
    const filtered = students.filter(student => student.batch === selectedBatch);
    setFilteredStudents(filtered);
  } else {
    setFilteredStudents(students);
  }
}, [selectedBatch, students]);

useEffect(() => {
  fetchStudentData();
}, []);

  return (
    <div className="container-fluid mt-5">
      <h4 className="mb-4 text-center">Student Details</h4>
      
      {/* Batch filter dropdown */}
      <div className="mb-4 text-center">
        <label htmlFor="batchFilter">Filter by Batch: </label>
        <select
          id="batchFilter"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {[...new Set(students.map(student => student.batch))].map((batch, index) => (
            <option key={index} value={batch}>{batch}</option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Branch</th>
              <th>Mobile Number</th>
              <th>Parent Number</th>
              <th>Email</th>
              {/* <th>Date of Birth</th> */}
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.batch}</td>
                  <td>{student.branch}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{student.parentNumber}</td>
                  <td>{student.email}</td>
                  {/* <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td> */}
                  <td>{student.gender}</td>
                  <td>{student.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStudentList;
