import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function NavBar(props) {
    const navigation = useNavigate();
    function signOut(){
        localStorage.removeItem('jwt');
        navigation("/sign-in", {replace: true});
      }
    return (
        <ul className="navbar">
            <Routes>
                <Route path='/sign-in' element={
                    <li><Link to="/sign-up" className="navbar__link button">Регистрация</Link></li>
                }/>
                <Route path='/sign-up' element={
                    <li><Link to="/sign-in" className="navbar__link button">Вход</Link></li>
                }/>
                <Route path='/' element={
                    <>
                        <li>{props.userEmail}</li>
                        <li><button className="navbar__link navbar__button button" onClick={signOut}>Выйти</button></li>
                    </>
                }/>
            </Routes>
        </ul>
    )
}

export default NavBar;