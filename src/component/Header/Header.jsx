import React, { useContext, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../images/logo0.png";
import { UserContext } from "../Dataprovide/DataProvider";
import { FiAlignJustify } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Header() {
  const [userData, setUserData] = useContext(UserContext);
  const [bar, setBar] = useState(true);

  function logout() {
    localStorage.removeItem("token");
    setUserData(null);
  }
  const Token = localStorage.getItem("token");

  return (
    <section className="header_section ">
      {/* <div className="header container">
        <div>
          <div className="header_container row ">
            <div className="col text-align-right">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="header_navlist col  mx-auto d-none d-md-block d-lg-block ">
              <div className="d-flex gap-5 justify-content-end align-items-center  ">
                <div className="gap-3  d-flex">
                  <div>Home</div>
                  <div>How it Works</div>
                </div>

                <div className="">
                  <button>
                    <Link
                      className="header_btn_blue"
                      data-panel=".panel-login"
                      to="/login"
                      onClick={logout}>
                      {userData?.data ? `Log Out` : `Sign In`}
                    </Link>
                  </button>
                </div>
              </div>
            </div>

            <div className="col d-block d-md-none ml-5 d-lg-none">
              <div className="header_small  ">
                {bar ? (
                  <FiAlignJustify size={40} color="#FF8B0D" />
                ) : (
                  <ImCross size={40} color="red" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Navbar expand="lg" className="bg-body-tertiary p-4">
        <Container>
          <Navbar.Brand>
            <Link to={Token ? "/" : ""}>
              <img src={logo} alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="ms-auto header_navlist">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>How it Works</Nav.Link>

              <Nav.Link>
                <Link to="/login" onClick={logout} className="header_btn_blue">
                  {userData?.data ? `Log Out` : `Sign In`}
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default Header;
