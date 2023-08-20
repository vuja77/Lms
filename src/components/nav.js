import Logo from "./img/logo.svg";
import "./nav.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDesktop,faCalendarDays, faBook, faGear, faUser, faArrowRightFromBracket,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { Outlet, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import UserPhoto from "./img/user-photo.png";
import { useState } from "react";
import Config from "../Config";
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
            <li className='active'><FontAwesomeIcon icon={faDesktop} /> Dashboard</li>
          <li><FontAwesomeIcon icon={faCalendarDays} color='' /> Calendar</li>
          <li><FontAwesomeIcon icon={faBook} /> Course</li>
          <li><FontAwesomeIcon icon={faGear} /> Setting</li>
        </ul>
        <ul id="LogOut">
          <li className="UserLable">
          <img src={UserPhoto} alt="" />
          <div className="text">
            <h4>{props.data}</h4>
            <p>{props.class}</p>
          </div>
           
          </li>
          <li onClick={()=> setPopUp(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</li>
        </ul>
    </nav>

    <div className='MobileNav'>
       <ul>
          <li className='active'><FontAwesomeIcon icon={faDesktop} /></li>
          <li><FontAwesomeIcon icon={faCalendarDays} color='' /></li>
    
          <li><FontAwesomeIcon icon={faUser} /></li>
        </ul>
    </div>
    <Outlet />
    <div className="MobHeader" >
    <Link to="/"><img src={Logo} /></Link>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
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
