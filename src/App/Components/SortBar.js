import {Component} from "react";
import * as Utils from "../Utils/helpers";
import React from "react";

class SortBar extends Component {
    render() {
        return (
            <div className="Offers-sort">
                <button className="dark" onClick={() => this.props.sortHandler('origin')}>Origin &nbsp;&nbsp;<i
                    className="fa fa-sort"/></button>
                <button className="dark"
                        onClick={() => this.props.sortHandler('destination')}>Destination &nbsp;&nbsp;<i
                    className="fa fa-sort"/></button>
                <button className="dark" onClick={() => this.props.sortHandler('price')}>Price &nbsp;&nbsp;<i
                    className="fa fa-sort"/></button>
                <button className="dark" onClick={() => this.props.sortHandler('miles')}>Miles &nbsp;&nbsp;<i
                    className="fa fa-sort"/></button>
                <button className="dark" onClick={() => this.props.sortHandler('pickupDate')}>Pickup
                    Date &nbsp;&nbsp;
                    <i className="fa fa-sort"/></button>
                <button className="dark" onClick={() => this.props.sortHandler('dropoffDate')}>Dropoff
                    Date &nbsp;&nbsp;<i className="fa fa-sort"/></button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorted
                by <span
                className="Offers-sort-method">{Utils.camelCase(this.props.sortMethod)}, {Utils.camelCase(this.props.orderMethod)}</span>
            </div>
        );
    }
}

export default SortBar;