import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './home/HomePage';


const App = () => {
  return (
    <div className='container-fluid'>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
      </Switch>
    </div>
  )
}

export default App;