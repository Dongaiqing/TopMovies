import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import PropTypes from "prop-types";
import placeHolderImage from "../../../Assets/mv_ph.png";

// Include your new Components here
import Search from "../Search.jsx";
import {
	DropDownMovieView as ViewCss,
	DropDownMovieViewImage as ViewImage,
	DropDownMovieViewDesc as ViewDesc,
	DropDownMovieViewDescTitle as DescTitle,
    DropDownMovieViewDescContent as DescContent,
    DropDownMovieViewDescMisc as DescMisc,
	DropDownMovieViewDescMiscTagContainer as TagContainer,
	Tag
} from "./DropDownMovieView.module.scss";

class DropDownMovieView extends Component {
	constructor() {
		super();
        this.poster_base = "https://image.tmdb.org/t/p/w500/";

	}

	render() {
		const noMovie =
			Object.entries(this.props.movie).length === 0 &&
			this.props.movie.constructor === Object;
		if (!noMovie) {
			return (
				<div>
					<div className={ViewCss}>
						<div className={ViewImage}>
							<img src={
                                this.props.movie.poster_path !== null ? `${this.poster_base}${this.props.movie.poster_path}` : placeHolderImage
                            } />
						</div>
						<div className={ViewDesc}>
							<div className={DescTitle}>
								<h1>{this.props.movie.title}</h1>
							</div>
							<div className={DescMisc}>
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
		} else {
			return <div>No Results</div>;
		}
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
