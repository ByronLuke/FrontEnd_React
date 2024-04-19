// import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useCallback } from "react";
import friendsService from "../../services/friendsService";
import FriendsCard from "./Friend";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";

function Friends() {
  const [noFriends, showFriends] = useState({ show: true });
  const [arrayOfFriends, setArrayOfFriends] = useState({
    data: [],
    components: [],
  });
  const [searchFriend, setSearchFriend] = useState({ search: "" });

  const [paginationState, setPaginationState] = useState({
    current: 1,
  });

  const onChangePage = (page) => {
    const index = page - 1;
    setPaginationState((previousState) => {
      const newState = { ...previousState };

      newState.current = index;
      return newState;
    });
    friendsService
      .getFriends(index, 2)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  };

  useEffect(() => {
    friendsService
      .getFriends(0, 10)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, []);

  function onGetFriendsSuccess(response) {
    console.log(response, "SUCCESS");
    let dataArray = response.data.item.pagedItems;

    setArrayOfFriends((previousState) => {
      let newState = { ...previousState };

      newState.data = dataArray;
      newState.components = dataArray.map(renderCards);
      return newState;
    });
  }

  function onGetFriendsError(err) {
    console.log(err, "ERROR");
  }

  function renderCards(aFriend) {
    return (
      <FriendsCard
        friend={aFriend}
        key={aFriend.id.value || aFriend.id}
        onFriendClicked={onDeleteRequested}
      />
    );
  }

  const onDeleteRequested = useCallback((friend, e) => {
    console.log(friend.id, { friend, e });
    const idToBeDeleted = friend.id;

    friendsService
      .deleteFriend(idToBeDeleted)
      .then(onDeleteSuccess(idToBeDeleted))
      .catch(onDeleteError);
  }, []);

  function onDeleteSuccess(idToBeDeleted) {
    setArrayOfFriends((previousState) => {
      const filterFriends = previousState.data.filter((friend) => {
        return friend.id !== idToBeDeleted;
      });
      console.log(filterFriends);
      const updatedComponents = filterFriends.map(renderCards);

      return {
        ...previousState,
        data: filterFriends,
        components: updatedComponents,
      };
    });
    console.log(idToBeDeleted);
  }

  function onDeleteError(err) {
    console.log(err);
  }

  function showAllButton() {
    console.log(arrayOfFriends.data);
    if (noFriends.show === false) {
      showFriends((previousState) => {
        let newState = { ...previousState };

        newState.show = true;

        return newState;
      });
    } else {
      showFriends((previousState) => {
        let newState = { ...previousState };

        newState.show = false;

        return newState;
      });
    }
  }

  function searchInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchFriend((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  function searchButton(e) {
    e.preventDefault();
    console.log(searchFriend.search);
    friendsService
      .searchFriends(searchFriend.search)
      .then(onSuccessSearch)
      .catch(onErrorSearch);
  }

  function onSuccessSearch(response) {
    const searchedFriends = response.data?.items;
    console.log(searchedFriends);

    setArrayOfFriends((previousState) => {
      let newState = { ...previousState };

      newState.components = searchedFriends.map(renderCards);
      return newState;
    });
  }

  function onErrorSearch(err) {
    console.log(err);
  }

  const onShowBackAllFriends = () => {
    setArrayOfFriends((previousState) => {
      let newState = { ...previousState };

      newState.components = previousState.data.map(renderCards);
      return newState;
    });

    setSearchFriend("");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <h1
          style={{
            color: "#66d9ff",
            fontFamily: "Times New Roman Times, serif",
            margin: "5px",
            textShadow: "-1px 0 black, 0 1px black",
          }}
        >
          Friends
        </h1>
        <Pagination
          onChange={onChangePage}
          current={paginationState.current}
          total={25}
          locale={locale}
          style={{
            color: "black",
            margin: "5px",
          }}
        />
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={onShowBackAllFriends}
          style={{
            color: "#66d9ff",
            border: "1px solid #66d9ff",
            textShadow: "-1px 0 black, 0 1px black",
          }}
        >
          All Friends
        </button>
        <button
          id="show-friends"
          className="btn btn-dark m-1"
          style={{
            color: "#66d9ff",
            border: "1px solid #66d9ff",
            textShadow: "-1px 0 black, 0 1px black",
          }}
          onClick={showAllButton}
        >
          Show Friends
        </button>
        <Link
          to="/friends/new"
          id="addFriend"
          className="btn btn-dark"
          style={{
            color: "#66d9ff",
            border: "1px solid #66d9ff",
            textShadow: "-1px 0 black, 0 1px black",
          }}
        >
          Add Friend
        </Link>
        <form className="example inline" action="action_page.php">
          <input
            style={{
              color: "#66d9ff",
              border: "1px solid #66d9ff",
              fontSize: "18px",
              height: "37px",
            }}
            className="bg-dark"
            type="text"
            name="search"
            value={searchFriend.search}
            onChange={searchInput}
          />
          <button
            id="search-friends"
            className="btn btn-dark m-1 mb-2"
            style={{
              color: "#66d9ff",
              border: "1px solid #66d9ff",
              textShadow: "-1px 0 black, 0 1px black",
            }}
            onClick={searchButton}
          >
            Search Friends
          </button>
        </form>
        <div className="container">
          <div className="row">
            {!noFriends.show && arrayOfFriends.components}
            {/* {!noShowSearched.show && onSuccessSearch()} */}
          </div>
        </div>
      </div>
      <div className="container"></div>
    </React.Fragment>
  );
}

export default Friends;
