/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { NavLink } from 'react-router-dom';


const breakpoints = [768]
const media = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
)

const menu = css`
    padding-bottom: 3px;    
    text-align:center;
    ul{ 
        margin: 0;
        padding-left: 25px;
        padding-right: 25px;
        li{
            display: inline-block;
            padding: 2px;
            padding-right: 10px;
            list-style:none;
            a{
                text-decoration: none;
                font-size: 0.95em;
                font-weight: bold;
                color:black;
                &:hover {
                    color: #ce0000;
                }
            }
        }
        ${media[0]}{text-align: right;}
    }
`

const mainTitle = css`                
    text-align: center;
    color: #ce0000;
    font-size: 2em;
    font-family: cursive;
    font-weight: 600;
`


const MainNavigation = () => {
    return (
        <header css={css`
            background: white; padding-top: 3px;
        `}>
            <div css={mainTitle}>
                LoveFlix</div>
            <div className="menu" css={menu}>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/my-movie-list'>My List Movies</NavLink></li>
                </ul>
            </div>
        </header>
    );
}


export default MainNavigation;