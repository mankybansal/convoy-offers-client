import React from "react";
import * as Consts from "../Utils/contants";
import OfferCard from './OfferCard'
import OfferRow from './OfferRow'

class OfferViewer extends React.Component {
    render() {
        const {error, isLoaded, offers, view} = this.props.state;

        if (error) {
            return (
                <div className="App-loading-container">
                    <i className="fa fa-exclamation-triangle"/> &nbsp;&nbsp;&nbsp; Error fetching offers...
                    <br/>
                    <button onClick={this.props.updateOffersHandler}>
                        Try again <i className="fa fa-redo"/>
                    </button>
                </div>
            );
        }

        if (!isLoaded) {
            return (
                <div className="App-loading-container">
                    <i className="fa fa-circle-notch fa-spin"/> &nbsp;&nbsp;&nbsp; Loading Offers...
                </div>
            );
        }

        if (view === Consts.VIEWS.cards) {
            return (
                <div className="Offers-container">
                    {offers.map((offer, index) => (
                        <OfferCard key={index} offer={offer}/>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="Offers-container">
                    {offers.map((offer, index) => (
                        <OfferRow key={index} offer={offer}/>
                    ))}
                </div>
            );
        }
    }
}

export default OfferViewer;