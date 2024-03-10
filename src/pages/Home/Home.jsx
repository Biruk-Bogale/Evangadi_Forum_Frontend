import React from "react";
import { useContext, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "../Questionlist/QuestionList";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axiosBase from "../../axiosConfig";
import { AppState } from "../../App";

function Home() {
  const [userData] = useContext(UserContext);

  const navigate = useNavigate();
  // const isLoggedIn = userData?.user;
  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/login");
  // }, [isLoggedIn]);
  const Token = localStorage.getItem("token");

  // async function userName() {
  //   try {
  //     const name = await axiosBase.get("/users/check");
  //     console.log(name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   userName();
  // }, []);
  useEffect(() => {
    function x() {
      window.location.reload();
    }
    // x();
  }, []);

  return (
    <Layout>
      <div className="home">
        <div className="home_ask_wrapper">
          <div>
            <Link to={"/question"}>
              <button>Ask Question</button>
            </Link>
          </div>

          <h3 className="home_welcome_username">
            Welcome: {userData?.data?.username}
            <div></div>
          </h3>
        </div>
        <div className="home_question_header">
          {/* <h2>Questions</h2> */}
          {/* <hr /> */}
        </div>
        <QuestionList />
      </div>
    </Layout>
  );
}

export default Home;
