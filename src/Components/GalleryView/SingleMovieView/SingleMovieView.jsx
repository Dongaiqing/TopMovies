import React, { Component } from "react";
import PropTypes from "prop-types";
import placeHolderImage from "../../../Assets/mv_ph.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    SingleMovieView as ViewCss,
    SingleMovieViewPosterHolder as PosterHolder,
    SingleMovieViewPropertyHolder as Properties,
    SingleMovieViewPropertyHolderMovieTitle as MovieTitle,
    SingleMovieViewPropertyHolderMovieDate as MovieDate,
    SingleMovieViewPropertyHolderMovieMisc as MovieMisc,
    SingleMovieViewPropertyHolderMovieMiscRate as Rate,
    SingleMovieViewPropertyHolderMovieMiscRateGood as RateGood,
	SingleMovieViewPropertyHolderMovieMiscRateMed as RateMediocre,
    SingleMovieViewPropertyHolderMovieMiscRateBad as RateBad,
    SingleMovieViewPropertyHolderMovieMiscTag as Tags
} from "./SingleMovieView.module.scss";


class SingleMovieView extends Component {
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
        const posterStyle = {
            backgroundImage: `url(${this.props.movie.poster_path})`
        }
		return (
			<div className={ViewCss}>
                <Link to={{ pathname: "/detail", state: { id: this.props.movie.id, ids: this.props.ids } }}>
                    <div className={PosterHolder} style={posterStyle}></div>
				</Link>
                <div className={Properties}>
                    <div className={MovieTitle}>
                        <p>{this.props.movie.title}</p>
                    </div>
                    <div className={MovieDate}>
                        <p>{this.props.movie.date}</p>
                    </div>
                    <div className={MovieMisc}>
                        <div className={this.getRatingClass()}>
							<FontAwesomeIcon icon="star" />
                            <p>{this.props.movie.rate ? this.props.movie.rate : "N/A"}</p>
						</div>
                        <div className={Tags}>
                        {this.props.movie.genres && this.props.movie.genres.length !== 0 ? this.props.movie.genres.join(" | "): []}
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

SingleMovieView.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    poster_path: PropTypes.string,
    rate: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string
};

export default SingleMovieView;
