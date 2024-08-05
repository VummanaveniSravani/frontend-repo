import React, { useState, useEffect }from 'react';
import axios from 'axios';
import DisplayMarks from './DisplayMarks';
import FilterUploadedMarks from './FilterUploadedMarks';
const FilterStudentMarks = () => {
    const [searchRollNo, setSearchRollNo] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);

    const handleSearch = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/marks/${searchRollNo}`);
          if (data.length > 0) {
            const details = {
              ...data[0],
              marks: data,
            };
            setSearchedStudent(details);
          } else {
            setSearchedStudent(null);
          }
        } catch (err) {
          console.error('Error searching marks:', err);
        }
      };
    return (
        <div className='container'>
            <div className='row pt-5'>
            <div className="col-md-3 mb-3"></div>

                <div className="col-md-4 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Search by Roll No'
                        value={searchRollNo}
                        onChange={(e) => setSearchRollNo(e.target.value)}
                    />
                </div>
                <div className="col-md-2 mb-3">
                    <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                </div>
                <div className="col-md-3 mb-3"></div>

            </div>

            {searchedStudent && <DisplayMarks studentDetails={searchedStudent} />}
            
            {/* <FilterUploadedMarks/> */}

        </div>
    );
}

export default FilterStudentMarks;