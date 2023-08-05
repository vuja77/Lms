import "./SideBar.scss";
import * as React from 'react'; 
import { useContext } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import UserPhoto from "./img/user-photo.png";
import Matematika from "./img/matematika.png";

import dayjs from 'dayjs';
function SideBar() {

  return (
   <section className="SideBar">
    <div className="UserLabel">
       <img src={UserPhoto} alt="" />
    </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar value={dayjs('2023-04-17')}  defaultValue={dayjs('2023-08-17')}/>
        </LocalizationProvider>
        <div className="UpcomingExam">
          <h3>Predstojeći ispiti</h3>
            <div className="ExamNotfi">
              <img src={Matematika}alt="" />
                <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                </div>
            </div>
            <div className="ExamNotfi">
              <img src={Matematika}alt="" />
                <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                </div>
            </div>
        </div>
   </section>
  );
}

export default SideBar;
