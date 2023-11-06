import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";


const AddUser = (props) => {
  const [enteredUername, setEnteredUername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUername.trim().length === 0 || enteredAge.trim().length === 0) {
      return setError({
        title : "Invalid Input",
        message : 'Please enter valid name and age',
      });
    }
    if (+enteredAge < 0) {
      return setError({
        title: "Invalid Age",
        message : 'Please enter valid age (without -)',
      });
    }

    props.onAddUser(enteredUername, enteredAge);
    setEnteredAge("");
    setEnteredUername("");
  };

  const uesrNameChangeHandler = (event) => {
    setEnteredUername(event.target.value);
  };

  const userAgeChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
     
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="uername"
            value={enteredUername}
            onChange={uesrNameChangeHandler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={userAgeChangeHandler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
