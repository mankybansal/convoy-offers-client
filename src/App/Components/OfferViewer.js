import React from "react";
import * as Consts from "../Utils/contants";
import OfferCard from "./OfferCard";
import OfferRow from "./OfferRow";

class OfferViewer extends React.Component {
    render() {
        const { error, isLoaded, offers, view } = this.props.state;

        if (error) {
            return (
                <div className="App-status-container">
                    <i className="fa fa-exclamation-triangle" />
                    &nbsp;&nbsp;&nbsp; Error fetching offers
                    <br />
                    <br />
                    <button className="light" onClick={this.props.updateOffersHandler}>
                        Try again <i className="fa fa-redo" />
                    </button>
                </div>
            );
        }

        if (!isLoaded) {
            return (
                <div className="App-status-container">
                    <i className="fa fa-circle-notch fa-spin" /> &nbsp;&nbsp;&nbsp;
                    Loading offers
                </div>
            );
        }

        if (view === Consts.VIEWS.cards) {
            return (
                <div className="Offers-container">
                    {offers.map((offer, index) => (
                        <OfferCard key={index} offer={offer} />
                    ))}
                </div>
            );
        } else {
            return (
                <table className="Offers-table">
                    <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Pickup Date</th>
                        <th>Dropoff Date</th>
                        <th>Offer</th>
                        <th>Distance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {offers.map((offer, index) => (
                        <OfferRow key={index} offer={offer} />
                    ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default OfferViewer;
