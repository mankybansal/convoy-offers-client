import logo from "../Resources/convoy-logo.png";
import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-title">Freight Offers</div>

                <div className="user-profile">
                    <div className="user-name">
                        Hello, <span className="user-name-highlight">Tom Trucker</span>
                    </div>
                    <div className="user-avatar">
                        <i className="fa fa-user-circle"/>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
