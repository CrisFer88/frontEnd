import { NavLink } from "react-router-dom"
import   sawIcon   from '../../assets/img/saw2.png'

export const MenuBlades = () => {

  // console.log('Estoy en el menu de blades')
  return (
    <>
        <nav>
        <div className="container__nav2">
          <section>
            <img src={ sawIcon }  alt="Machine" className="menu__logo2--img"/>
          </section>
          <NavLink
            className='menu__link'
            to='newblade'
          >
            New Blade
          </NavLink>
          <NavLink
            className='menu__link'
            to='storage'
          >
            Storage
          </NavLink>
          <NavLink
            className='menu__link'
            to='2'
          >
            Install
          </NavLink>
          <NavLink
            className='menu__link'
            to='2'
          >
            Uninstall
          </NavLink>
          <NavLink
            className='menu__link'
            to='2'
          >
            Sharpening
          </NavLink>
          <NavLink
            className='menu__link'
            to='2'
          >
            Blades Info.
          </NavLink>
          </div>
        </nav>
    </>
  )
}
