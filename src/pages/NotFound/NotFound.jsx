import React from "react";
import Layout from "../../component/Layout/Layout";
import "./notFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Layout>
      <div className="notFound ">
        <h3>Sorry, the page you are looking for couldn't be found.</h3>
        <br />

        <p>
          {" "}
          Please go back to the <Link className="notFound_toHome" to="/">home page</Link> and try again.
          If it still doesn't work for you, please reach out to our team at
          contact <Link className="toHome_notFound" to="/login">bbuurraa4@kkk.com.</Link>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
