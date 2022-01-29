/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Link } from 'react-router-dom';
import '../../App.css';

function MyListMovies(props){  

    const movies = css`
        text-decoration: none;
        a{
            text-decoration:none;
        }
        .detail{
            padding:5px;
            .movie-title{
                font-weight:bold;
                line-height:16px;
            }
        }
    `
    
    let myList = JSON.parse(localStorage.getItem("myList"));
	
    return (
        <div className='movie-app'>
            <div className='page-title'> -- My Movie List -- </div>
            <div css={css`
                        padding-top: 10px;
                     `}>
                <div css={movies} className='flex movies'>
                    { myList !== null && myList.length > 0 ? 
                        myList.map((movie, index) => (
                        <div key={index} className='flex-item movie'>
                            <Link to={{ pathname: '/movie-details/' ,
                                   state: [{Poster: movie.Poster, Title: movie.Title, imdbID: movie.imdbID}]}}>
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
                        ))
                      : 
                      "No movie added yet"
                    }
                </div>
            </div>
        </div>
	);
};

export default MyListMovies;