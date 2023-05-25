
import '../../styles/navbar.css';
import LogoCompanny from '../../assets/img/Logo.png';
import Rigth_Arrow from '../../assets/img/Rigth_Arrow.svg';
import { Link, NavLink } from 'react-router-dom';


export const NavBar = () => {



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
                            'Aqui va el nombre'
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
{/* ---------------------------MACHINERY----------------------------------- */}
                        <li className="menu__item">
                            <a className="menu__link">Machinery <img src={Rigth_Arrow} className="menu__arrow" /></a>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='blades'
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
{/* ---------------------------PRODUCTION----------------------------------- */}
                        <li className="menu__item">
                        <a className="menu__link">Production<img src={Rigth_Arrow} className="menu__arrow" /></a>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='manufacturing'
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
                        <li className="menu__item">
                            <NavLink
                                className='menu__link'
                                to='inventory'
                            >
                                Inventory
                            </NavLink>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link">Integration <img src={Rigth_Arrow} className="menu__arrow" /></a>
                            <ul className="menu__nesting">

                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to='monday'
                                    >
                                        Monday
                                    </NavLink>
                                </li>
                                <li className="menu__inside">
                                    <NavLink
                                        className='menu__link'
                                        to=''
                                    >
                                        Other 1
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
                        // onClick={startLogout}
                    >
                        Logout
                    </button>
                </section>
                {/* <section className="hamburger"> */}
                    <button 
                    className='hamburger__button' 
                    id='HamButton'
                    // onClick={handleHamburger}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                {/* </section> */}
                </div>                       
            </nav>
        </>
    )
}