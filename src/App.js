import Student from "./Pages/Student/Student.js";
import Nav from "./components/nav.js";
import Professor from "./Pages/Professor/Professor.js";
import Profile from "./Pages/Profile/Profile.js";
import Course from "./Pages/Course/Course.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar.js";
import { useEffect, useState } from "react";
import Config from "./Config.js";
function App() {
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token*\=\s*([^;]*).*$)|^.*$/, "$1");
  const [userMail, setMail] = useState();
  const [userName, setName] = useState();
  const [userRole, setRole] = useState();
  const [userID, setID] = useState();
  const [userClass, setClass] = useState();


  useEffect(() => {
    const fetchApiData = async () => {
      await fetch(Config.apiUrl + "/details", {
        headers: {
          Authorization: `Bearer ${cookieValue}`
        }
      })
        .then((response) => response.json())
        .then((UserResp) => {
          setName(UserResp.success.first_name + " " + UserResp.success.last_name)
          setMail(UserResp.success.mail);

          setClass(UserResp.success.class_id)
          setRole(UserResp.success.role_id)
          setID(UserResp.success.id)
        })
    }
    //redirect if not login
    if (cookieValue !== "") {
      fetchApiData();
    } else {
      window.history.back();
    }
  }, [0])

  return (
    <>

      <BrowserRouter basename={Config.basename}>
        <Routes>
          <Route path="/" element={<><Nav data={userName} /> <SideBar /></>}>
            <Route index element={userRole === 1 ? <Student data1={userClass} /> : userRole === 2 ? <Professor data={userID} /> : ""} />
            <Route path="profesor" element={<Professor />} />
            <Route path="calendar" element={""} />
            <Route path="courses" element={""} />
            <Route path="setting" element={""} />
            <Route path="course" element={<Course role={userRole} id={userID} />} />
            <Route path="profile" element={<Profile role={userRole} data={userName} mail={userMail} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
