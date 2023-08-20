import "./Course.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faPlay, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons"
import Logo from "../../components/img/logo.svg";
import {FileSvg, DownloadSvg} from "../../components/svg.js"
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import LessonAdd from "../../components/UploadForm";
import Config from "../../Config";
import leftArrow from "../../components/img/LeftArrow.svg";
import EmptyState from "../../components/img/EmptyState.svg"
import {Media, Video } from '@vidstack/player-react';
import moment from 'moment';

function Course(props) {
    const ref = useRef(null);
    useOutsideAlerter(ref);
    const location = useLocation();
    const [filter, setFilter] = useState(0);
    const [Course, setCourse] = useState([]);
    const [Lesson, setLesson] = useState([]);
    const [Matetials, setMatetials] = useState([]);
    const [MaterialVeiw, setMaterialVeiw] = useState("false");
    const [showFiles, setShow] = useState();
    const [FileUploadForm, setFileUploadForm] = useState(false);
    const [FilePopUp, setFilePopUp] = useState(false);
    const [FileExtension, setFileExtension] = useState();
    const [Search, setSearch] = useState("");
    let i = 0;

    //Fetch materilas for clicked lesson
        const ClickLesson = async (key) => {
                await fetch(Config.apiUrl+"/getMaterial/"+key)
                .then((response) => response.json())
                .then((MaterialsResp) => {
                    setMatetials(MaterialsResp);
                })
                setShow(key);
                if(showFiles === key) {
                    setShow(0);
                }
        }
    useEffect(()=> {
        const LessonCourseFetch = async () => {
            //fetch coruse name and thumbnail
            await fetch(Config.apiUrl+"/course/"+location.state)
            .then((response) => response.json())
            .then((CourseResp) => {
                setCourse(CourseResp[0]);
            })
            //Fetch lesson for couse
            await fetch(Config.apiUrl+"/getlesson/"+location.state)
            .then((response) => response.json())
            .then((LessonResp) => {
                setLesson(LessonResp);
            });  
        }
        LessonCourseFetch();
    }, [])

    function useOutsideAlerter (ref) {
        useEffect(() => {
            if(FileUploadForm === true || FilePopUp === true) {
                function handleClickOutside(event) {
                    if (ref.current && !ref.current.contains(event.target)) {
                      setFileUploadForm(false);
                      setFilePopUp(false);
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
            <section className="Course">
                {/*Search bar*/}
                <div className="SearchBar" >
                        <button className={Search === "" ? "" : "close"}onClick={() => setSearch("")}><FontAwesomeIcon icon={Search === "" ? faMagnifyingGlass : faXmark} /></button>   
                        
                        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                        <div className="Card" id={Search != "" ? "opened" : ""}>
                        {Lesson.map((course) => {
                        
                            
                            if(course.name.toLowerCase().includes(Search) === true  || course.name.toUpperCase().includes(Search.toUpperCase()) === true && Search != "" ) {
                                return(
                                    <Link to="/course" state={course.id}>
                                    <div>
                                        <img src={require("../../components/img/"+course.thumbnail)} alt="" />
                                        <div className="Text">
                                            
                                                <h2>{course.name}</h2>
                                               
                                        </div>
                                       
                                    </div>
                                    </Link>
                                    )
                            } else {
                            
                                i++;
                                if(i === 1) {
                                    return(<p>No result</p>)
                                } 
                                
                            }
                            
                        })}
                            
                           
                        </div>
                    </div>
                {/*Course name*/}
                
                <div className="CourseHead">
                    <img src={Course.thumbnail ? require("../../components/img/"+Course.thumbnail): ""} alt="" />
                        <h1>{Course.name}</h1>
              
                    {/*If user is profesor show button for upload*/
                    props.role === 2 ? 
                    <>
                        <a><button onClick={()=> setFilePopUp(!FilePopUp)}>Dodaj fajl <FontAwesomeIcon icon={faPlus}/></button></a>
                        <a><button onClick={()=> setFileUploadForm(!FileUploadForm)}>Dodaj Lekciju <FontAwesomeIcon icon={faPlus}/></button></a>
                    </>
                    : props.role === 1 ? <a href={Config.storageUrl+"/kurs/scormcontent/index.html"}><button>Zapocni kurs <FontAwesomeIcon icon={faPlay}/></button></a> : ""
                    }
                </div>
                {/*Filter*/}
                    <div className="FilterOptions">               
                        <div onClick={()=>setFilter(0)} className={filter === 0 ? "clicked" : ""}>Lekcije</div>
                        <div onClick={()=>setFilter(1)} className={filter === 1 ? "clicked" : ""}>Domaci</div>
                        <div onClick={()=>setFilter(2)} className={filter === 2 ? "clicked" : ""}>Testovi</div>
                    </div>     
                {
                    filter === 0 ?
                    //Lessons map
                   Lesson.map((item) => {   
                        let lessonId = item.id;   
                            return(                        
                            
                                <div className="Ishod">
                                    <h1>{item.section}</h1>
                                    <div className="lesson"  key={item.id}>
                                        <div className="Info"  onClick={() => ClickLesson(item.id)} id={showFiles === item.id ? "opened" : ""}>
                                            {/*Lesson icon*/}
                                            <span>
                                                <FileSvg/>
                                            </span>
                                            {/*Lesson Name*/}
                                                <div className="Text">
                                                    <h3>{item.name}</h3>
                                                    <p>{moment(item.created_at).format('DD/MM/YYYY')}</p>
                                                </div>
                                                <img src={leftArrow} alt="" className="LeftArrow" id={showFiles === item.id ? "opened" : ""}/>
                                        </div>
                                        {/*Files div*/}
                                        <div  id="files" className={showFiles === item.id ? "opened" : ""} key={item.id}>
                                            <ul>
                                                {
                                                //Materials map
                                                Matetials.map((item) => {

                                                    if(item.lesson_id === lessonId) {
                                                        //if material is file
                                                        if(item.file_path != null) {
                                                            //get file extension
                                                            let fileName = item.file_path;
                                                            let extension = fileName.split(".");
                                                            return (
                                                                <li>        
                                                                    <img onClick={() => {setMaterialVeiw(fileName); setFileExtension(extension[1]);}} src={require("../../components/img/"+extension[1]+".png")} alt="" />
                                                                    <h2>{item.file_path}</h2>
                                                                    <a href={Config.apiUrl+"/download/"+item.file_path}><DownloadSvg/></a>
                                                                    
                                                                </li>
                                                            );
                                                        } 
                                                        // if material is link
                                                        if(item.url != null) {
                                                            return (
                                                                <li>  
                                                                    <a href={item.url}>{item.url}</a>
                                                                </li>
                                                            );
                                                        }
                                                    } 
                                                })
                                                }
                                                { /*If material dose not exist*/ Matetials.length === 0 ? <h1>Nema fajlova</h1> : ""}
                                            </ul>
                                        </div>
                                    </div>
                              </div>
                                  );
                    }) : ""
                }
                {/*If lesson dosent exist*/ Lesson.length > 0 ? "" : filter === 0 ? <div className="NoLes"><img className="empty"src={EmptyState}/><p className="NoLesson">Trenutno nema lekcija</p></div>: null}
                {/*If lesson dosent exist*/ Lesson.length < 0 ? "" : filter === 1 ? <div className="NoLes"><img className="empty"src={EmptyState}/><p className="NoLesson">Trenutno nema domacih zadataka</p></div>: null}
                {/*If lesson dosent exist*/ Lesson.length < 0 ? "" : filter === 2 ? <div className="NoLes"><img className="empty"src={EmptyState}/><p className="NoLesson">Trenutno nema tsestova</p></div>: null}

                <br /><br /><br /><br /><br /><br /><br />
            </section>
            {/*Upload forms*/}
            <div  className="PopUpCont" id={FileUploadForm === true ? "opened" : FilePopUp === true ? "opened" : ""}>
                <div ref={ref}>
                    <LessonAdd data={FileUploadForm === true ? "lesson" : FilePopUp === true ? "file" : ""} les={Lesson}/>
                </div>
            </div>
        {/*HEADER for mobile*/}
        <div className="MobHeader" >
            <img src={Logo} alt="" />
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
        </div>
        {/*material view*/}
        <div className="Image" id={MaterialVeiw != "false" ? "opened" : ""}>
            <button onClick={() => setMaterialVeiw("false")}><FontAwesomeIcon icon={faXmark} size="3x"></FontAwesomeIcon></button>
                {FileExtension === "png" ? <img src={Config.storageUrl+MaterialVeiw} alt="" />
                 : FileExtension === "mp4" ? 
                 <Media>
                    <Video loading="visible" controls preload="true">
                        <video loading="visible" src={Config.storageUrl+MaterialVeiw} preload="none" data-video="0" controls />
                    </Video>
                </Media> : ""}         
        </div>
    </>
  );
}

export default Course;
