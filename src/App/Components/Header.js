import logo from "../Resources/convoy-logo.png";
import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="App-title">Freight Offers</div>
            </header>
        )
    }
}

export default Header;