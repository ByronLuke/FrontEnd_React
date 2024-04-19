import React, { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";

function FriendForm() {
  const { state } = useLocation();
  console.log(state, "STATE FROM UPDATE");

  const [formData, setFormData] = useState({
    statusId: "Active",
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    primaryImage: "",
  });

  function handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;
    //same as const name = e.target.name & as const value = e.target.value
    return setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  function submitFriend(e) {
    e.preventDefault();
    if (state && state.payload) {
      const id = state.payload.id;
      const payload = { ...formData };

      friendsService
        .updateFriend(id, payload)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      const payload = formData;
      friendsService
        .addFriend(payload)
        .then(addFriendSuccess)
        .catch(addFriendError);
    }
  }

  function addFriendSuccess(response) {
    console.log(response);
    toastr.success("Added! \n Add a new friend or check Friend Tab", {
      timeOut: 1500,
    });
    setFormData({
      statusId: "Active",
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      primaryImage: "",
    });
  }

  function addFriendError(err) {
    toastr.error("Something is wrong with that friend...", { timeOut: 1500 });
    console.log(err);
  }

  function onUpdateSuccess(response) {
    console.log(response);
  }

  function onUpdateError(err) {
    console.log(err);
  }

  useEffect(() => {
    if (state) {
      setFormData((previousState) => {
        return {
          ...previousState,
          id: state.payload.id,
          title: state.payload.title,
          bio: state.payload.bio,
          summary: state.payload.summary,
          headline: state.payload.headline,
          slug: state.payload.slug,
          primaryImage: state.payload.primaryUrl,
        };
      });
    }
  }, [state]);

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#36454f",
        }}
        className="container formContainer border  mt-3 p-3 h-25"
      >
        <div id="formData" className="row">
          <form className="row g-3 m-1">
            <h1
              style={{
                color: "#66d9ff",
                fontFamily: "Times New Roman Times, serif",
                margin: "5px",
                textShadow: "-1px 0 black, 0 1px black",
              }}
            >
              Add Your New Friends
            </h1>
            <div className="col-md-6">
              <label
                for="title"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Title
              </label>
              <input
                style={{ border: "2px solid #66d9ff" }}
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label
                for="slug"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Slug
              </label>
              <input
                type="text"
                className="form-control"
                id="slug"
                style={{ border: "2px solid #66d9ff" }}
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label
                for="headline"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Headline
              </label>
              <input
                type="text"
                className="form-control"
                id="headline"
                style={{ border: "2px solid #66d9ff" }}
                name="headline"
                value={formData.headline}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label
                for="bio"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Bio
              </label>
              <input
                type="text"
                className="form-control"
                id="bio"
                placeholder=""
                style={{ border: "2px solid #66d9ff" }}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label
                for="summary"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Summary
              </label>
              <input
                type="text"
                className="form-control"
                id="summary"
                style={{ border: "2px solid #66d9ff" }}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 d-none">
              <label
                for="statusId"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Status
              </label>
              <input
                type="text"
                className="form-control"
                id="statusId"
                style={{ border: "2px solid #66d9ff" }}
                name="statusId"
                value={formData.statusId}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label
                for="primaryImage"
                className="form-label"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Primary Image
              </label>
              <input
                type="text"
                className="form-control"
                id="primaryImage"
                style={{ border: "2px solid #66d9ff" }}
                name="primaryImage"
                value={formData.primaryImage}
                onChange={handleChange}
              />
            </div>
          </form>
          <div>
            <button
              id="submit"
              type="submit"
              className="btn btn-dark"
              style={{
                color: "#66d9ff",
                fontFamily: "Times New Roman Times, serif",
                border: "1px solid #66d9ff",
                width: "160px",
                fontSize: "19px",
                textShadow: "-1px 0 black, 0 1px black",
                marginLeft: "8px",
                marginTop: "5px",
              }}
              onClick={submitFriend}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {addFriendSuccess}
    </React.Fragment>
  );
}

export default FriendForm;
