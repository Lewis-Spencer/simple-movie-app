/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import '../../App.css';
import MovieContext from '../../context/MovieContext';

function MovieList(props){  
    const moviesList = css`
        text-decoration: none;
        a{
            text-decoration:none;   
            color: black
        }
        .detail{
            padding:5px;
            .movie-title{
                font-weight:bold;
                line-height:16px;
            }
        }
    `

    const movies = useContext(MovieContext);


	return (
        <div className='movie-app'>
            <div className='page-title'> -- Love is in the air -- </div>
            <div className='container'>
                <div css={moviesList} className='flex movies'>
                    {movies.map((movie, index) => (
                        <div key={index} className='flex-item movie'>
                            <Link to={{ pathname: '/movie-details/' ,
                                       state: [{Poster: movie.Poster, Title: movie.Title, imdbID: movie.imdbID, Type: movie.Type, Year: movie.Year}]}}>
                                <img className='poster' src={movie.Poster} alt='movie'></img>
                                <div className='detail'>
                                    <div className='movie-title'>{movie.Title}</div>
                                    <div>
                                        <div>{movie.Type}</div>
                                        <div>{movie.Year}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
	);
};

export default MovieList;