import Iframe from 'react-iframe'
import Logo from "./img/logo.svg";
import "./nav.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDesktop,faCalendarDays, faBook, faGear, faUser, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons"
import { Outlet, Link } from "react-router-dom";

function Nav() {
 

  return (
    <>
    <nav>
        <div>
            <img src={Logo} />
            <h1>ETŠ</h1>
        </div>
        <ul>
          <li className='active'><FontAwesomeIcon icon={faDesktop} /> Dashboard</li>
          <li><FontAwesomeIcon icon={faCalendarDays} color='' /> Calendar</li>
          <li><FontAwesomeIcon icon={faBook} /> Course</li>
          <li><FontAwesomeIcon icon={faGear} /> Setting</li>
        </ul>
        <ul id="LogOut">
          <li><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</li>
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

    </>
  );
}

export default  Nav;
