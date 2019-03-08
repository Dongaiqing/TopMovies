import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from '../Home/Home.jsx';
import Search from '../Search/Search.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/search" component={Search}/>
          {/* <Route exact path="/gallery" component={Gallery}/> */}
          {/*
            Add routes for new pages here!
            Here's an example. To view this route, just go to http://localhost:3000/example
          */}
          {/* <Route exact path="/example" component={Example}/>
          <Route exact path="/pokemon" component={Pokemon}/> */}
        </Switch>
      </Router>
    );
  }
}
library.add(faSadTear);
export default App;
