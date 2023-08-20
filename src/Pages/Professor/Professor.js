import "./Professor.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faSquareCaretRight, faXmark} from "@fortawesome/free-solid-svg-icons"
import Calendar from "../../components/img/Calendar.png";
import Homework from "../../components/img/Homework.svg";
import Lesson from "../../components/img/Lesson.svg";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LessonAdd from "../../components/UploadForm";
import Config from "../../Config";
function Professor(props) {
    const [Classes, setClasses] = useState([]);
    const [LessonPopUp, setPopUp] = useState(false);
    const [Search, setSearch] = useState("");

    const ref = useRef(null);
    useOutsideAlerter(ref);
  useEffect(() => {
        const ClassFetch = async () => {
            const ClassesReq = await fetch(Config.apiUrl+"/getclass/"+props.data);
            const ClassRes = await ClassesReq.json();
            setClasses(ClassRes);
        }
        ClassFetch();
    }, [])
        function useOutsideAlerter (ref) {
            useEffect(() => {
                if(LessonPopUp === true) {
                    function handleClickOutside(event) {
                        if (ref.current && !ref.current.contains(event.target)) {
                          setPopUp(false); 
                        }
                      }
                      document.addEventListener("mousedown", handleClickOutside);
                      return () => {
                     
                        document.removeEventListener("mousedown", handleClickOutside);
                      };
                }
                
              });
        }
  return (
    <>

    <section className="CenterSection">
    <div className="SearchBar" >
                        <button className={Search === "" ? "" : "close"}onClick={() => setSearch("")}><FontAwesomeIcon icon={Search === "" ? faMagnifyingGlass : faXmark} /></button>   
                        
                        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                        <div className="Card" id={Search != "" ? "opened" : ""}>
                        {Classes.map((course) => {

                            if(course.course_name.toLowerCase().includes(Search) === true || course.course_name.includes(Search.toLowerCase()) || course.course_name.toUpperCase().includes(Search.toUpperCase()) && Search != "" ) {
                                return(
                                    <Link to="/course" state={course.id}>
                                    <div >
                                        
                                        <div className="Text">
                                            
                                                <h2>{course.name}</h2>
                                                <h3>{course.course_name}</h3>
                                        </div>
                                       
                                    </div>
                                    </Link>
                                    )
                            } 
                            
                        })}
                            
                           
                        </div>
                    </div>
        <div className="Reminders">
            <div className="TestAdd">
                <img src={Calendar} alt="" />         
                <h2>Kreiraj Test</h2>
            </div>
            <div className="LessonAdd" onClick={() => setPopUp(!LessonPopUp)}>
                <img src={Lesson} alt="" />         
                <h2>Dodaj lekciju</h2>
            </div>
            <div className="HomeworkReminder">
                <img src={Homework} alt="" />         
                <h2>Dodaj domaci</h2>
            </div>
        </div>
            <h1>Odeljenja</h1>
           
                <div className="Classes">
                    {
                        Classes.map((item)=> {

                                return(
                                    <Link to="/course" state={item.id}>
                                        <div className="cls">
                                            <div className="Text">
                                                <h1>{item.name}</h1>
                                                <p>{item.course_name}</p>
                                            </div>
                                            <FontAwesomeIcon icon={faSquareCaretRight} size="2x"/>
                                        </div>
                                    </Link>
                                    );
                        })
                    }
        

                </div>
       
        </section>
      

        <div  className="PopUpCont" id={LessonPopUp === true ? "opened" : ""}>
            <div ref={ref}>
            <LessonAdd data={1} userId={props.data}/>
            </div>
        </div>
      
    </>
  );
}

export default Professor;
