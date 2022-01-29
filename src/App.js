import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import MovieList from './pages/MovieList/MovieList';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MyListMovies from './pages/MyListMovies/MyListMovies';

function App() {
    const [movies, setMovies] = useState([]);
    
    let page = 1;

	const getMovies = async (page) => { // get movies with pagination
		const url = `https://omdbapi.com/?s=love&type=movie&apikey=b5f20dd2&page=`+page;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            await setMovies((prev) => [...prev, ...responseJson.Search]);
        }
	};
    
	useEffect(() => {
        getMovies(page);  
        window.addEventListener("scroll", handleScroll);  // listen to window scroll
	}, []);
    
    const handleScroll = () => {   // check scroll reach bottom add page
        let userScrollHeight = window.innerHeight + window.scrollY;
        let windowBottomHeight = document.documentElement.offsetHeight;
        if (userScrollHeight >= windowBottomHeight) {
            page++;
            getMovies(page);
        }
    };
    
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <MovieList movies={movies} />
                </Route>
                <Route path="/movie-details">
                    <MovieDetails />
                </Route>
                <Route path="/my-movie-list">
                    <MyListMovies movies={movies} />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
