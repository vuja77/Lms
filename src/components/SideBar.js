import "./SideBar.scss";
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Matematika from "./img/matematika.png";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function SideBar(props) {
  const location = useLocation();
  let fullDesc = null;
  useEffect(() => {
    if(location.pathname === "/course" && props.description) {
      fullDesc = props.description.slice(0, 100);
    }
  })

  return (
    <section className="SideBar">

      {
        location.pathname === "/course" ? <>

          <div className="About">
            <h3>Opis</h3>
            <p>
              {props.description}
            </p>
          </div>
          <hr />
          <div className="Professor">
            <h3>Profesor</h3>
            <Link to="/profile">
              <div>
                <img src={require("./img/user.jpg")} width="50px" alt="" />
                <h4>{props.professor}</h4>
              </div>
            </Link> 

          </div>
          <hr />
          <div className="Count">
            <div>
              <h4>32</h4>
              <p>Ucenici</p>
            </div>
            <div>
              <h4>{props.lessons}</h4>
              <p>Lekcije</p>
            </div>
          </div>
          <div className="Skills">
            <h3>Skills</h3>
          <div className="helper">
           <div className="skill">Html</div>
            <div className="skill">Html</div>
            <div className="skill">Html</div>
            <div className="skill">Html</div>
          </div>
            
            
          </div>
        </> : <>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar defaultValue={dayjs('2023-08-17')} />
          </LocalizationProvider>
          {
            props.role === 2
              ? null
              : <div className="UpcomingExam">
                <h3>Predstojeći ispiti</h3>
                <div className="ExamNotfi">
                  <img src={Matematika} alt="" />
                  <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                  </div>
                </div>
                <div className="ExamNotfi">
                  <img src={Matematika} alt="" />
                  <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                  </div>
                </div>
              </div>

          }
        </>
      }

    </section>
  );
}

export default SideBar;
