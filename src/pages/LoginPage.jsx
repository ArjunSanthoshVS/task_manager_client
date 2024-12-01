import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import Login from '../components/auth/login/Login';
import Overlay from '../components/navbar/Overlay';

const LoginPage = () => {
  const [hamburger, setHamburger] = useState(false);

  return (
    <>
      <div className={hamburger ? "navbar-hidden" : ""}>
        <Navbar setHamburger={setHamburger} />
      </div>
      <main>
        <Login />
      </main>
      {hamburger && <Overlay setHamburger={setHamburger} />}
    </>
  )
}

export default LoginPage