
import '../../styles/navbar.css';
import LogoCompanny from '../../assets/img/Logo.png';
import Rigth_Arrow from '../../assets/img/Rigth_Arrow.svg';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../hooks';


export const NavBar = () => {


    const [hamButton, setHamButton] = useState(false);
    const { startLogout, user } = useAuthStore();

    // console.log(user);

    const handleHamburger = ( event: React.MouseEvent<HTMLButtonElement>) => {
        //TODO: cuando se hace clic en el boton de hamburguesa se tiene que desplegar el menu
        event.preventDefault();
        // console.log((event.currentTarget as HTMLButtonElement)?.className);
        if (event.currentTarget?.id === 'HamButton') {
            event.currentTarget.className = hamButton
              ? 'hamburger__button'
              : 'hamburger__button is_active';
            setHamButton(!hamButton);
          }
    }

    return (
        <>

            <nav >

                <div className="container__nav">

                

                <section className="menu__left">
                    <section className="menu__logo">
                        <Link
                            className="menu__logo menu__logo--link"
                            to="/"
                        >
                            <img src={LogoCompanny} alt="Home logo" className="menu__logo--img" />
                        </Link>
                    </section>
                    <section className="menu__thema--name">
                        <h1>
                        { (user as { name: string }).name }
                        </h1>
                    </section>
                    {/* <section className="menu__thema">
                        <button
                            className="menu__thema menu__logo--link"
                            onClick={themaMode()}
                        >
                            <img src={DarkThema} alt="Dark/Ligth Mode" className="menu__thema--img" />
                        </button>

                    </section> */}

                </section>

                <section className="menu__container">

                    <ul className="menu__principal">
{/* ---------------------------PRODUCTION----------------------------------- */}
<li className="menu__item">
                        <button className="menu__link">Production<img src={Rigth_Arrow} className="menu__arrow" alt='button'/></button>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='production/manufacturing'
                                    >
                                        Manufacturing
                                    </NavLink>

                                </li>

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='QC'
                                    >
                                        Quality Control
                                    </NavLink>
                                </li>
                                {/* <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='/QC'
                                    >
                                        Quality Control
                                    </NavLink>
                                </li> */}
                            </ul>
                        </li>
{/* ------------------------------------------------------------------------ */}
{/* ---------------------------MACHINERY----------------------------------- */}
                        <li className="menu__item">
                            <button className="menu__link">Machinery <img src={Rigth_Arrow} className="menu__arrow" alt='button'/></button>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='machinery/blades'
                                    >
                                        Blades
                                    </NavLink>

                                </li>

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='machinery'
                                    >
                                        Machinery manage
                                    </NavLink>
                                </li>
                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to=''
                                    >
                                        Other 2
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
{/* ------------------------------------------------------------------------ */}

                        <li className="menu__item">
                            <NavLink
                                className='menu__link'
                                to='inventory'
                            >
                                <button className="menu__link">Inventory <img src={Rigth_Arrow} className="menu__arrow" alt='button'/></button>
                            </NavLink>
                        </li>

                        <li className="menu__item">
                            <button className="menu__link">Settings <img src={Rigth_Arrow} className="menu__arrow" alt='button'/></button>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='setBasic'
                                    >
                                        Basics goods
                                    </NavLink>
                                </li>
                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to=''
                                    >
                                        Users
                                    </NavLink>
                                </li>
                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to=''
                                    >
                                        Other 2
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </section>

                <section className="menu__logout">
                    <button
                        className='buttonLogout'
                        onClick={startLogout}
                    >
                        Logout
                    </button>
                </section>
                <section className="hamburger">
                    <button 
                    className='hamburger__button' 
                    id='HamButton'
                    onClick={handleHamburger}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </section>
                </div>                       
            </nav>
        </>
    )
}