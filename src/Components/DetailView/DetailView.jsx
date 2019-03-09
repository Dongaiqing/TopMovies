import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import placeHolderImage from "../../Assets/mv_ph_big.jpg";
import { Link } from 'react-router-dom'
import axios from "axios";

import {
	DetailView as DetailCss,
	DetailViewHeader as Header,
	DetailViewHeaderButtonWrapper as ButtonWrapper,
	DetailViewContentWrapper as ContentWrapper,
	DetailViewContentWrapperMiscWrapper as MiscWrapper,
	DetailViewContentWrapperOverview as Overview
} from "./DetailView.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class DetailView extends Component {
	constructor(props) {
		super(props);
		this.imgBase = "https://image.tmdb.org/t/p/w500/";
		this.baseUrl = "https://api.themoviedb.org/3/movie/";
		this.apiKey = "985fc26c8cc221e4e54bb0d5d2b6b119";

		this.state = {
			id: props.location.state,
			movie: {},
			hasMovie: false
		};

		this.getMovieData(this.state.id);
	}

	getMovieData(id) {
		if (id) {
			let url = `${this.baseUrl}${id.id}?api_key=${this.apiKey}&language=en-US`;

			axios
				.get(url)
				.then(response => {
					const data = response.data;
					let modi = {
						title: data.title,
						imdb: `https://www.imdb.com/title/${data.imdb_id}`,
						lang: data.original_language,
						img_path: data.backdrop_path,
						rate: data.vote_average,
						votes: data.vote_count,
						genres: data.genres.map((x) => x.name),
						overview: data.overview,
						date: data.release_date,
						production: data.production_companies.map((x) => x.name),
						runtime: this.getRunTimeString(data.runtime),
						budget: this.getRevenueString(data.budget), 
						revenue: this.getRevenueString(data.revenue),
						website: data.homepage
					};
					this.setState({
						movie: modi, 
						hasMovie: modi.length !== 0
					});
					console.log(data);
					console.log(this.state.movie);
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

	// getRatingClass() {
	// 	if (!this.props.movie.rate)
	// 		return `${Rate}`;

	// 	let rate = parseFloat(this.props.movie.rate) * 10;
	// 	if (rate >= 70)
	// 		return `${Rate} ${RateGood}`
	// 	else if (rate >= 45)
	// 		return `${Rate} ${RateMediocre}`
	// 	else
	// 		return `${Rate} ${RateBad}`
	// }

	getRunTimeString(minute) {
		const h = Math.floor(minute / 60);
		const m = minute % 60;
		return `${h} HR ${m} MIN`
	}

	getRevenueString(revenue) {
		return `$${Math.floor(revenue / 1000000)}M`
	}

	render() {
		if (!this.state.id) {
			return (
				<div>invalid parameter</div>
			);
		} else {
			const imgPath = this.state.movie.img_path ? `${this.imgBase}${this.state.movie.img_path}` : placeHolderImage;
			
			const headerStyle = {
				backgroundImage: `url(${imgPath})`
			};
			const imdbStyle = {backgroundColor: '#f3ce13', color: 'black'};
			const websiteStyle = {backgroundColor: '$main-red'};
			return (
				<div className={DetailCss}>
					<div className={Header} style={headerStyle}>
						<h1>{this.state.movie.title}</h1>
						<div className={ButtonWrapper}>
							{this.state.movie.website ? <a href={this.state.movie.website} target="_blank" style={websiteStyle}>Website</a> : []}
							{this.state.movie.imdb ? <a href={this.state.movie.imdb} target="_blank" style={imdbStyle}>IMDB</a> : []}
						</div>
					</div>
					<div className={ContentWrapper}>
						<div className={MiscWrapper}></div>
						<div className={Overview}>
							<p>{this.state.movie.overview}</p>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default DetailView;
