import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import YourComponent from './YourComponent'; // Change this to your actual component

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={YourComponent} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
