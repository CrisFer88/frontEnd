import React from "react";

const AllColorAssignment = () => {
  return (
    <div className="SVcontainer__center--col">
      <div className="SVcontainer__title">
        <h3> COLOR ASSIGMENT </h3>
      </div>
      <div>
        <form>
          <div className="SVform__field">
            <label className="SVform__field--title">NAME: </label>
            <input type="text" className="SVform__field--input" />
          </div>
          <div className="SVcontainer__center">
            <button className="SVform__field--button">
              <span>SAVE</span>
            </button>
            <button className="SVform__field--button">
              <span>DELETE</span>
            </button>
            <button className="SVform__field--button">
              <span>UPDATE</span>
            </button>
          </div>
        </form>
      </div>
      <div className="SVcontainer__items">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo amet
          sunt, velit asperiores dolore corporis veritatis deleniti voluptas
          ipsa, alias possimus cupiditate expedita. Est, sequi neque voluptatum
          minima consequatur ad.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam ipsum
          et explicabo earum fugit, tempore voluptatem adipisci officia nam
          vitae esse ad eos minima illo doloremque maiores, ea, itaque labore?
        </p>
      </div>
    </div>
  );
};

export default AllColorAssignment;
