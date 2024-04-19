import React, { useState, useEffect } from "react";
import "./App.css";
import Events from "./components/events/Events";
import Friends from "./components/friends/Friends";
import Jobs from "./components/jobs/Jobs";
import Companies from "./components/techCompanies/Companies";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Footer from "./components/Footer";
import Home from "./components/Home";
import TestAndAjax from "./components/TestAndAjax";
import SiteNav from "./components/SiteNav";
import FriendForm from "./components/friends/FriendForm";
import { Routes, Route } from "react-router-dom";
import PoliticalCandidates from "./components/codeChallenge/PoliticalCandidates";
import Assessment from "./components/friends/Assessment";
import usersService from "./services/usersService";
import { useNavigate } from "react-router-dom";
import Recipes from "./components/Recipes";
import Cars from "./components/codeChallenge/Cars";
import Interview from "./components/codeChallenge/Interview";
import InterviewPrep from "./components/InterviewPrep";
import debug from "sabio-debug";
import Basic from "./components/Basic";

function App() {
  const _logger = debug.extend("App");

  const [user, setUser] = useState({
    firstName: "Unknown",
    lastName: "User",
    isLoggedIn: false,
  });

  useEffect(() => {
    usersService.current().then(getCurrentSuccess).catch(getCurrentError);
  }, [user.isLoggedIn]);

  function getCurrentSuccess(response) {
    _logger(response.data.item.id);
    usersService
      .getById(response.data.item.id)
      .then(getByIdSuccess)
      .catch(getByIdError);
  }

  function getByIdSuccess(response) {
    console.log(response.data.item);
    const data = response.data.item;
    setUser((prev) => {
      const newState = { ...prev };

      newState.firstName = data.firstName;
      newState.lastName = data.lastName;
      newState.avatarUrl = data.avatarUrl;
      newState.email = data.email;

      return newState;
    });
  }

  function getByIdError(err) {
    _logger(err);
  }
  const navigate = useNavigate();

  function getCurrentError(err) {
    _logger(err);
    navigate("/login");
  }

  return (
    <React.Fragment>
      <SiteNav user={user} isLogIn={setUser} />
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home user={user} />}></Route>
          <Route path="/login" element={<Login isLogIn={setUser} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/test" element={<TestAndAjax />}></Route>
          <Route path="/friends/new" element={<FriendForm />}></Route>
          <Route path="/friend/:id" element={<FriendForm />}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/cars" element={<Cars />}></Route>
          <Route path="/interview" element={<Interview />}></Route>
          <Route path="/interviewPrep" element={<InterviewPrep />}></Route>
          <Route
            path="/politicalcandidates"
            element={<PoliticalCandidates />}
          ></Route>
          <Route path="/assessment" element={<Assessment />}></Route>
          <Route path="/formik" element={<Basic />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
