import React from 'react';

const Header = () => {
   
  
    return (
        <div>
                   <div className="alert alert-success text-center" role="alert">
                    <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center justify-content-between'>
                    <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='admin' className='img-width'/>
                    {/* <h5>{userName}</h5> */}
                    </div>
                    <h5>Welcome HOD!</h5>
                    <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>
                    </div>
                   
                </div> 
        </div>
    );
}

export default Header;