/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import '../../App.css';

function MovieList(props){  
    const breakpoints = [300, 576, 768]
    const media = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    )
    
    const movies = css`
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

	return (
        <div className='movie-app'>
            <div className='page-title'> -- Love is in the air -- </div>
            <div className='row'>
                <div css={movies} className='flex movies'>
                    {props.movies.map((movie, index) => (
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