import "./Student.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import Calendar from "../../components/img/Calendar.png";
import Pedagog from "../../components/img/Pedagog.png";
import Matematika from "../../components/img/matematika.png";
import Programiranje from "../../components/img/Programiranje.png";
import eng from "../../components/img/eng.png";
import Logo from "../../components/img/logo.svg";

import csbh from "../../components/img/csbh.png";
import Fiz from "../../components/img/fiz.png";

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Student() {
   const classId = {
        id: [1,2,3,4,5,7,8,9,10,11,12,14,13]
    }
    const professor = [
        {
            name: "vuja",
            course: "1"
        },
        {
            name: "djordjiej",
            course: 3

        }
    ];
    const course = [
        {   
            id: 1,
            name: "Matematika",
            photo: Matematika,
            course_type: "opsti"
        },
        {   
            id: 2,
            name: "CSBH",
            photo: csbh,
            course_type: "opsti"
        },
        {   
            id: 4,
            name: "engleski",
            photo: eng,
            course_type: "opsti"
        },
        {   
            id: 3,
            name: "Fizicko",
            photo: Fiz,
            course_type: "opsti"
        },
        
        {   
            id: 5,
            name: "Programiranje",
            photo: Programiranje,
            course_type: "strucni"
        },
        {   
            id: 6,
            name: "Baze Podataka",
            photo: Programiranje,
            course_type: "strucni"
        },
        {   
            id: 7,
            name: "Dizajn",
            photo: Programiranje,
            course_type: "strucni"
        },
        {   
            id: 8,
            name: "Operativni sistemi",
            photo: Programiranje,
            course_type: "strucni"
        }

    ];
    const [filter, setFilter] = useState("svi");
    const [MyCourse, setCourse] = useState([]);
   /* useEffect( async () => {
        await axios.post("http://127.0.0.1:8000/api/getcourse", classId)
        .then((response) => {
            console.log(response.data);
            setCourse(response.data);
        })
    }, [])*/

   
  return (
   <section className="CenterSection">
        <div className="SearchBar">
            
        <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder="Search"/>
        </div>
        <div className="Reminders">
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
        <h1>Moduli</h1>
        <div className="FilterOptions">
            <div onClick={()=>setFilter("svi")} className={filter === "svi" ? "clicked" : ""}>Svi</div>
            <div onClick={()=>setFilter("strucni")} className={filter === "strucni" ? "clicked" : ""}>Strucni</div>
            <div onClick={()=>setFilter("opsti")} className={filter === "opsti" ? "clicked" : ""}>Opsti</div>
           
        </div>
       <div className="Moduli">
            {
                course.map((course)=> {
                    if(course.course_type === filter) {
                        return(
                            <Link to="/course">
                            <div className="Course">
                            <img src={course.photo} alt="" />
                            <h5>Opšte obrazovni</h5>
                            <h2>{course.name}</h2>
                            {professor.map((pr) => {
                                if(pr.course === course.id) {
                                    return(
                                        <h3>Dijana Bulaltovic</h3>
        
                                    );
                                }
                                
                            })}
                            <Box sx={{ width: '100%', mr: 1 , borderRadius: "30px"}}>
                                 <LinearProgress variant="determinate" value="60" />
                            </Box>
                        </div>
                        </Link>
                        );
                    } if(filter === "svi") {
                        return(
                            <Link to="/course">
                            <div className="Course">
                            <img src={course.photo} alt="" />
                            <h5>Opšte obrazovni</h5>
                            <h2>{course.name}</h2>
                            {professor.map((pr) => {
                                if(pr.course === course.id) {
                                    return(
                                        <h3>Dijana Bulaltovic</h3>
        
                                    );
                                }
                                
                            })}
                            <Box sx={{ width: '100%', mr: 1 , borderRadius: "30px"}}>
                                 <LinearProgress variant="determinate" value="60" />
                            </Box>
                        </div>
                        </Link>
                        );
                    }
                   
                })
            }
               
                
     
   
            </div>
                
         <div className="MobHeader">
            <img src={Logo} alt="" />
        <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />

         </div>
   </section>
  );
}

export default Student;

