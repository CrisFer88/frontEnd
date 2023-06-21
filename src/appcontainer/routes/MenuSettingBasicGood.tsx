import   satackIcon   from '../../assets/img/stack.png'
import { NavLink } from 'react-router-dom'

export const MenuSettingBasicGood = () => {
  return (
    <>
    <nav>
    <div className="container__nav2">

      <section>
        <img src={ satackIcon }  alt="Machine" className="menu__logo2--img"/>
      </section>

      <NavLink
        className='menu__link'
        to='Parameter'
        >
        New Parameter
      </NavLink>

      <NavLink
        className='menu__link'
        to='products'
        >
        List of products
      </NavLink>

      <NavLink
        className='menu__link'
        to='printers'
        >
        Printers
      </NavLink>
      
        </div>
    </nav>
</>
  )
}
