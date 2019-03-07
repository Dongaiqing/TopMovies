import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from 'semantic-ui-react'
import axios from "axios";
import { Search as SearchCss, SearchInput } from "./Search.module.scss";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class Search extends Component {
	constructor() {
		super();

		this.state = {
			value: "",
			movie: {}
		};
		this.timeout = 0;
		this.baseUrl =
			"https://api.themoviedb.org/3/search/movie?api_key=985fc26c8cc221e4e54bb0d5d2b6b119&language=en-US&page=1&include_adult=false&query=";
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		// this.clickHandler = this.clickHandler.bind(this);
	}

	inputChangeHandler(e) {
		let query = e.target.value;
		if (this.timeout) clearTimeout(this.timeout);

		this.setState({
			value: query
		});

		this.timeout = setTimeout(() => {
			this.onChange(query);
		}, WAIT_INTERVAL);
	}

	onChange(query) {
		if (query) {
			let url = `${this.baseUrl}${query}`;

			// GET some data back!
			axios
				.get(url)
				.then(response => {
					this.setState({
						movie: response.data
					});

					console.log(this.state.movie);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<div className={SearchCss}>
        <input
          className={SearchInput}
          // icon='ticket alternate'
          // iconPosition='left'
					onChange={this.inputChangeHandler}
					placeholder="Enter Movie Name"
					value={this.state.value}
				/>
			</div>
		);
	}
}

export default Search;
