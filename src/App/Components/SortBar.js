import { Component } from "react";
import { Consts } from "../Utils";
import React from "react";
import { camelCase } from "../Utils/helpers";

class SortBar extends Component {
    render() {
        const { view, sortMethod, orderMethod, showCount } = this.props;

        let tableSelected, cardsSelected;

        if (view === Consts.VIEWS.cards) {
            cardsSelected = "selected";
        } else {
            tableSelected = "selected";
        }

        return (
            <div className="Offers-sort">
                <div className="SortBarContainer">
                    <div className="SortBarLabel">Sort by:</div>
                    <select
                        className="SortBarSelect"
                        value={sortMethod}
                        onChange={this.props.sortHandler}
                    >
                        {Object.keys(Consts.SORT_METHODS).map((method, index) => (
                            <option key={index} value={method}>
                                {camelCase(method)}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down select-icon" />
                </div>

                <div className="SortBarContainer">
                    <div className="SortBarLabel">Order:</div>
                    <select
                        className="SortBarSelect"
                        value={orderMethod}
                        onChange={this.props.orderHandler}
                    >
                        {Object.keys(Consts.ORDER).map((method, index) => (
                            <option key={index} value={method}>
                                {camelCase(method)}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down select-icon" />
                </div>

                <div className="SortBarContainer">
                    <div className="SortBarLabel">Show:</div>
                    <select
                        className="SortBarSelect"
                        value={showCount}
                        onChange={this.props.showCountHandler}
                    >
                        {Consts.SHOW_LIMITS.map((limit, index) => (
                            <option key={index} value={limit}>
                                {limit} per page
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down select-icon" />
                </div>

                <div className="SortBarContainer ViewSelect">
                    <div className="SortBarLabel">View:</div>
                    <div className="Offers-pagination-view">
                        <i
                            className={`fas fa-th-large ${cardsSelected}`}
                            onClick={() => {
                                this.props.viewTypeHandler(Consts.VIEWS.cards);
                            }}
                        />
                        <i
                            className={`fas fa-th-list ${tableSelected}`}
                            onClick={() => {
                                this.props.viewTypeHandler(Consts.VIEWS.table);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SortBar;
