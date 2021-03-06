import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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


class DropDownMovieView extends Component {

	getRatingClass() {
		if (!this.props.movie.rate) return `${Rate}`;

		let rate = parseFloat(this.props.movie.rate) * 10;
		if (rate >= 70) return `${Rate} ${RateGood}`;
		else if (rate >= 45) return `${Rate} ${RateMediocre}`;
		else return `${Rate} ${RateBad}`;
	}

	render() {
		const imageStyle = {
			backgroundImage: `url(${this.props.movie.poster_path})`
		}
		return (
			<div>
				<Link to={{ pathname: `${process.env.PUBLIC_URL}/detail`, state: { ids: this.props.ids, id: this.props.movie.id } }}>
				<div className={ViewCss}>
					<div className={ViewImage} style={imageStyle}></div>
					<div className={ViewDesc}>
				
							<div className={DescTitle}>
								<h1>{this.props.movie.title}</h1>
							</div>
		
						<div className={DescMisc}>
							<div className={this.getRatingClass()}>
								<FontAwesomeIcon icon="star" />
								<p>
									{this.props.movie.rate ? this.props.movie.rate : "N/A"}
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
				</Link>
			</div>
		);
	}
}

DropDownMovieView.propTypes = {
	title: PropTypes.string,
	id: PropTypes.number,
	lang: PropTypes.string,
	poster_path: PropTypes.string,
	rate: PropTypes.number,
	genres: PropTypes.arrayOf(PropTypes.string),
	ids: PropTypes.arrayOf(PropTypes.number),
	overview: PropTypes.string,
	date: PropTypes.string
};

export default DropDownMovieView;
