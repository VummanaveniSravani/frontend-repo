// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RetriveMarks = () => {
//   const [data, setData] = useState([]);
//   const [rollNo, setRollNo] = useState('');
//   const [semester, setSemester] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/progress');
//         setData(response.data);
//         setFilteredData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Error fetching data. Please try again.');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilter = () => {
//     const filtered = data.filter(student => student.rollNo === rollNo && student.semester === semester);
//     setFilteredData(filtered);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Retrieve Marks</h2>
//       <div className="d-flex gap-2 mb-3">
//         <input
//           type="text"
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           placeholder="Enter Roll No"
//           className="form-control mb-2"
//         />
//         <input
//           type="text"
//           value={semester}
//           onChange={(e) => setSemester(e.target.value)}
//           placeholder="Enter Semester"
//           className="form-control mb-2"
//         />
//         <button onClick={handleFilter} className="btn btn-primary">Filter</button>
//       </div>
//       {filteredData.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-striped w-100">
//             <thead>
//               <tr>
//                 {Object.keys(filteredData[0]).map((key) => (
//                   <th key={key}>{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((val, idx) => (
//                     <td key={idx}>{val}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No data found for the given Roll No and Semester.</p>
//       )}
//     </div>
//   );
// };

// export default RetriveMarks;
