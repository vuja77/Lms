
import "./Profile.scss"

import {useState} from "react";

import Config from "../../Config.js";
import { memo } from "react";

import UserPhoto from "../../components/img/user.jpg";
import Cookies from 'universal-cookie';

function Profile(props) {
    const [showEdit, setshowEdit] = useState(false);
    const LogOut = () => {
        const cookies = new Cookies();
        cookies.remove('token');
        window.location =Config.homePageUrl;
    
    };
     return (
        <>
     
            <section className="CenterSection" >
                <div className='ProfileBox'>
                    <img src={UserPhoto} alt="" />
                    <div className="Text">
                        <h3 className={showEdit === false ? "" : "hidden"}>{props.data}</h3>
                        <input className={showEdit != false ? "" : "hidden"} type="text" value={props.data}/>

                        <p>{props.mail}</p>
                    </div>
                    <div className="Text">
                        <button onClick={() => setshowEdit(!showEdit)}>{showEdit != false ? "Sačuvaj" : "Uredi profil"}</button>
                        <button onClick={() => LogOut()}>Odjavi se</button>
                    </div>
                </div>
                <div className='Sec'>
                    <ul>
                        <li>
                            <h3>{props.role === 2 ? "Professor" : "Student"}</h3>
                            <p>Type</p>
                        </li>
                        <li>
                            <h3>S2C</h3>
                            <p>Class</p>
                        </li>
                        <li>
                            <h3>12</h3>
                            <p>Passed course</p>
                        </li>
                    </ul>
                </div>
            </section>
    </>
  );
}

export default memo(Profile);

