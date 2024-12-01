import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Signup from "../components/auth/signup/Signup";
import Overlay from "../components/navbar/Overlay";

const SignupPage = () => {
    const [hamburger, setHamburger] = useState(false);

    return (
        <>
            <div className={hamburger ? "navbar-hidden" : ""}>
                <Navbar setHamburger={setHamburger} />
            </div>
            <main>
                <Signup />
            </main>
            {hamburger && <Overlay setHamburger={setHamburger} />}
        </>
    );
};

export default SignupPage;
