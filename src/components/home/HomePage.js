import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">React, Redux and React Router for ultra-responsive web page.</p>
      <hr className="my-4"></hr>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <Link to={'about'} className='btn btn-primary btn-lg'> Learn more</Link>
    </div>
  );
}

export default HomePage;