import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket  from '../Services/websocketService'

const SingleStudent = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/studentdetails`);
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  const handleSearch = (e) => {
    setSearchRollNo(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents([]);
    } else {
      const filtered = students.filter(student =>
        student.rollNo && student.rollNo.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="justify-content-center mt-3">
      <h4 className="mb-4">Upload Student Details</h4>
      <div className="row">
        <div className="col-md-3"></div>
         <div className="col-md-6 text-center">
         <input
          type="text"
          className="form-control"
          placeholder="Search by Roll No"
          value={searchRollNo}
          onChange={handleSearch}
        />
        </div>
        <div className="col-md-3"></div>
      </div>
      {message && <p className="p-3 mb-2 bg-success text-white">{message}</p>}
      {error && <p className="p-3 mb-2 bg-danger text-white">{error}</p>}
      <div className="table-responsive mt-3">
      {filteredStudents.map((student, index) => (
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
              <th>Address</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            
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
                <td>{student.address}</td>
                <td>{student.gender}</td>
              </tr>
          
          </tbody>
        </table>
          ))}
      </div>
    </div>
  );
};

export default SingleStudent;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SingleStudent = ({ rollNoFilter }) => {
//     const [students, setStudents] = useState([]);
//     const [editStudentId, setEditStudentId] = useState(null);
//     const [formValues, setFormValues] = useState({});

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/student');
//                 setStudents(response.data);
//             } catch (error) {
//                 console.error('Error fetching students:', error);
//             }
//         };

//         fetchStudents();
//     }, []);

//     const handleEdit = (student) => {
//         setEditStudentId(student.id);
//         setFormValues(student);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3001/student/${id}`);
//             setStudents(students.filter(student => student.id !== id));
//         } catch (error) {
//             console.error('Error deleting student:', error);
//         }
//     };

//     const handleSave = async () => {
//         try {
//             await axios.put(`http://localhost:3001/student/${editStudentId}`, formValues);
//             setStudents(students.map(student => student.id === editStudentId ? formValues : student));
//             setEditStudentId(null);
//             setFormValues({});
//         } catch (error) {
//             console.error('Error saving student:', error);
//         }
//     };

//     const handleCancel = () => {
//         setEditStudentId(null);
//         setFormValues({});
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const filteredStudents = students.filter(student => student.rno === rollNoFilter);

//     return (
//         <div>
//             {filteredStudents.length > 0 ? (
//                 <div className='table-responsive container-fluid w-100 py-5'>
//                     <h2 className='py-3'>Student Activities</h2>
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th>First Name</th>
//                                 <th>Last Name</th>
//                                 <th>Father's Name</th>
//                                 <th>Roll No</th>
//                                 <th>Mobile No</th>
//                                 <th>Email Id</th>
//                                 <th>DOB</th>
//                                 <th>Address</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredStudents.map((student) => (
//                                 <tr key={student.id}>
//                                     {editStudentId === student.id ? (
//                                         <>
//                                             <td><input type="text" name="finame" value={formValues.finame} onChange={handleChange} /></td>
//                                             <td><input type="text" name="laname" value={formValues.laname} onChange={handleChange} /></td>
//                                             <td><input type="text" name="faname" value={formValues.faname} onChange={handleChange} /></td>
//                                             <td><input type="text" name="rno" value={formValues.rno} onChange={handleChange} /></td>
//                                             <td><input type="text" name="mno" value={formValues.mno} onChange={handleChange} /></td>
//                                             <td><input type="email" name="email" value={formValues.email} onChange={handleChange} /></td>
//                                             <td><input type="date" name="dob" value={formValues.dob} onChange={handleChange} /></td>
//                                             <td><input type="text" name="address" value={formValues.address} onChange={handleChange} /></td>
//                                             <td>
//                                                 <button type="button" onClick={handleSave}>Save</button>
//                                                 <button type="button" onClick={handleCancel}>Cancel</button>
//                                             </td>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <td>{student.finame}</td>
//                                             <td>{student.laname}</td>
//                                             <td>{student.faname}</td>
//                                             <td>{student.rno}</td>
//                                             <td>{student.mno}</td>
//                                             <td>{student.email}</td>
//                                             <td>{student.dob}</td>
//                                             <td>{student.address}</td>
//                                             <td>
//                                                 <button type="button" onClick={() => handleEdit(student)}>Edit</button>
//                                                 <button type="button" onClick={() => handleDelete(student.id)}>Delete</button>
//                                             </td>
//                                         </>
//                                     )}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No students found for Roll No: {rollNoFilter}</p>
//             )}
//         </div>
//     );
// };

// export default SingleStudent;
