import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import PropTypes from "prop-types";
import placeHolderImage from "../../../Assets/mv_ph.png";
import { Link } from "react-router-dom";

// Include your new Components here

import {
	DropDownMovieView as ViewCss,
	DropDownMovieViewImage as ViewImage,
	DropDownMovieViewDesc as ViewDesc,
	DropDownMovieViewDescTitle as DescTitle,
	DropDownMovieViewDescContent as DescContent,
	DropDownMovieViewDescMisc as DescMisc,
	DropDownMovieViewDescMiscRate as Rate,
	DropDownMovieViewDescMiscRateGood as RateGood,
	DropDownMovieViewDescMiscRateMediocre as RateMediocre,
	DropDownMovieViewDescMiscRateBad as RateBad,
	DropDownMovieViewDescMiscTagContainer as TagContainer,
	Tag
} from "./DropDownMovieView.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DropDownMovieView extends Component {
	constructor() {
		super();
		this.poster_base = "https://image.tmdb.org/t/p/w500/";
	}

	getRatingClass() {
		if (!this.props.movie.rate) return `${Rate}`;

		let rate = parseFloat(this.props.movie.rate) * 10;
		if (rate >= 70) return `${Rate} ${RateGood}`;
		else if (rate >= 45) return `${Rate} ${RateMediocre}`;
		else return `${Rate} ${RateBad}`;
	}

	render() {
		return (
			<div>
				<div className={ViewCss}>
					<div className={ViewImage}>
						<img
							src={
								this.props.movie.poster_path !== null
									? `${this.poster_base}${this.props.movie.poster_path}`
									: placeHolderImage
							}
						/>
					</div>
					<div className={ViewDesc}>
						<Link
							to={{ pathname: "/detail", state: { id: this.props.movie.id } }}
						>
							<div className={DescTitle}>
								<h1>{this.props.movie.title}</h1>
							</div>
						</Link>
						<div className={DescMisc}>
							<div className={this.getRatingClass()}>
								<FontAwesomeIcon icon="star" />
								<p>
									{this.props.movie.rate ? this.props.movie.rate : "No Ratings"}
								</p>
							</div>
							<div className={TagContainer}>
								{this.props.movie.genres.map((obj, idx) => (
									<div className={Tag} key={idx}>
										<p>{obj}</p>
									</div>
								))}
							</div>
							<p>{this.props.movie.date}</p>
						</div>
						<div className={DescContent}>
							<p>{this.props.movie.overview}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DropDownMovieView.propTypes = {
	title: PropTypes.string,
	id: PropTypes.number,
	lang: PropTypes.string,
	poster_path: PropTypes.string,
	rate: PropTypes.string,
	genres: PropTypes.arrayOf(PropTypes.string),
	overview: PropTypes.string,
	date: PropTypes.string
};

export default DropDownMovieView;
