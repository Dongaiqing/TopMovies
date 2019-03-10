import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import placeHolderImage from "../../Assets/mv_ph.png";
import { Link } from 'react-router-dom'
import axios from "axios";
import SingleMovieView from './SingleMovieView/SingleMovieView.jsx';
import NoResultView from '../Utils/NoResultView.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    GalleryView as ViewCss,
    GalleryViewFilterControl as FilterControl,
    GalleryViewFilterControlDropDown as DropDownMenu,
    GalleryViewFilterControlDropDownButton as Button,
    GalleryViewFilterControlDropDownContent as DropDownContent,
    GalleryViewGridView as GridView
} from "./GalleryView.module.scss";


class GalleryView extends Component {
	constructor() {
        super();

		this.imgBase = "https://image.tmdb.org/t/p/w500/";
        this.baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=985fc26c8cc221e4e54bb0d5d2b6b119&language=en-US&page=1";

        this.genreToID = {
			"Action": 28,
			"Adventure": 12,
			"Animation": 16,
			"Comedy": 35,
			"Crime": 80,
			"Documentary": 99,
			"Drama": 18,
			"Family": 10751,
			"Fantasy": 14,
			"History": 36,
			"Horror": 27,
			"Music": 10402,
			"Mystery": 9648,
			"Romance": 10749,
			"Science Fiction": 878,
			"TV Movie": 10770,
			"Thriller": 53,
			"War": 10752,
			"Western": 37
        };

        this.IDToGenre =  {
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
        };

        this.filterMap = {
            "Popularity  ↑": "popularity.asc",
            "Popularity  ↓": "popularity.desc",
            "Release Date  ↑": "release_date.asc",
            "Release Date  ↓": "release_date.desc",
            "Rating Average  ↑": "vote_average.asc",
            "Rating Average  ↓": "vote_average.desc"
        }

		this.state = {
            sortBy: null,
            genres: [],
			movieList: {},
			hasMovie: false
		};

		this.getMovieList();
	}

	getMovieList() {
        let sortUrl = this.state.sortBy ? 
                        `&sort_by=${this.state.sortBy}` : '';
        let genresUrl = this.state.genres.length !== 0 ? 
                        `&with_genres=${this.state.genres.map(
                            x => this.genreToID[x]
                        ).join(',')}` : '';

        const url = `${this.baseUrl}${sortUrl}${genresUrl}`;
        axios
            .get(url)
            .then(response => {
                const data = response.data;
                let modi = {};
                modi.attribute = [];
                for (let i = 0; i < data.results.length; ++i) {
                    const mv = data.results[i];
					modi.attribute[i] = {
                        title: mv.title,
                        id: mv.id,
                        poster_path: mv.poster_path ? `${this.imgBase}${mv.poster_path}` : placeHolderImage,
                        rate: mv.vote_average,
                        genres: mv.genre_ids.map((x) => this.IDToGenre[x]),
                        date: mv.release_date
                    }
                }
                this.setState({
                    movieList: modi, 
                    hasMovie: modi.length !== 0
                });
                console.log(data);
                console.log(this.state.movie);
            })
            .catch(error => {
                console.log(error);
            });
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
    
    onSortSelected(sort) {
        this.setState({
            sortBy: this.filterMap[sort],
        }, () => this.getMovieList());
    }

    onGenreSelected(idx, genre) {
        const checkbox = this.refs[`genreCheck${idx}`];
        let curSelection = this.state.genres;
        const index = curSelection.indexOf(genre);
        if (index === -1) {
            curSelection.push(genre);
            checkbox.checked = true;
        } else {
            curSelection.splice(index, 1);
            checkbox.checked = false;
        }

        this.setState({
            genres: curSelection,
        }, () => this.getMovieList());
    }

	render() {
        return (
            <div className={ViewCss}>
                <h1>
                    Movie Gallery
                </h1>
                <div className={FilterControl}>
                    <div className={DropDownMenu}>
                        <div className={Button}>
                            <FontAwesomeIcon icon="sort-amount-down"/>
                            <p>Sort By</p>
                        </div>
                        <div className={DropDownContent}>
                            {Object.keys(this.filterMap).map((x, idx) => <div key={idx} onClick={() => this.onSortSelected(x)}>{x}</div>)}
                        </div>
                    </div>

                    <div className={DropDownMenu}>
                        <div className={Button}>
                            <FontAwesomeIcon icon="filter"/>
                            <p>Genre Filter</p>
                        </div>
                        <div className={DropDownContent}>
                            {Object.keys(this.genreToID).map((x, idx) => <div key={idx} onClick={() => this.onGenreSelected(idx, x)} ><input ref={`genreCheck${idx}`} type="checkbox" name={x} />{x}</div>)}
                        </div>
                    </div>
                
                </div>
                <div className={GridView}>
                    {this.state.hasMovie ? this.state.movieList.attribute.map((movie, idx) => <SingleMovieView key={idx} movie={movie} />) : <NoResultView/>}
                </div>
            </div>
        );
    }
}

export default GalleryView;
