import { Component } from "react";
import React from "react";

class PaginationBar extends Component {
    render() {
        let { showOffset, showCount } = this.props;

        // Make sure prev page button doesn't show up when offset = 0
        let canClickPrev = this.props.showOffset > 0;

        // Make sure next page button doesn't show up when showing last offer
        let canClickNext =
            showOffset >= 0 &&
            this.props.offers.length > 0 &&
            this.props.offers.length === showCount;

        return (
            <div className="Offers-pagination">
                <button className={`light ${canClickPrev ? "" : "disabled"}`}
                        onClick={() => (canClickPrev ? this.props.pageHandler(-1) : false)}>
                    <i className="fa fa-angle-left" />
                    {"  "} Previous Page
                </button>

                <button className={`light ${canClickNext ? "" : "disabled"}`}
                        onClick={() => (canClickNext ? this.props.pageHandler(+1) : false)}>
                    Next Page {"  "}
                    <i className="fa fa-angle-right" />
                </button>

                <button className="light refresh" onClick={() => this.props.refreshHandler()}>
                    Refresh {"  "}
                    <i className="fa fa-redo-alt" />
                </button>

                <div className="Offers-pagination-showing">
                    Showing offers <strong>{parseInt(this.props.showOffset) + 1}</strong>{" "}to{" "}
                    <strong>
                        {parseInt(this.props.showOffset) + this.props.offers.length}
                    </strong>
                </div>
            </div>
        );
    }
}

export default PaginationBar;
