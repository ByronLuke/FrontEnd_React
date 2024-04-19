import { React, useState } from "react";

function FormExample() {
  const [formInput, setFormInput] = useState({
    text1: "",
    text2: "",
    text3: "",
    select: "",
    imageUrl: "",
  });

  function onFormChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    return setFormInput((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  function submitForm(e) {
    e.preventDefault();
    //api.then().success(onSuccess).catch(onError)
    //if payload it should be in formInput
    //in the
  }

  return (
    <React.Fragment>
      <div className="container">
        <form>
          <div>
            <div className="form-group">
              <label
                htmlFor="text1"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Text 1
              </label>
              <input
                type="text"
                className="form-control"
                id="text1"
                name="text1"
                value={formInput.text1}
                onChange={onFormChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="text2"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Text 2
              </label>
              <input
                type="text"
                className="form-control"
                id="text2"
                name="text2"
                value={formInput.text2}
                onChange={onFormChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="text3"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Text 3
              </label>
              <input
                type="text3"
                className="form-control"
                id="text3"
                name="text3"
                value={formInput.text3}
                onChange={onFormChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="select"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Select
              </label>
              <select
                className="m-2"
                id="select"
                name="select"
                value={formInput.select}
                onChange={onFormChange}
              >
                <option value={formInput.select}></option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="imageUrl"
                style={{
                  color: "#66d9ff",
                  fontFamily: "Times New Roman Times, serif",
                  fontSize: "19px",
                  textShadow: "-1px black, 1px black",
                }}
              >
                Image Url
              </label>
              <input
                type="imageUrl"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                value={formInput.imageUrl}
                onChange={onFormChange}
              />
            </div>
            <button
              type="submit"
              id="submit"
              onClick={submitForm}
              className="btn btn-dark mt-2"
              style={{
                color: "#66d9ff",
                fontFamily: "Times New Roman Times, serif",
                border: "1px solid #66d9ff",
                width: "180px",
                fontSize: "19px",
                textShadow: "-1px 0 black, 0 1px black",
              }}
            >
              Submit
            </button>
            <button
              type="submit"
              id="clearForm"
              onClick
              className="btn btn-dark mt-2"
              style={{
                color: "#66d9ff",
                fontFamily: "Times New Roman Times, serif",
                border: "1px solid #66d9ff",
                width: "180px",
                fontSize: "19px",
                textShadow: "-1px 0 black, 0 1px black",
              }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default FormExample;
