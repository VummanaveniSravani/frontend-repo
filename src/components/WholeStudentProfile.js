import React, { useState } from 'react';
import axios from 'axios';

const WholeStudentProfile = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch student data from backend
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
    <div className=''>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={fetchStudentData} className='btn btn-success ms-3'>Fetch Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {studentData && (
        <div className='py-3'>
          <h4>Student Profile</h4>
          <div className='table-responsive pt-2'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Roll No</th>
                  <th>Batch</th>
                  <th>Branch</th>
                  <th>Gender</th>
                  <th>Mobile No</th>
                  <th>Parent Mobile No</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{studentData.studentDetails.name}</td>
                  <td>{studentData.studentDetails.fatherName}</td>
                  <td>{studentData.studentDetails.rollNo}</td>
                  <td>{studentData.studentDetails.batch}</td>
                  <td>{studentData.studentDetails.branch}</td>
                  <td>{studentData.studentDetails.gender}</td>
                  <td>{studentData.studentDetails.mobileNumber}</td>
                  <td>{studentData.studentDetails.parentNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        
          {/* Render Student Marks */}
          <div className="table-grid pt-5">
            {Object.entries(groupBySemester(studentData.studentMarks)).map(([semester, { marks, sgpa, cgpa }]) => (
              <div key={semester} className='table-container'>
                <h4 className='text-center'>{semester}</h4>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, index) => (
                      // Iterate through the subjects Map
                      Object.entries(mark.subjects).map(([subjectCode, grade]) => (
                        <tr key={subjectCode}>
                          <td>{subjectCode}</td>
                          <td>{grade}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
                <div className=''>
                  <h6>SGPA: {sgpa}</h6>
                  {/* <h6>CGPA: {cgpa}</h6> */}
                </div>
              </div>
            ))}
          </div>

          {/* Render Co-curricular and Extra-curricular activities */}
          <h3 className='py-4'>Co-curricular Activities</h3>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Participation Date</th>
                  <th>Participated Year</th>
                  <th>Hosted By</th>
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
                  <th>Hosted By</th>
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
                    <td colSpan="7">No activities found</td>
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
