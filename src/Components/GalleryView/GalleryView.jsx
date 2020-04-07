import React, { Component } from "react";
import placeHolderImage from "../../Assets/mv_ph.png";
import axios from "axios";
import SingleMovieView from './SingleMovieView/SingleMovieView.jsx';
import NoResultView from '../Utils/NoResultView.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "semantic-ui-css/semantic.min.css";

import {
    GalleryView as ViewCss,
    GalleryViewFilterControl as FilterControl,
    GalleryViewFilterControlDropDown as DropDownMenu,
    GalleryViewFilterControlDropDownButton as Button,
    GalleryViewFilterControlDropDownContent as DropDownContent,
    GalleryViewGridView as GridView,
    GalleryViewNavigator as Navigator
} from "./GalleryView.module.scss";


class GalleryView extends Component {
	constructor() {
        super();
        console.log("constructor");
		this.imgBase = "https://image.tmdb.org/t/p/w500/";
        this.baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=985fc26c8cc221e4e54bb0d5d2b6b119&language=en-US";

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
            "▲ Popularity": "popularity.asc",
            "▼ Popularity": "popularity.desc",
            "▲ Release Date": "release_date.asc",
            "▼ Release Date": "release_date.desc",
            "▲ Rating Average": "vote_average.asc",
            "▼ Rating Average": "vote_average.desc",
        }

		this.state = {
            sortBy: null,
            genres: [],
			movieList: {},
            hasMovie: false,
            page: 1,
            totalPages: 0,
            contentChanged: false
        };
        
        this.ids = [];
	}

	getMovieList() {
        console.log("getMovieList");
        let sortUrl = this.state.sortBy ? 
                        `&sort_by=${this.state.sortBy}` : '';
        let genresUrl = this.state.genres.length !== 0 ? 
                        `&with_genres=${this.state.genres.map(
                            x => this.genreToID[x]
                        ).join(',')}` : '';
        let pageUrl = `&page=${this.state.page}`;

        const url = `${this.baseUrl}${pageUrl}${sortUrl}${genresUrl}`;
        axios
            .get(url)
            .then(response => {
                const data = response.data;
                const totalPages = data.total_pages;
                let modi = {};
                modi.attribute = [];
                this.ids = [];
                for (let i = 0; i < data.results.length; ++i) {
                    const mv = data.results[i];
                    this.ids.push(mv.id);

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
                    hasMovie: modi.attribute.length !== 0,
                    totalPages: totalPages,
                    contentChanged: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    onPageChanged(page) {
        if (page < 1 || page > this.state.totalPages) {
            return;
        } 
        this.setState({
            page: page,
            contentChanged: false
        }, () => this.getMovieList());
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
            ...this.state,
            page: 1,
            sortBy: this.filterMap[sort],
            contentChanged: false
        }, () => this.getMovieList());
    }

    onGenreSelected(genre) {
        let curSelection = this.state.genres;
        const index = curSelection.indexOf(genre);
        if (index === -1) {
            curSelection.push(genre);
        } else {
            curSelection.splice(index, 1);
        }

        this.setState({
            ...this.state,
            page: 1,
            genres: curSelection,
            contentChanged: false
        }, () => this.getMovieList());
    }

	render() {
        console.log("render");
        return (
            <div className={ViewCss} onScroll={() => {
                
            }}>
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
                            {Object.keys(this.genreToID).map((x, idx) => 
                            <div key={idx} onClick={() => this.onGenreSelected(x)} >
                                <FontAwesomeIcon id="cbox" icon={this.state.genres.indexOf(x) === -1 ? ["far", "square"] : "check-square"}/><p>{x}</p>
                            </div>)}
                        </div>
                    </div>
                
                </div>
                <div className={GridView}>
                    {this.state.hasMovie ? this.state.movieList.attribute.map((movie, idx) => 
                    <SingleMovieView key={idx} movie={movie} ids={this.ids}/>) : <NoResultView/>}
                </div>
                <div className={Navigator} style={!this.state.hasMovie ? {display: "none"} : {display: "flex"}}>
					<div onClick={() => this.onPageChanged(this.state.page - 1)}><FontAwesomeIcon icon="arrow-left"/></div>
					<div onClick={() => this.onPageChanged(this.state.page + 1)}><FontAwesomeIcon icon="arrow-right"/></div>
				</div>
            </div>
        );
    }

    componentDidMount() {
        this.getMovieList(this.state.page);
    }

    shouldComponentUpdate(_, nextState) {
        return nextState.contentChanged;
    }
}

export default GalleryView;
