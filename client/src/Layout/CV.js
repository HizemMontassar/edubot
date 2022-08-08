import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

function CV() {
  const [currentUser, setCurrentUser] = useState("");
  var local = localStorage.getItem("Data");
  if (local !== "undefined" && local !== null) {
    const decode = jwt_decode(local);
    var id = decode._id;
  } else {
    //  history.push("/");
    console.log("mat3adash");
    //history.push('/')
  }
  const userdata = async () => {
    const response = await Axios.get(
      `/user/displayProfile/${id}/`
    );
    setCurrentUser(response.data);
    console.log(response);
    console.log("user inside", currentUser);
  };
  useEffect(() => {
    userdata();
    console.log("User", currentUser);
  }, []);

  return (
    <>
      <div id="page-wrap">
        <img src="../images/avatar/3.jpg" alt="user's photo" id="pic" />

        <div id="contact-info" class="vcard">
          <h1 class="fn">
            {currentUser.firstname} {currentUser.lastname}
          </h1>

          <p>
            <br />
            Email:
            <a class="email" href={"mailto:" + currentUser.email}>
              {currentUser.email}
            </a>
          </p>
        </div>
        <div class="clear"></div>
        <dl>
          <dd class="clear"></dd>

          <dt>Education</dt>
          <dd>
            <ul>
              {currentUser &&
                currentUser.education.map((val, key) => {
                  return <li>{val}</li>;
                })}
            </ul>
          </dd>

          <dd class="clear"></dd>

          <dt>Skills</dt>
          <dd>
            <ul>
              {currentUser &&
                currentUser.aquiredskills.map((val, key) => {
                  return <li>{val}</li>;
                })}
              {currentUser &&
                currentUser.newskills.map((val, key) => {
                  return <li>{val}</li>;
                })}
            </ul>
          </dd>

          <dd class="clear"></dd>

          <dt>Experience</dt>
          <dd>
            <ul>
              {currentUser &&
                currentUser.experience.map((val, key) => {
                  return <li>{val}</li>;
                })}
            </ul>
          </dd>

          <dd class="clear"></dd>

          <dt>Hobbies</dt>
          <dd>
            <ul>
              {currentUser &&
                currentUser.hobbies.map((val, key) => {
                  return <li>{val}</li>;
                })}
            </ul>
          </dd>

          <dd class="clear"></dd>
          <dd class="clear"></dd>
        </dl>

        <div class="clear"></div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * { margin: 0; padding: 0; }
        body { font: 16px Helvetica, Sans-Serif; line-height: 24px; background: url(images/noise.jpg); }
        .clear { clear: both; }
        #page-wrap { width: 800px; margin: 40px auto 60px; }
        #pic { float: right; margin: -30px 0 0 0; }
        h1 { margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999; }
        h2 { font-size: 20px; margin: 0 0 6px 0; position: relative; }
        h2 span { position: absolute; bottom: 0; right: 0; font-style: italic; font-family: Georgia, Serif; font-size: 16px; color: #999; font-weight: normal; }
        p { margin: 0 0 16px 0; }
        a { color: #999; text-decoration: none; border-bottom: 1px dotted #999; }
        a:hover { border-bottom-style: solid; color: black; }
        ul { margin: 0 0 32px 17px; }
        #objective { width: 500px; float: left; }
        #objective p { font-family: Georgia, Serif; font-style: italic; color: #666; }
        dt { font-style: italic; font-weight: bold; font-size: 18px; text-align: right; padding: 0 26px 0 0; width: 150px; float: left; height: 100px; border-right: 1px solid #999;  }
        dd { width: 600px; float: right; }
        dd.clear { float: none; margin: 0; height: 15px; }        `,
        }}
      />
    </>
  );
}
export default CV;
