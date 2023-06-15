import React from 'react'
import { NavLink} from 'react-router-dom'
import   satackIcon   from '../../assets/img/stack.png'

export const MenuProduction = () => {
  return (
    <>
        <nav>
        <div className="container__nav2">

          <section>
            <img src={ satackIcon }  alt="Machine" className="menu__logo2--img"/>
          </section>

          <NavLink
            className='menu__link'
            to='Stack'
            >
            Stack
          </NavLink>

          <NavLink
            className='menu__link'
            to='stack_history'
            >
            Stack history
          </NavLink>

          <NavLink
            className='menu__link'
            to='charts'
            >
            Charts
          </NavLink>
          
            </div>
        </nav>
    </>
  )
}