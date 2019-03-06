import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// 'Home' is already defined as the class name, so provide an alias
// 'Home-header' from the SCSS file gets transformed to 'HomeHeader'
//    because '-' is not allowed in JS variable names
import { Home as HomeCss, HomeContents, HomeButton, HomeGradient, HomeHeader} from './Home.module.scss'

class Home extends Component {
  render() {
    return (
      <div className={HomeCss}>
        <div className={HomeContents}>
          <div className={HomeHeader}>
          <p>Welcome to</p>
          <h1>Movie Gallery</h1>
          </div>

          <Link to="/movies">
            <div className={HomeButton}>
              Explore
            </div>
          </Link>
        </div>
        <div className={HomeGradient}></div>
      </div>
    )
  }

}

export default Home
