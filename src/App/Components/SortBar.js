import {Component} from "react";
import {Consts} from "../Utils";
import React from "react";

class SortButton extends Component {
    render() {
        const {label, sortMethod, currentSortMethod, currentOrderMethod} = this.props;

        let sortSelected, sortUpInverse = 'fa-inverse', sortDownInverse = 'fa-inverse';

        if (currentSortMethod === sortMethod) {
            sortSelected = "selected"
        }

        if (sortSelected ) {
            if (currentOrderMethod === Consts.ORDER.ASC) {
                sortUpInverse = ''
            } else {
                sortDownInverse = ''
            }
        }

        return (
            <button className={`dark ${sortSelected}`} onClick={() => this.props.sortHandler(sortMethod)}>
                {label}
                <span className="fa-stack">
                  <i className={`fa fa-sort-up fa-stack-1x ${sortUpInverse}`}> </i>
                  <i className={`fa fa-sort-down fa-stack-1x ${sortDownInverse}`}> </i>
                </span>
            </button>
        );
    }
}

class SortBar extends Component {
    render() {
        const {sortMethod, orderMethod} = this.props;

        return (
            <div className="Offers-sort">
                <SortButton
                    label={"Origin"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.origin}
                />
                <SortButton
                    label={"Destination"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.destination}
                />
                <SortButton
                    label={"Price"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.price}
                />
                <SortButton
                    label={"Miles"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.miles}
                />
                <SortButton
                    label={"Pickup Date"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.pickupDate}
                />
                <SortButton
                    label={"Dropoff Date"}
                    currentSortMethod={sortMethod}
                    currentOrderMethod={orderMethod}
                    sortHandler={this.props.sortHandler}
                    sortMethod={Consts.SORT_METHODS.dropoffDate}
                />
            </div>
        );
    }
}

export default SortBar;