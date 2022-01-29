/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Fragment, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../../App.css';
import { BallTriangle } from  'react-loader-spinner'

function MovieDetails(props){  
    let location = useLocation();
    let myList = JSON.parse(localStorage.getItem("myList"));
        
    const [stateMyList, setMyList] = useState([]);
    const [details, setDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
	const getDetails = async (imdbID) => {
		const url = `https://omdbapi.com/?type=movie&apikey=b5f20dd2&i=`+imdbID;
        setIsLoading(true);
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson) {
            setDetails(responseJson);
        }
        setIsLoading(false);
	};
    
	useEffect(() => {
        getDetails(location.state[0].imdbID);  
	}, [location]);


    const movieExist = (myList, imdbID) => { // checking movie exist in list
        if(myList != null && myList.length > 0){ 
        return myList.some(function(el) {
            return el.imdbID === imdbID;
        }); 
        }
    }

    const removeMyList = (movie) =>{ // handle remove from mylist
        if(myList == null){ 
            myList = [];
        }
        myList = myList.filter((list) => list.imdbID !== movie.imdbID);
        setMyList(myList);
        console.log(stateMyList);
        localStorage.setItem('myList', JSON.stringify(myList));
        
        alert('Movie Removed from My List');
    }
    
    const saveMyList = (movie) =>{ // handle save to mylist
        console.log(myList);
        if(myList == null){ 
            myList = [];
            let detail = { Title: movie.Title, Poster: movie.Poster, imdbID: movie.imdbID, Type: movie.Type, Year: movie.Year };
            
            myList.push(detail);
            setMyList(myList);
            localStorage.setItem('myList', JSON.stringify(myList));   

            alert('Movie Added to My List');
        }else{
            if(!movieExist(myList,movie.imdbID)){
                let detail = { Title: movie.Title, Poster: movie.Poster, imdbID: movie.imdbID, Type: movie.Type, Year: movie.Year };
            
                myList.push(detail);
                setMyList(myList);
                localStorage.setItem('myList', JSON.stringify(myList));   

                alert('Movie Added to My List');
            }
        }
    }

    const breakpoints = [300, 576]
    const media = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    )
    
    const container = css`
        display:flex;
        padding: 20px;
        padding-left: 25px;
        padding-right: 25px;
        flex-direction:column;
        ${media[1]}{flex-direction:row}
    `
    const poster = css`
        width: 100%;
        min-width: auto;
        ${media[0]}{
            width: 30%;
            min-width: 250px;
            margin: auto;
            margin-top: 0;
        },
        ${media[1]}{
            width: auto;
            min-width: 250px;
            margin: auto;
            margin-top: 0;
        }
    `

    const title = css`
        font-family:'fangsong';
        padding-bottom: 5px;
        color: bisque;
        div{
            font-size: 28px;
            font-weight: bold;
        }
    `
    const detailContent = css`
        padding-left: 0;
        border-left: 0;
        margin-left: 0;
        padding-top: 10px;
        border-top: 3px dashed bisque;
        margin-top: 10px;
        ${media[1]}{
            padding-top: 0;
            border-top: 0;
            margin-top: 0;
            padding-left: 10px;
            border-left: 3px dashed bisque;
            margin-left: 10px;
        }
    `
    const dashedContent = css`
        font-size: 14px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: bisque;
        label{
            font-weight:bold;
        }
        ${media[1]}{
            font-size: 16px;
        }
    `

    const triangle = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `

    const btn = css`
        background: bisque;
        border-radius: 50px;
        padding: 5px;
        width: 140px;
        font-size: 12px;
        border: 3px solid;
        margin-top: 10px;
        font-weight: bold;
        cursor: pointer;
        &:hover{
            background:#ce0000;
            color:bisque;
        }
    `

	return (
        <Fragment>
            {isLoading ?
            <div css={triangle}>
                <BallTriangle css={triangle} color="white" height={80} width={80} /> 
            </div>: 
            <div css={container}>
                <img css={poster} className='poster' src={location.state[0].Poster} alt='movie'></img>
                <div css={detailContent}>
                    <div css={title}>
                        <div>{location.state[0].Title}</div>
                        {details.Year} - {details.Genre}
                        <br></br> {details.imdbRating} / 10 
                    </div>
                    <div css={dashedContent}>
                        <label>Starring : <br></br></label>
                        {details.Actors}
                    </div>
                    <div css={dashedContent}>
                        <label>Plot : <br></br></label>
                        {details.Plot}
                    </div>
                    <div css={dashedContent}>
                    <label>Director : <br></br></label>
                        {details.Director}
                    </div>
                    <div css={dashedContent}>
                    <label>Box Office : <br></br></label>
                        {details.BoxOffice}
                    </div>
                    { movieExist(myList,location.state[0].imdbID) ? 
                    <button css={btn} onClick={() => removeMyList(location.state[0]) }>Remove from My List</button>
                    :
                    <button css={btn} onClick={() => saveMyList(location.state[0]) }>Add to My List</button>
                    }
                </div>
            </div>
            }
        </Fragment>
	);
};

export default MovieDetails;