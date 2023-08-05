import Student from "./Pages/Student/Student.js";
import Nav from "./components/nav.js";
import Professor from "./Pages/Professor/Professor.js";
import Class from "./Pages/Professor/Class.js";
import Course from "./Pages/Course/Course.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar.js";

function App() {
 const role = 1;

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Nav/> <SideBar/></>}>
        <Route index element={<Student/>} />
        <Route path="profesor" element={<Professor/>} />
        <Route path="course" element={<Course/>} />
        <Route path="class" element={<Class/>} />
      </Route>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
