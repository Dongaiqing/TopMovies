import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import placeHolderImage from "../../Assets/mv_ph_big.jpg";
import axios from "axios";

import {
	DetailView as DetailCss,
	DetailViewHeader as Header,
	DetailViewHeaderButtonWrapper as ButtonWrapper,
	DetailViewHeaderTitleWrapper as TitleWrapper,
	DetailViewContentWrapper as ContentWrapper,
	DetailViewContentWrapperMiscWrapper as MiscWrapper,
	DetailViewContentWrapperMiscWrapperComponent as ComponentWrapper,
	DetailViewContentWrapperMiscWrapperComponentFontAwesome as fontAwesomeWrapper,
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
						orig_title: data.original_title,
						imdb: `https://www.imdb.com/title/${data.imdb_id}`,
						lang: data.original_language.toUpperCase(),
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
						website: data.homepage,
						tagline: data.tagline
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

	getRatingColor() {
		const badColor = "rgb(167, 71, 71)";
		const medColor = "rgb(176, 158, 87)";
		const goodColor = "rgb(88, 140, 83)";
		const noColor = "rgb(92, 92, 92)";

		if (!this.state.movie.rate)
			return noColor;

		let rate = parseFloat(this.state.movie.rate) * 10;
		if (rate >= 70)
			return goodColor;
		else if (rate >= 45)
			return medColor;
		else
			return badColor;
	}

	getRunTimeString(minute) {
		const h = Math.floor(minute / 60);
		const m = minute % 60;
		return h === 0 ? `${m} MIN` : `${h} HR ${m} MIN`;
	}

	getRevenueString(revenue) {
		if (revenue === 0)
			return 0;
		const intVal = Math.floor(revenue / 1000000);
		return intVal === 0 ? `$${(revenue / 1000000).toFixed(2)}M` : `$${intVal}M`
	}

	render() {
		if (!this.state.id) {
			return (
				<div>invalid parameter</div>
			);
		} else {
			const movie = this.state.movie;

			const imgPath = movie.img_path ? `${this.imgBase}${movie.img_path}` : placeHolderImage;

			const headerStyle = {
				backgroundImage: `url(${imgPath})`
			};
			const imdbStyle = {backgroundColor: '#f3ce13', color: 'black'};
			const websiteStyle = {backgroundColor: '$main-red'};
			const rateWrapper = {
				display: "flex",
				flexDirection: "column",
				justifyContent: "center"
			}
			const rateStyle = {
				color: "white",
				width: "100%",
				margin: 0
			}
			const voteStyle = {
				margin: 0,
				color: "#c6c6c6",
				width: "100%",
				fontStyle: "italic"
			}
			const taglineStyle = {
				padding: "30px 80px", 
				width: "100%", 
				margin: 0, 
				color: "white", 
				fontSize: "40px", 
				textAlign: "left"
			}

			return (
				<div className={DetailCss}>
					<div className={Header} style={headerStyle}>
						<div className={TitleWrapper}>
							<h1>{movie.title === movie.orig_title ? movie.title : `${movie.title} (${movie.orig_title})`}</h1>
							<p>{movie.date}</p>
						</div>
						<div className={ButtonWrapper}>
							{movie.website ? <a href={movie.website} target="_blank" rel="noopener noreferrer" style={websiteStyle}>Website</a> : []}
							{movie.imdb ? <a href={movie.imdb} target="_blank" rel="noopener noreferrer" style={imdbStyle}>IMDB</a> : []}
						</div>
					</div>
					<h1 style={taglineStyle}>{movie.tagline}</h1>
					<div className={ContentWrapper}>
						<div className={MiscWrapper}>
							{/* Rating */}
							{movie.rate ? 
							<div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="star" style={{color: this.getRatingColor()}} size="2x"/>
								</div>
								<div style={rateWrapper}>
									<p style={rateStyle}>{movie.rate} / 10</p>
									<p style={voteStyle}>{movie.votes} votes</p>
								</div>
							</div> : []}
							
							{/* Runtime */}
							<div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="clock" size="2x" />
								</div>
								<p>{movie.runtime}</p>
							</div>

							{/* Budget */}
							{movie.budget !== 0 ?
							<div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="dollar-sign" size="2x"/>	
								</div>
								<p>{movie.budget} / {movie.revenue}</p>
							</div> : []}

							{/* Language */}
							{movie.lang ? 
							<div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="globe" size="2x"/>	
								</div>
								<p>{movie.lang}</p>
							</div> : []}

							{/* Tags */}
							{movie.genres && movie.genres.length ? <div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="tag" size="2x"/>	
								</div>
								<p>{movie.genres.join(" | ")}</p>
							</div> : []}

							{/* Productions */}
							{movie.production && movie.production.length ? <div className={ComponentWrapper}>
								<div className={fontAwesomeWrapper}>
									<FontAwesomeIcon icon="film" size="2x"/>	
								</div>
								<p>{movie.production.join(" | ")}</p>
							</div> : []}
						</div>
						<div className={Overview}>
							<p>{movie.overview}</p>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default DetailView;
