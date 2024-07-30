import React, { useState } from 'react';

const DisplayMarksTwo = ({ studentDetails }) => {
    const [marks, setMarks] = useState(studentDetails.marks || []);

  const groupMarksBySemester = (marks) => {
    return marks.reduce((acc, mark) => {
      if (!acc[mark.semester]) {
        acc[mark.semester] = [];
      }
      acc[mark.semester].push(mark);
      return acc;
    }, {});
  };

//   const handleEditClick = (mark) => {
//     setIsEditing(mark.code);
//     setCurrentMark(mark);
//   };

//   const handleDeleteClick = (mark) => {
//     setMarks(marks.filter((m) => m !== mark));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentMark((prevMark) => ({
//       ...prevMark,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     setMarks(marks.map((m) => (m.code === currentMark.code ? currentMark : m)));
//     setIsEditing(null);
//     setCurrentMark(null);
//   };

  const renderMarksTable = (semester, marks) => {
    return (
      <div key={semester} className='mb-4'>
        <h4>{semester}</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject</th>
              <th>Credits</th>
              <th>Internal Marks</th>
              <th>Grade</th>
             
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, index) => (
              <tr key={index}>
               
                  <>
                    <td>{mark.code}</td>
                    <td>{mark.subject}</td>
                    <td>{mark.externalMarks}</td>
                    <td>{mark.internalMarks}</td>
                    <td>{mark.grade}</td>
              
                  </>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const groupedMarks = groupMarksBySemester(marks);
  const columns = Object.keys(groupedMarks);

  return (
    <div className='container py-5'>
      <h3>Student Marks</h3>
      <div className='d-flex gap-5 align-items-center justify-content-between border-bottom pt-5'>
        <h6>Name: {studentDetails.name}</h6>
        <h6>Roll No: {studentDetails.rollNo}</h6>
        <h6>Batch: {studentDetails.batch}</h6>
        <h6>Branch: {studentDetails.branch}</h6>
      </div>
      <div className='row py-5'>
        {columns.map((semester, index) => (
          <div key={index} className='col-md-12'>
            {renderMarksTable(semester, groupedMarks[semester])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMarksTwo;
