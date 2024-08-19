import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function StudentMarks() {
  const [file, setFile] = useState(null);
  const [rollNo, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [data, setData] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(''); // For upload success/error message
  const [uploadError, setUploadError] = useState(false); // For tracking upload error

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage(''); // Clear any previous message
    setUploadError(false); // Reset error state
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      const rollNoIndex = 0;
      const nameIndex = 1;
      const batchIndex = 2;
      const branchIndex = 3;
      const sgpaIndex = worksheet[0].length - 2;
      const semIndex = worksheet[0].length - 1;

      const subjectCodes = worksheet[0].slice(4, sgpaIndex);

      const rows = worksheet.slice(1);

      const gradesData = rows.map((row) => {
        const rollNo = row[rollNoIndex];
        const sname = row[nameIndex];
        const batch = row[batchIndex];
        const branch = row[branchIndex];
        const sgpa = row[sgpaIndex];
        const semester = row[semIndex];
        const subjects = {};

        subjectCodes.forEach((subject, index) => {
          subjects[subject] = row[index + 4];
        });

        return { rollNo, sname, batch, branch, subjects, sgpa, semester };
      });

      // Send data to backend
      axios.post('https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/upload-grades', { gradesData })
        .then(response => {
          setUploadMessage('File uploaded successfully!'); // Set success message
          setUploadError(false); // Reset error state
          console.log('Grades uploaded:', response.data);
        })
        .catch(error => {
          setUploadMessage('Error uploading file. Please try again.'); // Set error message
          setUploadError(true); // Set error state
          console.error('Error uploading grades:', error);
        });
    };

    reader.readAsBinaryString(file);
  };

  // Handle search to fetch student details and grades
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/grades`, {
        params: { rollNo, semester }
      });
      setData(response.data);  // Assuming response data contains student details and subjects
    } catch (error) {
      console.error('Error fetching data');
    }
  };

  return (
    <div className="row">
      <div className='col-md-3'></div>
      <div className='col-md-6'>
        <h4 className='text-center'>Upload File</h4>
        <div className='d-flex gap-2'>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className='form-control' />
          <button onClick={handleUpload} className='btn btn-primary'>Upload</button>
        </div>
        {/* Display the upload message */}
        {uploadMessage && (
          <div className={`mt-3 ${uploadError ? 'text-danger' : 'text-success'}`}>
            {uploadMessage}
          </div>
        )}
      </div>
      <div className='col-md-3'></div>

      <div className="row my-5">
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <div className='d-flex gap-2'>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className='form-control'
              placeholder="Enter Roll No"
            />
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className='form-control'
              placeholder="Enter Semester"
            />
            <button onClick={handleSearch} className='btn btn-primary'>Search</button>
          </div>
        </div>
        <div className='col-md-3'></div>

        {data && (
          <div>
            <div className='table-responsive pt-5'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    {/* <th>Name</th> */}
                    <th>Semester</th>
                    <th>Branch</th>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.rollNo}>
                      <td>{item.rollNo}</td>
                      {/* <td>{item.sname}</td> */}
                      <td>{item.semester}</td>
                      <td>{item.branch}</td>
                      <td>{item.batch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className='text-center pt-4'>Grades</h4>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.flatMap((item) => (
                    Object.keys(item.subjects).map((subjectCode) => (
                      <tr key={`${item.rollNo}-${subjectCode}`}>
                        <td>{subjectCode}</td>
                        <td>{item.subjects[subjectCode]}</td>
                      </tr>
                    ))
                  ))}
                  {data.length > 0 && (
                    <tr>
                      <td><strong>SGPA</strong></td>
                      <td>{data[0].sgpa}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentMarks;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentMarks = () => {
//   const [data, setData] = useState([]);
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [rollNo, setRollNo] = useState('');
//   const [studentDetails, setStudentDetails] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/progress');
//         const filteredResponseData = response.data.map(({ _id, __v, ...rest }) => rest); // Exclude _id and __v fields
//         setData(filteredResponseData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setMessage('Error fetching data. Please try again.');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/upload-marks', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setMessage('File uploaded and data saved to database successfully.');
//       const response = await axios.get('https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/progress');
//       const filteredResponseData = response.data.map(({ _id, __v, ...rest }) => rest); // Exclude _id and __v fields
//       setData(filteredResponseData);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage('Error uploading file. Please try again.');
//     }
//   };

//   const handleRollNoChange = (e) => {
//     setRollNo(e.target.value);
//   };

//   const groupBySemester = (data) => {
//     return data.reduce((acc, row) => {
//       if (!acc[row.semester]) {
//         acc[row.semester] = [];
//       }
//       acc[row.semester].push(row);
//       return acc;
//     }, {});
//   };

//   // Compute filteredData only when rollNo or data changes
//   const filteredData = data.filter(item => item.rollNo === rollNo);

//   useEffect(() => {
//     if (filteredData.length > 0) {
//       const student = filteredData[0];
//       // Update studentDetails only if the relevant data has changed
//       setStudentDetails(prevDetails => {
//         if (
//           prevDetails?.name !== student.name ||
//           prevDetails?.rollNo !== student.rollNo ||
//           prevDetails?.batch !== student.batch ||
//           prevDetails?.branch !== student.branch
//         ) {
//           return {
//             name: student.name,
//             rollNo: student.rollNo,
//             batch: student.batch,
//             branch: student.branch,
//           };
//         }
//         return prevDetails;
//       });
//     } else {
//       setStudentDetails(null);
//     }
//   }, [filteredData]);

//   const groupedData = groupBySemester(filteredData);

//   return (
//     <div className="text-center mt-5">
//       <h4 className="mb-4">Upload Marks</h4>
//       <div className="row mb-3">
//         <div className='col-md-3'></div>
//         <div className='col-md-6'>
//           <div className="d-flex gap-2 mb-3">
//             <input
//               type="file"
//               className="form-control"
//               onChange={handleFileChange}
//             />
//             <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
//           </div>
//         </div>
//         <div className='col-md-3'></div>
//       </div>
//       {message && <p className="p-3 mb-2 bg-success text-white">{message}</p>}
//       <div className='row'>
//         <div className='col-md-3'></div>
//         <div className='col-md-6'>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={rollNo}
//               onChange={handleRollNoChange}
//               placeholder="Enter Roll No"
//               className="form-control"
//             />
//           </div>
//         </div>
//         <div className='col-md-3'> </div>
//       </div>

//       {studentDetails && (
//         <div>
//           <h4>Student Details</h4>
//           <div className="mb-4 d-flex justify-content-between pt-5">
//             <p><strong>Name:</strong> {studentDetails.name}</p>
//             <p><strong>Roll No:</strong> {studentDetails.rollNo}</p>
//             <p><strong>Batch:</strong> {studentDetails.batch}</p>
//             <p><strong>Branch:</strong> {studentDetails.branch}</p>
//           </div>
//         </div>
//       )}
//       <div>
//         {Object.keys(groupedData).map(semester => (
//           <div className="py-3" key={semester}>
//             <div className="table-responsive">
//               <table className="table table-striped w-100">
//                 <thead>
//                   <tr>
//                     <th>Sem</th>
//                     <th>20EE11001</th>
//                     <th>20MA11001</th>
//                     <th>20PH11003</th>
//                     <th>20ME11002</th>
//                     <th>20CS11001</th>
//                     <th>20CS11L01</th>
//                     <th>20EE11L01</th>
//                     <th>20ME11L01</th>
//                     <th>SGPA</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedData[semester].map((mark, index) => (
//                     <tr key={index}>
//                       <td>{semester}</td>
//                       <td>{mark.codeOne}</td>
//                       <td>{mark.codeTwo}</td>
//                       <td>{mark.codeThree}</td>
//                       <td>{mark.codeFour}</td>
//                       <td>{mark.codeFive}</td>
//                       <td>{mark.codeSix}</td>
//                       <td>{mark.codeSeven}</td>
//                       <td>{mark.codeEight}</td>
//                       <td>{mark.sgpa}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentMarks;
