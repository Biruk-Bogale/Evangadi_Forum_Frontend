import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../component/Dataprovide/DataProvider";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import "./answer.css";
import axiosBase from "../../axiosConfig";
import { FaArrowCircleRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

function Answer() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState({});
  const [answers, setAnswer] = useState([]);
  const answerDom = useRef();
  const token = localStorage.getItem("token");
  // console.log(question, "pppppppp");
  // console.log(answers, "aaaaaa");

  async function getQuestions() {
    try {
      const { data } = await axiosBase.get(`/questions/singleQuestion/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestion(data);

      // console.log(data);
    } catch (error) {}
  }

  async function getAnswer() {
    try {
      const { data } = await axiosBase.get(`/answers/allAnswers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      answerDom.current.value = null;
      setAnswer(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
    getAnswer();
  }, []);

  // useEffect(() => {
  //   if (!userData.user) navigate("/login");
  // }, [userData.user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;

    if (!answerValue) {
      alert("Please provide information");
      return;
    }
    try {
      await axios.post(
        `/answers/postAnswer/${id}`,
        {
          answer: answerValue,
          userid: userData?.user?.id,
          questionid: question?.question?.id, // Fixed typo here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("Thank you for your answer");
      getAnswer();

      // navigate(`/question/${id}`);
    } catch (error) {
      alert("something went wrong!");
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="answer_container">
        <div className="answer_wrapper">
          {question && (
            <div className="answer_fetch">
              <div className="answer_header">
                <span>QUESTION</span>
              </div>
              <div className="answer_question">
                <FaArrowCircleRight color="#516CF0" size={30} />
                <h3>
                  {question.title}
                  <div className="answerline"></div>
                </h3>
              </div>
              <p>{question.description}</p>
            </div>
          )}
          <h1 className="answer_community">Answer From The Community</h1>
          <div className="answer_shadow">
            {answers.length > 0 &&
              answers.map((aList, i) => {
                return (
                  <div >
                    <span className="answer_line"></span>
                    <div className="Answer">
                      <div className="answer_avatar">
                        <div>
                          <BsPersonCircle size={60} color="brown" />
                        </div>
                        {aList?.username}
                      </div>
                      <div>{aList?.answer}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <h6 className="answer_question">Answer The Top Question</h6>
          <div className="answer_headtitle2">
            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  rows={4}
                  className="answer_description"
                  ref={answerDom}
                  type="text"
                  placeholder=" Write Your Answer Here..."
                />
              </div>

              <button
                className="answer_button"
                variant="primary"
                type="submit">
                Post Your Answer
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Answer;
