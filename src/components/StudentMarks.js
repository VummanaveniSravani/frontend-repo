import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function StudentMarks() {
  const [file, setFile] = useState(null);
  const [rollNo, setRollNo] = useState('');
  const [data, setData] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      axios.post('http://localhost:4000/upload-grades', { gradesData })
        .then(response => {
          console.log('Grades uploaded:', response.data);
          alert('File successfully uploaded!');
        })
        .catch(error => {
          console.error('Error uploading grades:', error);
          alert('Failed to upload file. Please try again.');
        });
    };

    reader.readAsBinaryString(file);
  };

  // Handle search to fetch student details and grades
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/grades`, {
        params: { rollNo } 
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
            <button onClick={handleSearch} className='btn btn-primary'>Search</button>
          </div>
        </div>
        <div className='col-md-3'></div>

        {data && data.length > 0 && (
          <div>
            <div className='table-responsive pt-5'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    {/* <th>Name</th> */}
                    <th>Branch</th>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data[0].rollNo}</td>
                    {/* <td>{data[0].sname}</td> */}
                    <td>{data[0].branch}</td>
                    <td>{data[0].batch}</td>
                  </tr>
                </tbody>
              </table>
              <div className="table-grid pt-5">
              {data.map((semesterData, index) => (
                <div key={index} className='table-container'>
                  <h4 className='text-center pt-4'>Semester: {semesterData.semester}</h4>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(semesterData.subjects).map((subjectCode) => (
                        <tr key={`${semesterData.rollNo}-${subjectCode}`}>
                          <td>{subjectCode}</td>
                          <td>{semesterData.subjects[subjectCode]}</td>
                        </tr>
                      ))}
                      <tr>
                        <td><strong>SGPA</strong></td>
                        <td>{semesterData.sgpa}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentMarks;
