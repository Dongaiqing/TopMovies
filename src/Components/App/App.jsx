import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from '../Home/Home.jsx';
import Search from '../Search/Search.jsx';
import DetailView from '../DetailView/DetailView.jsx';
import GalleryView from '../GalleryView/GalleryView.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';


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

library.add(faSadTear);
library.add(faStar);
library.add(faClock);
library.add(faDollarSign);
library.add(faGlobe);
library.add(faTag);
library.add(faFilm);

export default App;
