import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from '../Home/Home.jsx';
import Search from '../Search/Search.jsx'
// import Gallery from '../Gallery/Gallery.jsx';
// import Pokemon from '../Pokemon/Pokemon.jsx';

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

export default App;
