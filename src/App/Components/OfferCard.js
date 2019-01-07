import React from "react";
import formatDate from "dateformat";
import { Utils } from "../Utils";

class OfferCard extends React.Component {
    render() {
        const { offer } = this.props;

        let pickupStart = new Date(offer.origin.pickup.start);
        let pickupEnd = new Date(offer.origin.pickup.end);
        let dropoffStart = new Date(offer.destination.dropoff.start);
        let dropoffEnd = new Date(offer.destination.dropoff.end);

        let pickupLocation = offer.origin.city + ", " + offer.origin.state;
        let dropoffLocation = offer.destination.city + ", " + offer.destination.state;

        return (
            <div className="Offer-card">
                <div className="Offer-card-location start">
                    <div className="point-date">{formatDate(pickupStart, "d mmm")}</div>
                    <div className="point-marker start" />
                    <div className="location-info">
                        <div className="location-type">Pickup</div>
                        <div className="location-area">{pickupLocation}</div>
                        <div className="location-timings">
                            <span className="location-day">{formatDate(pickupStart, "dddd")}</span> &nbsp;
                            <i className="far fa-clock" />
                            &nbsp; {formatDate(pickupStart, "h:MM tt")}&nbsp;–&nbsp;
                            {formatDate(pickupEnd, "h:MM tt (Z)")}
                        </div>
                    </div>
                </div>

                <div className="Offer-card-location end">
                    <div className="point-date">{formatDate(dropoffStart, "d mmm")}</div>
                    <div className="point-marker end" />
                    <div className="location-info">
                        <div className="location-type">Dropoff</div>
                        <div className="location-area">{dropoffLocation}</div>
                        <div className="location-timings">
                            <span className="location-day">{formatDate(dropoffStart, "dddd")}</span> &nbsp;
                            <i className="far fa-clock" />
                            &nbsp; {formatDate(dropoffStart, "h:MM tt")}&nbsp;–&nbsp;
                            {formatDate(dropoffEnd, "h:MM tt (Z)")}
                        </div>
                    </div>
                </div>

                <div className="Offer-card-offer">
                    <div className="Offer-card-label">Offer</div>$
                    {Utils.numberWithCommas(this.props.offer.offer)}
                </div>

                <br />

                <div className="Offer-card-dist">{offer.miles} miles</div>

                <div className="Offer-card-view">View</div>
            </div>
        );
    }
}

export default OfferCard;
