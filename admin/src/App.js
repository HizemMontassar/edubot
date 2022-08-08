import React from "react";
import "./App.css";
import Navbar from "../src/layout/Navbar";
import Sidebar from "../src/layout/Sidebar";
import Statistics from "../src/layout/Statistics";
import Users from "../src/layout/Users";
import DisplayUser from "../src/layout/UsersModule/Affichageuser";
import Login from "../src/layout/UsersModule/Login";
import ListJobs from "../src/layout/Jobs/ListJobs";
import ListMarks from "../src/layout/Quizzes/Marks";
import Adduser from "../src/layout/UsersModule/AddUsers";
import ListCat from '../src/layout/Category/ListCat';
import ListSub from '../src/layout/Category/ListSub';
import AddCat from '../src/layout/Category/AddCat';
import AddSub from '../src/layout/Category/AddSub';
import ListCourses from '../src/layout/Courses/ListCourses';
import EditCat from './layout/Category/EditCat';
import EditSub from './layout/Category/EditSub';
import EventsList from "../src/layout/EventsModule/ListEvents";
import AddQuiz from '../src/layout/QuizzesManagement/AddQuiz';
import ListQuiz from '../src/layout/QuizzesManagement/ListQuiz';
import ModifyQuiz from '../src/layout/QuizzesManagement/ModifyQuiz';
import AddQuestion from '../src/layout/QuestionManagement/AddQuestion';
import ListQuestion from '../src/layout/QuestionManagement/ListQuestion';
import ModifyQuestion from '../src/layout/QuestionManagement/ModifyQuestion';
import ChartQuiz from '../src/layout/QuizzesManagement/StatQuiz';
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Chartcourse from "./layout/Courses/ChartCourse";
import QuizzesShow from '../src/layout/Category/QuizzesShow';
import QuestionsShow from '../src/layout/Category/QuestionsShow';
import Charts from '../src/layout/Charts';
function App() {
  return (
    <div className="App">
      <> </>
      <div class="wrapper">
      
        {/* <Navbar></Navbar> */}
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        
        <BrowserRouter basename="/admindashboard">
          <Route exact path="/users" render={(props) => <Users {...props} />}></Route>
          <Route path="/login" render={(props) => <Login {...props} />}></Route>
          <Route
            path="/displayuser"
            render={(props) => <DisplayUser {...props} />}
          ></Route>
          <Route
            path="/adduser"
            render={(props) => <Adduser {...props} />}
          ></Route>
          <Route
            path="/jobslist"
            render={(props) => <ListJobs {...props} />}
          ></Route>
          <Route
            path="/markslist"
            render={(props) => <ListMarks {...props} />}
          ></Route>
          <Route
            path="/ListCat"
            render={(props) => <ListCat {...props} />}
          ></Route>
          <Route
            path="/ListSub"
            render={(props) => <ListSub {...props} />}
          ></Route>
          <Route
            path="/AddCat"
            render={(props) => <AddCat {...props} />}
          ></Route>
          <Route
            path="/AddSub"
            render={(props) => <AddSub {...props} />}
          ></Route>
          <Route
            path="/ListCourses"
            render={(props) => <ListCourses {...props} />}
          ></Route>
          <Route
            path="/edit/:id"
            render={(props) => <EditCat {...props} />}
          ></Route>
          <Route
            path="/editsub/:id"
            render={(props) => <EditSub {...props} />}
          ></Route>
          <Route
            path="/eventslist"
            render={(props) => <EventsList {...props} />}
          ></Route>
           <Route
  path="/addquiz"
  render={(props) => <AddQuiz {...props} />} >
   </Route>
   <Route
  path="/listquiz"
  render={(props) => <ListQuiz {...props} />} >
   </Route>
   <Route
  path="/modifyquiz/:id"
  render={(props) => <ModifyQuiz {...props} />} >
   </Route>
   <Route
  path="/addquestion"
  render={(props) => <AddQuestion {...props} />} >
   </Route>
   <Route
  path="/listquestions"
  render={(props) => <ListQuestion {...props} />} >
   </Route>
   <Route
  path="/modifyquestion/:id"
  render={(props) => <ModifyQuestion {...props} />} >
   </Route>
   <Route
  path="/chartCourse"
  render={(props) => <Chartcourse {...props} />} >
   </Route>
   <Route
  path="/showquizzes/:id"
  render={(props) => <QuizzesShow {...props} />} >
   </Route>
   <Route
  path="/showquestion/:id"
  render={(props) => <QuestionsShow {...props} />} >
   </Route>
   <Route
  path="/ChartQuiz"
  render={(props) => <ChartQuiz {...props} />} >
   </Route>
   <Route
  path="/Chart"
  render={(props) => <Charts {...props} />} >
   </Route>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
