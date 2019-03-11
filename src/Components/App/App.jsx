import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from '../Home/Home.jsx';
import Search from '../Search/Search.jsx';
import DetailView from '../DetailView/DetailView.jsx';
import GalleryView from '../GalleryView/GalleryView.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSadTear, faStar, faClock, faDollarSign, faGlobe, faTag, faFilm, 
          faSortAmountDown, faFilter, faArrowUp, faArrowDown, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons'

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/detail" component={DetailView}/>
          <Route exact path="/gallery" component={GalleryView}/>
        </Switch>
      </Router>
    );
  }
}

const fonts = [faSadTear, faStar, faClock, faDollarSign, faGlobe, 
                faTag, faFilm, faSortAmountDown, faFilter, faArrowUp, 
                faArrowDown, faCheckSquare, faSquare];
library.add(fonts);

export default App;
