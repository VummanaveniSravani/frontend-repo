import React, { useState } from 'react';
import axios from 'axios';

const WholeStudentProfile = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/student/${rollNo}`);
      setStudentData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching student data:', error.message);
      setError('Please enter the correct roll number');
    }
  };

  const groupBySemester = (marks) => {
    return marks.reduce((acc, mark) => {
      const { semester } = mark;
      if (!acc[semester]) {
        acc[semester] = {
          marks: [],
          sgpa: mark.sgpa,
          cgpa: mark.cgpa,
        };
      }
      acc[semester].marks.push(mark);
      return acc;
    }, {});
  };

  return (
    <div className='container-fluid'>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={fetchStudentData} className='btn btn-success ms-3'>Fetch Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {studentData && (
        <div className='py-5'>
          <h2>Student Profile</h2>
          <div className='d-flex justify-content-between gap-5 pt-5'>
            <h6>Name: {studentData.studentDetails.name}</h6>
            <h6>Father's Name: {studentData.studentDetails.fatherName}</h6>
            <h6>Roll Number: {studentData.studentDetails.rollNo}</h6>
            <h6>Batch: {studentData.studentDetails.batch}</h6>
            <h6>Branch: {studentData.studentDetails.branch}</h6>
            <h6>Gender: {studentData.studentDetails.gender}</h6>

          </div>
          <div className='d-flex justify-content-end gap-5 pt-2'>
            <h6>Mobile No: {studentData.studentDetails.mobileNumber}</h6>
              <h6>Parent Mb.No: {studentData.studentDetails.parentNumber}</h6>
              {/* <h6>Email Id: {studentData.studentDetails.email}</h6>
              <h6>DOB: {studentData.studentDetails.dateOfBirth}</h6>
              <h6>Address: {studentData.studentDetails.address}</h6> */}
            </div>
          <div className="table-grid pt-5">
            {Object.entries(groupBySemester(studentData.studentMarks)).map(([semester, { marks, sgpa, cgpa }]) => (
              <div key={semester} className='table-container'>
                <h4 className='text-center'>{semester}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject</th>
                      <th>Credits</th>
                      {/* <th>Internal Marks</th> */}
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, index) => (
                      <tr key={index}>
                        <td>{mark.subjectCode}</td>
                        <td>{mark.subject}</td>
                        <td>{mark.credits}</td>
                        {/* <td>{mark.internalMarks}</td> */}
                        <td>{mark.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='d-flex justufy-content-end gap-5 pt-1'>
                  <h6>SGPA: {sgpa}</h6>
                  <h6>CGPA: {cgpa}</h6>
                </div>
              </div>
            ))}
          </div>

          <h3 className='py-4'>Co-curricular Activities</h3>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Participation Date</th>
                  <th>Participated Year</th>
                  <th>Host By</th>
                </tr>
              </thead>
              <tbody>
                {studentData.activities.length > 0 ? (
                  studentData.activities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.aname}</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                      <td>{activity.year}</td>
                      <td>{activity.host}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No activities found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h3 className='py-4'>Extra-curricular Activities</h3>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Sports</th>
                  <th>Arts</th>
                  <th>Music</th>
                  <th>Academic Club</th>
                  <th>Participation Date</th>
                  <th>Participated Year</th>
                  <th>Host By</th>
                </tr>
              </thead>
              <tbody>
                {studentData.eactivities.length > 0 ? (
                  studentData.eactivities.map((eactivity, index) => (
                    <tr key={index}>
                      <td>{eactivity.pname}</td>
                      <td>{eactivity.aname}</td>
                      <td>{eactivity.mname}</td>
                      <td>{eactivity.acname}</td>
                      <td>{new Date(eactivity.date).toLocaleDateString()}</td>
                      <td>{eactivity.year}</td>
                      <td>{eactivity.host}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No activities found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholeStudentProfile;
