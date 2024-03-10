import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import "./questionlist.css";
import { Link, useNavigate } from "react-router-dom";

function QuestionList() {
  const [question, setQuestions] = useState([null]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // console.log(question);
  console.log(search);

  // console.log(userData, "llll");

  function handleClick(questionid) {
    navigate(`/question/${questionid}`);
  }

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/allQuestion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response && error?.response?.status === 401) {
        setIsLoggedIn(false);
        setError("Unauthorized access. Please log in.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
    // Simulate user login
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return null; // or redirect to login page
  }

  return (
    <div>
      {question.length == null ? (
        <p className={"question_list_noQ"}> No Question Posted</p>
      ) : (
        <div>
          <form
            className={"question_list_search"}
            onChange={(e) => setSearch(e.target.value)}>
            <input
              placeholder="search question
"
            />
            <hr className="question_list1" />
          </form>

          <div>
            {question
              ?.filter((question) => {
                return (search.toLowerCase() || search.toUpperCase()) === ""
                  ? "question"
                  : question?.title.toLowerCase().includes(search) ||
                      question?.title.toUpperCase().includes(search);
              })
              ?.map((question, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(question.id)}
                  className="question_list1">
                  <div key={question?.id} className={"question_list"}>
                    <div>
                      <BsPersonCircle size={60} color="#1B92BC" />
                      <h5>{question?.username}</h5>
                    </div>

                    <div>
                      {/* <Link to={"/answers"}> */}
                      <p> {question?.title}</p>
                      {/* <p> {question?.description}</p> */}
                      {/* </Link> */}
                    </div>
                    <div className={"question_list_arrow"}>
                      {<IoIosArrowForward />}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
