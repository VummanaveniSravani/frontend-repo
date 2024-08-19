import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

ChartJS.register(ArcElement, Tooltip, Legend);
const WholeStudentProfile = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/student/${rollNo}`);
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

  // Function to assign text color based on grade
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
      case 'B+':
        return 'green'; // Green for A+, A, B+
      case 'B':
      case 'C':
        return 'orange'; // Orange for B, C
      case 'F':
        return 'red'; // Red for F
      case 'O':
        return 'yellow'; // Yellow for O
      default:
        return 'black'; // Default color
    }
  };

// Function to prepare data for the SGPA pie chart
const getSGPAPieChartData = (sgpa) => {
  const achievedSGPA = sgpa; // SGPA achieved by the student
  const remainingSGPA = 10 - sgpa; // Remaining SGPA to make it out of 10

  // Determine the color based on the SGPA
  const achievedColor = sgpa <= 5 ? '#FF0000' : '#22bb33'; // Red for SGPA <= 5, green for SGPA > 5
  const remainingColor = '#FFCE56'; // Yellow for the remaining SGPA

  return {
    labels: ['Achieved SGPA', 'Remaining SGPA'],
    datasets: [
      {
        label: 'SGPA',
        data: [achievedSGPA, remainingSGPA],
        backgroundColor: [achievedColor, remainingColor], // Dynamic colors based on SGPA
      },
    ],
  };
};
// Chart options to display SGPA inside the pie chart
const chartOptions = {
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
    datalabels: {
      color: 'black', // Set the color of the text inside the chart
      display: true, // Ensure the label is always displayed
      formatter: (value, context) => {
        if (context.dataIndex === 0) {
          return `${context.chart.data.datasets[0].data[0]} SGPA`; // Show SGPA value
        }
        return '';
      },
      font: {
        size: 18, // Set the font size of the text inside the chart
        weight: 'bold',
      },
      anchor: 'center', // Position the label in the center
      align: 'center',  // Align the label in the middle of the pie chart
    },
    tooltip: {
      enabled: false, // Disable tooltips if not needed
    },
  },
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
                <div className='d-flex justify-content-end gap-5 pt-1'>
                  <h6>SGPA: {sgpa}</h6>
                  <h6>CGPA: {cgpa}</h6>
                </div>
                {/* Pie Chart for SGPA */}
                {/* <h5 className='text-center mt-4'>SGPA Distribution (Semester {semester})</h5> */}
                {/* <Pie data={getSGPAPieChartData(sgpa)} className='w-50 h-25' /> */}
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
