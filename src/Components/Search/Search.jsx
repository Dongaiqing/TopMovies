import React, { Component } from "react";
import axios from "axios";
import placeHolderImage from "../../Assets/mv_ph.png";
import DropDownMovieView from "./DropDownMovieView/DropDownMovieView";
import NoResultView from "../Utils/NoResultView.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "semantic-ui-css/semantic.min.css";

import { Search as SearchCss, 
	SearchInput, 
	SearchResult,
	SearchFilterDropDown as DropDownFilter,
	SearchFilterDropDownButton as FilterButton,
	SearchFilterDropDownContent as FilterContent
} from "./Search.module.scss";

const WAIT_INTERVAL = 500;

class Search extends Component {
	constructor() {
		super();

		this.state = {
			value: "",
			movie: {},
			sortFilter: null,
			hasMovie: false
		};

		this.ids = [];
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

		this.filters = [
			"▲ Average Voting",
			"▼ Average Voting",
			"▲ Release Date",
			"▼ Release Date"
		]

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
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
					let modi = {};
					modi.attribute = [];
					this.ids = [];

					for (let i = 0; i < data.results.length; ++i) {
						const mv = data.results[i];
						this.ids.push(mv.id);

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
				hasMovie: false,
				sortFilter: null
			});
		}
	}

	onSortSelected(x) {
		if (!this.state.movie.attribute || this.state.movie.attribute.length <= 1)
			return;
		
		let new_movie = {};
		let cur_movie = this.state.movie.attribute;

		switch (x) {
			case "▲ Average Voting":
				cur_movie.sort((m1, m2) => {
					if (!m1.rate)
						return -1;
					else if (!m2.rate)
						return 1;
					else 
						return m1.rate * 10 - m2.rate * 10;
				});
				break;
			case "▼ Average Voting":
				cur_movie.sort((m1, m2) => {
					if (!m1.rate)
						return 1;
					else if (!m2.rate)
						return -1;
					else 
						return m2.rate - m1.rate;
				});
				break;
			case "▲ Release Date":
				cur_movie.sort((m1, m2) => {
					if (!m1.date)
						return -1;
					else if (!m2.date)
						return 1;
					else {
						const d1 = Date.parse(m1.date);
						const d2 = Date.parse(m2.date);
						return d1 - d2;
					}
				});
				break;
			case "▼ Release Date":
				cur_movie.sort((m1, m2) => {
					if (!m1.date)
						return 1;
					else if (!m2.date)
						return -1;
					else {
						const d1 = Date.parse(m1.date);
						const d2 = Date.parse(m2.date);
						return d2 - d1;
					}
				});
				break;
			default: 
				break;
		}

		new_movie.attribute = cur_movie;
		this.ids = cur_movie.map((x) => x.id);
		this.setState({
			sortFilter: x,
			movie: new_movie
		});
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
				<div className={DropDownFilter}>
                        <div className={FilterButton}>
                            <FontAwesomeIcon icon="sort-amount-down"/>
                            <p>Sort By</p>
                        </div>
                        <div className={FilterContent}>
                            {this.filters.map((x, idx) => <div key={idx} onClick={() => this.onSortSelected(x)}>{x}</div>)}
                        </div>
                </div>
				<div className={SearchResult}>
					{this.state.hasMovie ? this.state.movie.attribute.map((obj, idx) => <DropDownMovieView key={idx} movie={obj} ids={this.ids}/>) : <NoResultView/>}
				</div>
			</div>
		);
	}
}

export default Search;
