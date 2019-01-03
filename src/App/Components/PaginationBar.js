import {Component} from "react";
import * as Consts from "../Utils/contants";
import React from "react";

class PaginationBar extends Component {
    render() {
        let prevPageButton, nextPageButton;

        // Make sure prev page button doesn't show up when showing first offer
        if (this.props.showOffset > 0) {
            prevPageButton =
                <button className="light" onClick={() => this.props.pageHandler(-1)}><i
                    className="fa fa-angle-left"/>&nbsp;&nbsp; Previous Page</button>;
        } else {
            prevPageButton =
                <button className="light disabled"><i className="fa fa-angle-left"/>&nbsp;&nbsp; Previous Page
                </button>;
        }

        // Make sure next page button doesn't show up when showing last offer
        if (this.props.showOffset >= 0 && this.props.offers.length > 0 && this.props.offers.length === this.props.showCount) {
            nextPageButton =
                <button className="light" onClick={() => this.props.pageHandler(+1)}>Next Page &nbsp;&nbsp;<i
                    className="fa fa-angle-right"/></button>;
        } else {
            nextPageButton =
                <button className="light disabled">Next Page &nbsp;&nbsp;<i className="fa fa-angle-right"/></button>;
        }

        return (
            <div className="Offers-pagination">
                {prevPageButton}
                {nextPageButton}
                <div className="Offers-pagination-showing">
                    Showing
                    offers <strong>{parseInt(this.props.showOffset) + 1}</strong> to <strong>{parseInt(this.props.showOffset) + this.props.offers.length}</strong>
                </div>
                <div className="Offers-pagination-limit">
                    Showing &nbsp;
                    <select id="showCount" onChange={this.props.showCountHandler} value={this.props.showCount}>
                        {Consts.SHOW_LIMITS.map((limit, index) => (
                            <option key={index} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </select>
                    &nbsp; per page
                </div>
                <div className="Offers-pagination-view">
                    <i className="fas fa-th-list" onClick={() => {
                        this.props.viewTypeHandler(Consts.VIEWS.table)
                    }}> </i>
                    <i className="fas fa-th-large selected" onClick={() => {
                        this.props.viewTypeHandler(Consts.VIEWS.cards)
                    }}> </i>
                </div>
            </div>
        )
    }
}

export default PaginationBar;