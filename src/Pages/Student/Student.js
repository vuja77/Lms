import "./Student.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import Calendar from "../../components/img/Calendar.png";
import Pedagog from "../../components/img/Pedagog.png";

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import Config from "../../Config.js";
import { memo } from "react";

import LessonAdd from "../../components/UploadForm";

function Student(props) {
    const ref = useRef();
    const reminders = useRef();
    const [Loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(0);
    const [MyCourse, setCourse] = useState([]);
    const [Search, setSearch] = useState("");
    const [Scroll, setScroll] = useState(0);
    const [LessonPopUp, setPopUp] = useState(false);

    let i = 0;
    let a = 0;
    //Loading Screeen
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [])
    //Fetch course
    useEffect(() =>{
        const fetchCourse = async () => {
            await fetch(Config.apiUrl+"/getcourse/"+props.data1)
            .then((responese) => responese.json())
            .then((CourseResp) => {
             setCourse(CourseResp);
            })
        }
         fetchCourse();
    }, [props.data1]);
  
     return (
        <>
        {Loading === true? <LoadingScreen/> : ""}
            <section className="CenterSection" ref={ref} onScroll={(event) => setScroll(event.currentTarget.scrollTop)}>
                    <div className="SearchBar" >
                        <button className={Search === "" ? "" : "close"}onClick={() => setSearch("")}><FontAwesomeIcon icon={Search === "" ? faMagnifyingGlass : faXmark} /></button>   
                        
                        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                        <div className="Card" id={Search != "" ? "opened" : ""}>
                        {MyCourse.filter(course => course.name.toLowerCase().includes(Search)  || course.name.toUpperCase().includes(Search.toUpperCase())).map((course) => {
                            
                            i+=1;
                            
                                return(
                                    <Link to="/course" state={course.id}>
                                    <div>
                                        <img src={require("../../components/img/"+course.thumbnail)} alt="" />
                                        <div className="Text">
                                            
                                                <h2>{course.name}</h2>
                                                <h3>{course.first_name + " " + course.last_name}</h3>
                                        </div>
                                       
                                    </div>
                                    </Link>
                                    )
                            
                            
                        })}
                        {i<1?<p>Nema rezlutata pretrage</p>: ""}
                           
                        </div>
                    </div>

                    <div className="Reminders" 
                    >
                        <div className="TestReminder">
                            <div>
                                <img src={Calendar} alt="" />           
                            </div>
                                <div id="text">
                                    <h2>Podsjetnik</h2>
                                    <p>Trenutno nema zakazanih testova</p>
                                </div>
                        </div>
                        <div className="Pedagog">
                            <div>
                                <img src={Pedagog} alt="" />           
                            </div>
                                <div id="text">
                                    <h2>Pedagog</h2>
                                    <p>Nas pedagog je uvijek tu da te saslusa o svim problemima</p>
                                    <button>Pozovite Pedagoga</button>
                                </div>
                        </div>
                    </div>
                    <div className="Dots">
                        <span id={Scroll > 310 ?"" : "active"} onClick={() => reminders.current.scrollLeft = 0}></span>
                        <span id={Scroll < 310 ?"" : "active"} onClick={() => reminders.current.scrollLeft = 312}></span>
                    </div>
                    <h1>Moduli</h1>
                        {/*Filter Options*/}
                    <div className="FilterOptions">
                        <div onClick={()=>setFilter(0)} className={filter === 0 ? "clicked" : ""}>Svi</div>
                        <div onClick={()=>setFilter(1)} className={filter === 1 ? "clicked" : ""}>Strucni</div>
                        <div onClick={()=>setFilter(2)} className={filter === 2 ? "clicked" : ""}>Opsti</div>
                    </div>
                <div className="Moduli">
                        {
                            MyCourse.map((course) => {
                                if(course.course_type_id === filter) {
                                    return(
                                        <Link to="/course" state={course.id}>
                                        <div className="Course">
                                            <img src={require("../../components/img/"+course.thumbnail)} alt="" />
                                                <h5>{course.courseTypeName}</h5>
                                                    <h2>{course.name}</h2>
                                                        <h3>{course.first_name + " " + course.last_name}</h3>
                                                            <Box sx={{ width: '100%', mr: 1 , borderRadius: "30px"}}>
                                                                <LinearProgress variant="determinate" value="60" />
                                                            </Box>
                                         </div>
                                    </Link>
                                    );
                                } else if(filter === 0) {
                                    return(
                                        <Link to="/course" state={course.id}>
                                            <div className="Course">
                                                <img src={require("../../components/img/"+course.thumbnail)} alt="" />
                                                    <h5>{course.courseTypeName}</h5>
                                                        <h2>{course.name}</h2>
                                                            <h3>{course.first_name + " " + course.last_name}</h3>
                                                                <Box sx={{ width: '100%', mr: 1 , borderRadius: "30px"}}>
                                                                    <LinearProgress variant="determinate" value="60" />
                                                                </Box>
                                             </div>
                                        </Link>
                                    );
                                } else {
                                    return("");
                                }
                            
                            })
                        }
                        </div>              
            </section>
       
    </>
  );
}

export default memo(Student);

