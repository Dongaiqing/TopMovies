import React, { Component } from "react";
import { NoResultView as NoResult } from "./NoResultView.module.scss"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NoResultView extends Component {
    render() {
        return (
            <div className={NoResult}><FontAwesomeIcon icon="sad-tear" /><p>No results</p></div>
        )
    }
}

export default NoResultView;