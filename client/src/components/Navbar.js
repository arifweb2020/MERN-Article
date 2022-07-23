import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Add Article</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;