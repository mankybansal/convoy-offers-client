import { Component } from "react";
import React from "react";

class PaginationBar extends Component {
    render() {
        let { showOffset, showCount } = this.props;

        let prevPageButton, nextPageButton;

        // Make sure prev page button doesn't show up when showing first offer
        if (this.props.showOffset > 0) {
            prevPageButton = (
                <button className="light" onClick={() => this.props.pageHandler(-1)}>
                    <i className="fa fa-angle-left" />
                    &nbsp;&nbsp; Previous Page
                </button>
            );
        } else {
            prevPageButton = (
                <button className="light disabled">
                    <i className="fa fa-angle-left" />
                    &nbsp;&nbsp; Previous Page
                </button>
            );
        }

        // Make sure next page button doesn't show up when showing last offer
        if (
            showOffset >= 0 &&
            this.props.offers.length > 0 &&
            this.props.offers.length === showCount
        ) {
            nextPageButton = (
                <button className="light" onClick={() => this.props.pageHandler(+1)}>
                    Next Page {"  "}
                    <i className="fa fa-angle-right" />
                </button>
            );
        } else {
            nextPageButton = (
                <button className="light disabled">
                    Next Page {"  "}
                    <i className="fa fa-angle-right" />
                </button>
            );
        }

        return (
            <div className="Offers-pagination">
                {prevPageButton}
                {nextPageButton}
                <div className="Offers-pagination-showing">
                    Showing offers <strong>{parseInt(this.props.showOffset) + 1}</strong>{" "}to{" "}
                    <strong>{parseInt(this.props.showOffset) + this.props.offers.length}</strong>
                </div>
            </div>
        );
    }
}

export default PaginationBar;
