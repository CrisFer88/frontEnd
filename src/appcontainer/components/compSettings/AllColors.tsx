import React from 'react'

const AllColors = () => {
    return (
        <div className="container__center">
          <div className="container__title">
            <h3> COLORS  </h3>
          </div>
          <div className="container__body">
            <form>
              <div className="fieldform">
                <label className="label__title">NAME: </label>
                <input type="text" className="form-control" />
              </div>
              <div className="container__buttons--center">
                <button className="button__form button1">
                  <span>SAVE</span>
                </button>
                <button className="button__form button1">
                  <span>DELETE</span>
                </button>
                <button className="button__form button1">
                  <span>UPDATE</span>
                </button>
              </div>
            </form>
          </div>
          <div className="container__items">
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
}

export default AllColors