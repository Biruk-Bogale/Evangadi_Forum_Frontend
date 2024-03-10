import { useContext, useEffect, useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import "./login.css";
import "./register.css";
import { UserContext } from "../../component/Dataprovide/DataProvider";

function login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDomR = useRef();
  const passwordDomR = useRef();
  const [showHide, setShowHide] = useState(true);
  const [Rcheck, setRcheck] = useState(false);
  const [check, setCheck] = useState(false);

  // const [userData, setUserData] = useContext(UserContext);
  // useEffect(() => {
  //   function logout() {
  //     localStorage.removeItem("token");
  //   }
  //   logout();
  // }, []);

  const border = () => {
    emailDom.current.style.border = "  1px solid #999";
    passwordDom.current.style.border = "  1px solid #999";
    usernameDom.current.style.border = "  1px solid #999";
    firstnameDom.current.style.border = "  1px solid #999";
    lastnameDom.current.style.border = "  1px solid #999";
    emailDomR.current.style.border = "  1px solid #999";
    passwordDomR.current.style.border = "  1px solid #999";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      // Email provided doesn't have an account
      setCheck(!check);
    }

    const value = [emailValue, passValue];
    const dom = [emailDom, passwordDom];
    function bg(value, dom) {
      for (let i = 0; i < value.length; i++) {
        if (!value[i]) {
          dom[i].current.style.border = "#f7171785 1px solid";
          return;
        }
      }
      return;
    }
    bg(value, dom);

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      localStorage.setItem("token", data.token);

      navigate("/");

      if (data) {
        window.location.reload();
      }
      // console.log(data.token, "hhhhhhh");
      // alert("login successfull.");
    } catch (error) {
      // alert(error?.response?.data.msg);
      setCheck(!check);
      setTimeout(() => {
        setCheck(check);
      }, 5000);
      // console.log(error.response.data);
    }
  }

  async function handleSubmitR(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDomR.current.value;
    const passValue = passwordDomR.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      // alert("Please provide all required informationkkkk");
      setRcheck(!Rcheck);
      setTimeout(() => {
        setRcheck(Rcheck);
      }, 5000);

      const value = [
        usernameValue,
        firstValue,
        lastValue,
        emailValue,
        passValue,
      ];
      const dom = [
        usernameDom,
        firstnameDom,
        lastnameDom,
        emailDomR,
        passwordDomR,
      ];
      function bg(value, dom) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i]) {
            dom[i].current.style.border = "#f7171785 1px solid";
            return;
          }
        }
        return;
      }
      bg(value, dom);

      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      // alert("register successfull. please login");
      // navigate("/login");
      setTimeout(() => {
        handleRegisterClick();
      });
    } catch (error) {
      // alert("something went wrong!");
      console.log(error.response);
      setRcheck(!Rcheck);
      setTimeout(() => {
        setRcheck(Rcheck);
      }, 500);
    }
  }

  const loginRef = useRef();

  const handleSRInClick = () => {
    setShowHide(!showHide);
  };

  const handleRegisterClick = () => {
    setShowHide(!showHide);
  };

  return (
    <Layout>
      <div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="login_full_container">
        <div className=" container">
          <div className="row  login_container  flex-row ">
            <div className="col-sm-12  d-flex col-md-6">
              <div className="login_box pt-4 align-items-center">
                <div>
                  <div className="login_width">
                    {/* login */}

                    {showHide ? (
                      <div className="login">
                        <div className={"login_invalid_wrap"}>
                          {check ? (
                            <div className={"login_invalid"}>
                              invalid credential!
                            </div>
                          ) : null}
                        </div>

                        <h3 className="login_title ">Login to your account</h3>

                        <div className={"login_new d-flex"}>
                          <div className="mx-auto">Don't have an account?</div>
                          <div
                            className="mx-auto"
                            onClick={handleSRInClick}
                            style={{
                              color: "#F04400",
                              cursor: "pointer",
                            }}>
                            Create a new account
                          </div>
                        </div>

                        <form
                          onSubmit={handleSubmit}
                          className={"login_form_input"}>
                          <div>
                            <input
                              className={"login_email"}
                              ref={emailDom}
                              type="email"
                              name="email"
                              placeholder="Enter Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={border}
                            />
                          </div>
                          <br />

                          <div>
                            <input
                              className={"login_password"}
                              ref={passwordDom}
                              type="password"
                              name="passWord"
                              placeholder="Enter Your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onFocus={border}
                            />
                            <br />
                          </div>
                          <button type="submit">Login</button>
                        </form>
                      </div>
                    ) : (
                      <div id="register" className="">
                        <div className="login_invalid_wrap">
                          {Rcheck ? (
                            <div className={"login_invalid"}>
                              Please provide all required information
                            </div>
                          ) : null}
                        </div>
                        <h1 className="register_login_title">
                          Join the network
                        </h1>
                        <div>
                          <div className=" d-flex mx-auto">
                            Already have an account?
                            <div
                              className=""
                              onClick={handleSRInClick}
                              style={{
                                paddingLeft: "3px",
                                color: "#F04400",
                                cursor: "pointer",
                              }}>
                              Sign in
                            </div>
                          </div>
                        </div>

                        <form
                          onSubmit={handleSubmitR}
                          className="register_login_form_input">
                          <div>
                            <div>
                              <input
                                className="register_user"
                                ref={usernameDom}
                                type="text"
                                placeholder="userName"
                                onFocus={border}
                              />
                            </div>
                            <br />
                            <div className="register_first_last gap-2">
                              <div>
                                <input
                                  className="register_first"
                                  ref={firstnameDom}
                                  type="text"
                                  placeholder="First Name"
                                  onFocus={border}
                                />
                              </div>

                              <div>
                                <input
                                  className="register_last"
                                  ref={lastnameDom}
                                  type="text"
                                  placeholder="Last Name"
                                  onFocus={border}
                                />
                              </div>
                            </div>

                            <br />
                            <div>
                              <input
                                className="register_email"
                                ref={emailDomR}
                                type="email"
                                placeholder="email"
                                onFocus={border}
                              />
                            </div>
                            <br />
                            <div>
                              <input
                                className="register_password"
                                ref={passwordDomR}
                                type="password"
                                placeholder="passWord"
                                onFocus={border}
                              />
                            </div>
                            <br />
                            <small>
                              I agree to the <Link> privacy policy</Link>
                              <span>and</span> <Link>terms of service.</Link>
                            </small>
                            <button type="submit">Agree and Join</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 d-none d-md-block d-lg-block  col-md-6">
              <div className="Evangadi_description ">
                <div className="padd-text fadeInLeft">
                  <div
                    style={{
                      color: "#FE8303",
                    }}>
                    About
                  </div>

                  <h2 className={"title_ev"}>Evangadi Networks</h2>
                  <p>
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </p>
                  <p className="font-p mg-bt-30">
                    Weather you are willing to share your knowledge or you are
                    just looking to meet mentors of your own, please start by
                    joining the network here.
                  </p>
                  <div className={"login_btn"}>
                    <div
                      onClick={() =>
                        showHide == true
                          ? setShowHide(!showHide)
                          : setShowHide(showHide)
                      }>
                      CREATE A NEW ACCOUNT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default login;
