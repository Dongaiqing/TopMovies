import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// 'Home' is already defined as the class name, so provide an alias
// 'Home-header' from the SCSS file gets transformed to 'HomeHeader'
//    because '-' is not allowed in JS variable names
import { Home as HomeCss, HomeContents, HomeButton, HomeGradient, 
        HomeHeader, ButtonWrapper } from './Home.module.scss'

class Home extends Component {
  constructor() {
    super();
    this.title = "Top Movies";
  }

  render() {
    return (
      <div className={HomeCss}>
        <div className={HomeContents}>
          <div className={HomeHeader}>
          <p>Welcome to</p>
          <h1>{this.title}</h1>
          </div>

          <div className={ButtonWrapper}>
            <Link to={`${process.env.PUBLIC_URL}/search`}>
              <div className={HomeButton}>
                Search
              </div>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/gallery`}>
              <div className={HomeButton}>
                Explore
              </div>
            </Link>
          </div>
        </div>
        <div className={HomeGradient}></div>
      </div>
    )
  }
}

export default Home
