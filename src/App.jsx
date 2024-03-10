import React, { useContext, useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovide/DataProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import axios from "./axiosConfig";
import Question from "./pages/Question/Question";
// import Register from "./pages/Register/Register";
import Answer from "./pages/Answer/Answer";
import axiosBase from "./axiosConfig";
import NotFound from "./pages/NotFound/NotFound";

export const AppState = createContext();

function App() {
  const [userData, setUserData] = useContext(UserContext);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();


  // console.log(user);
  // console.log(token);
  // const checkUser = async () => {
  //   if (token === null || token === "") {
  //     localStorage.setItem("token", "");
  //     token = "";
  //   } else {
  //     const userRes = await axios.get("/users/check", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     setUserData({
  //       token,
  //       user: {
  //         id: userRes.data.userid,
  //         display_name: userRes.data.username,
  //       },
  //       config: {
  //         headers: { Authorization: "Bearer " + token },
  //       },
  //     });
  //   }
  // };

  const checkUser2 = async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // setUserData({ data });
      setUserData({ data });
      // console.log(data);
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };

  // console.log(userData.user.display_name.length ,"kkkk")
  useEffect(() => {
    checkUser2();
  }, []);


  return (
    <AppState.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/:id" element={<Answer />} />
        <Route
          path="*"
          element={
           
            <NotFound/>
          }
        />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
