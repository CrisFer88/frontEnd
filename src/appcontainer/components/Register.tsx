import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const Register = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="container-left">
      <div className="container__login">
        <div className="container__Login--tittle">
          <h3>SING UP</h3>
        </div>
        <form onSubmit={loginSubmit}>
          <div className="fieldform">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Birthday"
            />
          </div>
          {/* <div className="fieldform">
            <input
              // onChange={onLoginInputChange}
              // value={loginEmail}
              className="form-control"
              name="birthDate"
              placeholder="Birthday"
              type="text"
            />
          </div> */}
          <div className="fieldform">
            <input
              // onChange={onLoginInputChange}
              // value={loginEmail}
              className="form-control"
              name="Name"
              placeholder="Name"
              type="text"
            />
          </div>

          <div className="fieldform">
            <input
              // onChange={onLoginInputChange}
              // value={loginEmail}
              className="form-control"
              name="LastName"
              placeholder="Last Name"
              type="text"
            />
          </div>

          <div className="fieldform">
            <input
              // onChange={onLoginInputChange}
              // value={loginEmail}
              className="form-control"
              name="loginEmail"
              placeholder="Email"
              type="email"
              autoComplete="new-email"
            />
          </div>

          <div className="fieldform">
            <input
              // onChange={onLoginInputChange}
              // value={loginPassword}
              className="form-control"
              name="loginPassword"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <div className="fieldform">
            <button className="button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};
