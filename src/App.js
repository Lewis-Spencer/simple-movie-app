import React, { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import MovieList from './pages/MovieList/MovieList';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MyListMovies from './pages/MyListMovies/MyListMovies';
import MovieContext from './context/MovieContext';
import axios from 'axios';

function App() {
    const [movies, setMovies] = useState([]);

    let page = 1;

	const getMovies = async (page) => { // get movies with pagination
		const url = `https://omdbapi.com/?s=love&type=movie&apikey=b5f20dd2&page=`+page;
        let response = await axios.get(url);
        const responseJson = response.data;

        if (responseJson.Search) {
            await setMovies((prev) => [...prev, ...responseJson.Search]);
        }
	};
    
	useEffect(() => {
        getMovies(page);  
        
        const handleScroll = () => {   // check scroll reach bottom add page
            let userScrollHeight = window.innerHeight + window.scrollY;
            let windowBottomHeight = document.documentElement.offsetHeight;
            if (userScrollHeight >= windowBottomHeight) {
                page++;
                getMovies(page);
            }
        };


        window.addEventListener("scroll", handleScroll);  // listen to window scroll
	}, [page]);

    return (
        <Layout>
            <Switch>
            <MovieContext.Provider value={movies}>
                <Route path="/" exact>
                    <MovieList />
                </Route>
                <Route path="/movie-details">
                    <MovieDetails />
                </Route>
                <Route path="/my-movie-list">
                    <MyListMovies />
                </Route>
            </MovieContext.Provider>
            </Switch>
        </Layout>
    );
}

export default App;
