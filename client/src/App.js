import "./App.css";
import Calendaruser from "./Views/Calendaruser";
import Discusion from "./Views/Discusion";
import Profileuser from "./Views/Profileuser";
import Notfound from "./Views/Notfound";
import ChartQuiz from "./Layout/ChartQuiz";
import ChartQuizUser from "./Layout/ChartQuizUser";
import Course from "./Views/Course";
import TimeLine from "./Views/TimeLine";
import Chartcourse from "./Views/Chart";

import CV from "./Layout/CV";
import Login from "./Layout/Login";
import Register from "./Layout/Register";
import Navleft from "./Layout/Navleft";
import Footer from "./Layout/Footer";
import Navhaut from "./Layout/Navhaut";
import Charts from "./Views/Charts";
import Info from "./Views/Infos";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-197455929-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
      <div className="App">
        <div class="wrapper">
          <BrowserRouter basename="/">
            <Switch>
              <Route
                exact
                path="/register"
                render={(props) => <Register {...props} />}
              ></Route>
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} />}
              ></Route>
              <Route
                exact
                path="/calendar"
                render={(props) => <Calendaruser {...props} />}
              ></Route>
              <Route
                exact
                path="/"
                render={(props) => <Discusion {...props} />}
              ></Route>
              <Route
                exact
                path="/profile"
                render={(props) => <Profileuser {...props} />}
              ></Route>
              <Route
                exact
                path="/chartQuiz"
                render={(props) => <ChartQuiz {...props} />}
              ></Route>
              <Route
                exact
                path="/course"
                render={(props) => <Course {...props} />}
              ></Route>
              <Route
                exact
                path="/timeline/:id"
                render={(props) => <TimeLine {...props} />}
              ></Route>
              <Route
                exact
                path="/cv"
                render={(props) => <CV {...props} />}
              ></Route>

              <Route
                exact
                path="/Charts"
                render={(props) => <Charts {...props} />}
              ></Route>
              <Route
                exact
                path="/Info/:id"
                render={(props) => <Info {...props} />}
              ></Route>
              <Route
                path="/chartCourse"
                render={(props) => <Chartcourse {...props} />}
              ></Route>
              <Route
                exact
                path="/chartQuizuser/:id"
                render={(props) => <ChartQuizUser {...props} />}
              ></Route>
              <Route exact render={(props) => <Notfound {...props} />}></Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
