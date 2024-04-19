import React from "react";
import { useNavigate } from "react-router-dom";

function FriendsCard(props) {
  function deleteButton(e) {
    e.preventDefault();
    console.log(e);
    props.onFriendClicked(props.friend, e);
  }

  const aFriend = props.friend;

  const navigate = useNavigate();
  const onUpdateClicked = (e) => {
    e.preventDefault();
    navigateToFormPage(aFriend);
  };

  function navigateToFormPage(friend) {
    console.log(friend);

    const state = { type: "FRIEND_TO_UPDATE", payload: friend };
    navigate(`/friend/${friend.id}`, { state });
  }

  return (
    <React.Fragment>
      <div
        key={aFriend.id}
        className="card col-3 m-3"
        style={{
          width: "400px",
          border: "1px solid ghostwhite",
          backgroundColor: "#36454f",
          maxHeight: "600px",
          alignContent: "center",
        }}
      >
        <img
          className="card-img-top"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            marginTop: "12px",
            border: "1px solid ghostwhite",
          }}
          key="card-image"
          src={aFriend.primaryImage.imageUrl}
          alt=""
        />

        <div
          className="card-body text-center"
          style={{
            fontFamily: "Times New Roman Times, serif",
            color: "ghostwhite",
            textShadow: "-1px 0 black, 0 1px black",
          }}
        >
          <h2 className="title">{aFriend.title}</h2>

          <h4 className="summary">{aFriend.summary}</h4>

          <p className="headline d-none">{aFriend.headline}</p>

          <p className="bio d-none">{aFriend.bio}</p>
          <p className="slug d-none">{aFriend.slug}</p>
        </div>

        <div className="card-footer text-center card-buttons">
          <button
            className="btn btn-dark"
            key="update"
            // to={`/friend/${aFriend.id}`}
            onClick={onUpdateClicked}
            style={{
              color: "#66d9ff",
              fontFamily: "Times New Roman Times, serif",
              border: "1px solid #66d9ff",
              width: "100px",
              fontSize: "18px",
              textShadow: "-1px 0 black, 0 1px black",
            }}
          >
            Update
          </button>
          <button
            className="btn btn-dark m-1"
            key="delete"
            id={aFriend.id}
            style={{
              color: "#66d9ff",
              fontFamily: "Times New Roman Times, serif",
              border: "1px solid #66d9ff",
              width: "100px",
              fontSize: "18px",
            }}
            onClick={deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendsCard;
