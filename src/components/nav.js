import Logo from "./img/logo.svg";
import "./nav.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDesktop,faCalendarDays, faBook, faArrowRightFromBracket, faCog} from "@fortawesome/free-solid-svg-icons"
import { Outlet, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import UserPhoto from "./img/user.jpg";
import { useState } from "react";
import Config from "../Config.js";
import LeftArrow from "./img/LeftArrow.svg"
import { useLocation } from "react-router-dom";

function Nav(props) {
  const location = useLocation();
  const [Popup, setPopUp] = useState(false);
  const LogOut = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    window.location =Config.homePageUrl;

  
};
  return (
    <>
    <nav>
        <div>
            <Link to="/"><img src={Logo} /></Link>
            <h1>ETŠ</h1>
        </div>
        <ul>
        <Link to="/"><li className={location.pathname === "/" ? "active" : ""}><FontAwesomeIcon icon={faDesktop} /> Dashboard</li></Link>
          <Link to="calendar"><li className={location.pathname === "/calendar" ? "active" : ""}><FontAwesomeIcon icon={faCalendarDays} color='' /> Calendar</li></Link>
          <Link to="courses"><li className={location.pathname === "/courses" ? "active" : location.pathname === "/course" ? "active" : ""}><FontAwesomeIcon icon={faBook} /> Course</li></Link>
          <Link to="setting"><li className={location.pathname === "/setting" ? "active" : ""}><FontAwesomeIcon icon={faCog} /> Setting</li></Link>

        </ul>
        <ul id="LogOut">
          <Link to="profile">
          <li  id="UserLable" className={location.pathname === "/profile" ? "active" : ""}>
          <img src={UserPhoto} alt="" />
          <div className="text">
            <h4>{props.data}</h4>
            <p>{props.class}</p>
          </div>
           
          </li>
          </Link>
          
          <li onClick={()=> setPopUp(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</li>
        </ul>
    </nav>

    <div className='MobileNav'>
       <ul>
       <Link to="/"><li className={location.pathname === "/" ? "active" : ""}><FontAwesomeIcon icon={faDesktop} /></li></Link>
          <Link to="courses"><li className={location.pathname === "/courses" ? "active" : location.pathname === "/course" ? "active" : ""}><FontAwesomeIcon icon={faBook} /></li></Link>

          <Link to="calendar"><li className={location.pathname === "/calendar" ? "active" : ""}><FontAwesomeIcon icon={faCalendarDays} color='' /></li></Link>

    
        </ul>
    </div>
    <Outlet />
    <div className="MobHeader" >
    
    {location.pathname === "/" ? <Link to="/"><img src={Logo} /></Link> : location.pathname === "/course" ? <Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>:location.pathname === "/profile" ? <Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>:<Link to="/"><img className="courseArrow"src={LeftArrow} /></Link>}
    <h3>{location.pathname === "/" ? "LMS" : location.pathname === "/course" ? "Course": location.pathname === "/profile" ? "Profile":"Strana u izradi"}</h3>
    {location.pathname != "/profile" ?<Link to="profile"><img src={UserPhoto} className="UserPhoto"/></Link> : location.pathname === "/profile" ? <FontAwesomeIcon icon={faCog}/>: ""}
            
    </div>
    <div className="PopUp" id={Popup === true ? "opened" : ""}>
        <div className="LogoutAlert">
          <p>Do you want to log out?</p>
          <div className="Buttons">
            <button id="yes" onClick={() => LogOut()}>Yes</button>
            <button id="no" onClick={() => setPopUp(false)}>No</button>
          </div>
        </div>
    </div>
    </>
  );
}

export default  Nav;
