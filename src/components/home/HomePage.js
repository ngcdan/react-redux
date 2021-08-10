import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    < div className='jumbotron' >
      <h1>React Training</h1>
      <p>React, Redux and React Router for ultra-responsive web page!</p>
      <Link to={'/about'} className='btn btn-primary btn-lg'> Learn more</Link>
    </div >
  )
}

export default HomePage;