import "./Professor.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClose, faMagnifyingGlass, faSquareCaretRight, faXmark} from "@fortawesome/free-solid-svg-icons"
import Calendar from "../../components/img/Calendar.png";
import Lesson from "../../components/img/Lesson.svg";
import Cloud from "../../components/img/colud.svg";
import Homework from "../../components/img/Homework.svg";
import docx from "../../components/img/docx.png";
import pdf from "../../components/img/pdf.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Professor() {
    const classes = [
        {
            id: 1,
            name: "S1A",
            smjer: "Elektrotehnicar energetike"
        },
        {
            id: 1,
            name: "S3C",
            smjer: "Elektrotehnicar za razvoje veb i mob aplikacija"
        },
        {
            id: 1,
            name: "S4G",
            smjer: "Elektrotehnicar energetike"
        },
        {
            id: 1,
            name: "S3D",
            smjer: "Elektrotehnicar za razvoje veb i mob aplikacija"
        },
        {
            id: 1,
            name: "S2A",
            smjer: "Elektrotehnicar za razvoje veb i mob aplikacija"
        },
        {
            id: 1,
            name: "S4G",
            smjer: "Elektrotehnicar energetike"
        }
    ]
    const smjer = [
        {
            id: 1,
            smjer: "Elektrotehnicar energetike"
        },
        {
            id: 2,
            
            smjer: "Elektrotehnicar za razvoje veb i mob aplikacija"
        },
        
    ]
    const [ed_programs, setEd] = useState("svi");
    const [LessonPopUp, setPopUp] = useState(false);
   /* useEffect(() => {
        const EdPrograms = async () => {
            const className = await (
                await fetch("http://127.0.0.1:8000/api/ed_programs")
              ).json();
              setEd(className);
        }
        EdPrograms();
 
    }, [])
    console.log(ed_programs);*/
    console.log(ed_programs);
    const as = (event) => {
        setEd(event.target.value);
    }
  return (
    <>

    <section className="CenterSection">
        <div className="SearchBar">
            
        <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder="Search"/>
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
        <h1>
            Odeljenja
        </h1>
        <select placeholder="Smjer" onChange={as}>
            <option value="svi" selected>Izaber Smjer</option>
            {smjer.map((smjer) => {
                return <option  value={smjer.smjer} >{smjer.smjer}</option>;
            })}
        </select>
        <div className="Classes">
            {
                classes.map((cls)=> {
                    if(cls.smjer === ed_programs) {
                        return(
                    
                            <Link to="/class">
                                <div>
                                    <div className="Text">
                                        <h1>{cls.name}</h1>
                                        <p>{cls.smjer}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faSquareCaretRight} size="2x"/>
                                 </div>
                            </Link>
                            );
                    } else if (ed_programs === "svi") {
                        return(
                    
                            <Link to="/class">
                                <div>
                                    <div className="Text">
                                        <h1>{cls.name}</h1>
                                        <p>{cls.smjer}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faSquareCaretRight} size="2x"/>
                                 </div>
                            </Link>
                            );
                    }
                    
                    
                })
            }
         
           
            
        </div>
        </section>
        <div onClick={() => setPopUp(!LessonPopUp)} className="PopUpCont" id={LessonPopUp === true ? "opened" : ""}>
            <div className="AddLesson">
                <h1>Add Lesson</h1>
            <input type="text" placeholder="LessonName"/>
            <select>
                <option value="">Izaberi Ishod</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
            <select>
                <option value="">Izaberi Odeljenje</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
                <div className="Helper">
                    <ul>
                        <h4>Ready to upload</h4>
                        <li><img src={docx} alt="" /><h5>Html-css.pdf</h5><FontAwesomeIcon icon={faXmark} /></li>
                        <li><img src={docx} alt="" /><h5>Html-css.pdf</h5><FontAwesomeIcon icon={faXmark} /></li>
                        <li><img src={docx} alt="" /><h5>Html-css.pdf</h5><FontAwesomeIcon icon={faXmark} /></li>
                        <li><img src={docx} alt="" /><h5>Html-css.pdf</h5><FontAwesomeIcon icon={faXmark} /></li>
                    </ul>
                    <div className="dargDrop">
                        <img src={Cloud} alt="" />
                        <p>Darg & Drop your files here</p>
                    </div>
                </div>
                <button>Upload</button>
               
            </div>
        </div>
      
    </>
  );
}

export default Professor;
