import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeHolderImage from "../../Assets/mv_ph.png";
import { Search as SearchCss, SearchInput, SearchResult} from "./Search.module.scss";
import DropDownMovieView from "./DropDownMovieView/DropDownMovieView";
import NoResultView from "../Utils/NoResultView.jsx";

const WAIT_INTERVAL = 500;

class Search extends Component {
	constructor() {
		super();

		this.state = {
			value: "",
			movie: {},
			hasMovie: false
		};

		this.timeout = 0;
		this.baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=985fc26c8cc221e4e54bb0d5d2b6b119&language=en-US&page=1&include_adult=false&query=";
		this.poster_base = "https://image.tmdb.org/t/p/w500/";
		
		this.genreMap =  {
			28: "Action",
			12: "Adventure",
			16: "Animation",
			35: "Comedy",
			80: "Crime",
			99: "Documentary",
			18: "Drama",
			10751: "Family",
			14: "Fantasy",
			36: "History",
			27: "Horror",
			10402: "Music",
			9648: "Mystery",
			10749: "Romance",
			878: "Science Fiction",
			10770: "TV Movie",
			53: "Thriller",
			10752: "War",
			37: "Western"
		}

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
					const data = response.data;
					console.log(data);
					let modi = {};
					modi.attribute = [];
					
					for (let i = 0; i < data.results.length; ++i) {
						const mv = data.results[i];
						modi.attribute[i] = {
							title: mv.title,
							id: mv.id,
							lang: mv.original_language,
							poster_path: mv.poster_path ? `${this.poster_base}${mv.poster_path}` : placeHolderImage,
							rate: mv.vote_average,
							genres: mv.genre_ids.map((x) => this.genreMap[x]),
							overview: mv.overview,
							date: mv.release_date
						}
					}
					this.setState({
						movie: modi, 
						hasMovie: modi.attribute.length !== 0
					});
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			this.setState({
				movie: {}, 
				hasMovie: false
			});
		}
	}

	render() {
		return (
			<div className={SearchCss}>
				<input
					className={SearchInput}
					onChange={this.inputChangeHandler}
					placeholder="Enter Movie Name"
					value={this.state.value}
				/>
				<div className={SearchResult}>
					{this.state.hasMovie ? this.state.movie.attribute.map((obj, idx) => <DropDownMovieView key={idx} movie={obj}/>) : <NoResultView/>}
				</div>
			</div>
		);
	}
}

export default Search;
