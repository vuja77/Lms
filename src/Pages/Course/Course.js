import "./Course.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faSquareCaretRight, faFileLines, faPlay, faClose} from "@fortawesome/free-solid-svg-icons"
import Logo from "../../components/img/logo.svg";
import Programiranje from "../../components/img/Programiranje.png";
import docx from "../../components/img/docx.png";
import pdf from "../../components/img/pdf.png";
import eng from "../../components/img/eng.png";
import {FileSvg, LeftArrow, DownloadSvg} from "../../components/svg.js"
import { useEffect, useState } from "react";

function Course() {
    const [showFiles, setShow] = useState();

    const Lesson = [
        {
            id: 1,
            name: "Uvod u Html",
            ishod: "Ishod 1"     
        },
        {
            id: 2,
            name: "Uvod u css",
            ishod: "Ishod 2"     
        },
        {
            id: 3,
            name: "Uvod u javascript",
            ishod: "Ishod 3"     
        }
    ]
    
        const ClickLesson = (key) => {
     
            setShow(key);
            if(showFiles === key) {
                setShow(0);
            }
   
    }
    

      return (
    <>
      
            <section className="Course">
                <div className="SearchBar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input placeholder="Search"/>
                </div>
                <div className="CourseHead">
                    <img src={Programiranje} alt="" />
                    <h1>Programiranje</h1>
                    <button>Zapocni kurs<FontAwesomeIcon icon={faPlay}/></button>
                </div>
                    <div className="FilterOptions">
                        <div>Lekcije</div>
                        <div>Domaci</div>
                        <div>Testovi</div>
                        <div id="gr"></div>
                    </div>
                {
                    Lesson.map((les) => {
                        return(
                    <div className="Ishod">
                        <h1>{les.ishod}</h1>
                        <div className="lesson" onClick={() => ClickLesson(les.id)} key={les.id}>
                            <div className="Info"  id={showFiles === les.id ? "opened" : ""}>
                            <span>
                            <FileSvg/>
                            </span>
                                <div className="Text">
                                    <h2>{les.name}</h2>
                                    <p>Fajl</p>
                                </div>
                                <LeftArrow/>
                            </div>
                            <div  id="files"onClick={() => ClickLesson(les.id)} className={showFiles === les.id ? "opened" : ""} key={les.id}>
                                <ul>
                                    <li>  
                                     
                                        <img src={docx} alt="" />

                                      
                                            <h2>Prezentacija</h2>
                                            <DownloadSvg/>
                                    </li>
                                        <li >  
                                        <img src={pdf} alt="" />

                                            <h2>Word fajl.docx</h2>
                                             <DownloadSvg/>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        );
                    })
                }
            </section>
        <div className="MobHeader">
            <img src={Logo} alt="" />
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
        </div>
    </>
  );
}

export default Course;
