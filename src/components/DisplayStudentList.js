import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayStudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [error, setError] = useState('');

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/studentdetails');
      setStudents(response.data);

      // Extract unique batches from student data
      const uniqueBatches = [...new Set(response.data.map(student => student.batch))];
      setBatches(uniqueBatches);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      const filtered = students.filter(student => student.batch === selectedBatch);
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedBatch, students]);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  return (
    <div className="container-fluid mt-5">
      <h4 className="mb-4 text-center">Filter Student Details by Batch</h4>

      <div className="mb-4 row">
        <div className='col-md-4'></div>
        <div className='col-md-4'>
        <label htmlFor="batch-select" className="form-label">Select Batch:</label>
        <select id="batch-select" className="form-select" value={selectedBatch} onChange={handleBatchChange}>
          <option value="">Select Batche</option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        </div>
        <div className='col-md-4'></div>

      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Mobile Number</th>
              <th>Parent Number</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>

            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.fatherName}</td>
                <td>{student.rollNo}</td>
                <td>{student.branch}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.parentNumber}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStudentList;
