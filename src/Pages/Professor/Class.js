import "./Class.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faSquareCaretRight, faFileLines, faPlus} from "@fortawesome/free-solid-svg-icons"

import Logo from "../../components/img/logo.svg";
import {FileSvg, LeftArrow, DownloadSvg} from "../../components/svg.js"

import { useState } from "react";

function Course() {
    const [filter, setFilter] = useState("lekcije");
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
            <section className="Class">
            <div className="SearchBar">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input placeholder="Search"/>
            </div>
                <div className="ClassHead">
                    <h1>S2C</h1>
                   
      
                    <button>Dodaj {filter} <FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className="FilterOptions">
                    <div onClick={()=>setFilter("lekciju")} className={filter === "lekcije" ? "clicked" : ""}>Lekcije</div>
                    <div onClick={()=>setFilter("domaci")} className={filter === "domaci" ? "clicked" : ""}>Domaci</div>
                    <div onClick={()=>setFilter("test")} className={filter === "test" ? "clicked" : ""}>Testovi</div>
           
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
                                        <span>
                                            <FileSvg/>
                                        </span>
                                            <h2>Prezentacija</h2>
                                            <DownloadSvg/>
                                    </li>
                                        <li >  
                                            <span className="word">
                                                <FileSvg/>
                                            </span>
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
