import React from "react";
import formatDate from "dateformat";
import { Utils } from "../Utils";

class OfferRow extends React.Component {
    render() {
        const { offer } = this.props;

        let pickupStart = new Date(offer.origin.pickup.start);
        let pickupEnd = new Date(offer.origin.pickup.end);
        let dropoffStart = new Date(offer.destination.dropoff.start);
        let dropoffEnd = new Date(offer.destination.dropoff.end);

        let pickupLocation = offer.origin.city + ", " + offer.origin.state;
        let dropoffLocation =
            offer.destination.city + ", " + offer.destination.state;

        return (
            <tr className="Offer-row">
                <td>
                    <i className="fa fa-map-marker-alt location-icon" />
                    {pickupLocation}
                </td>
                <td>
                    <i className="fa fa-map-marker-alt location-icon" />
                    {dropoffLocation}
                </td>
                <td>
                    <i className="far fa-calendar-alt location-icon" />
                    &nbsp;{formatDate(dropoffStart, "ddd mm/dd")}&nbsp;&nbsp;&nbsp;
                    {formatDate(pickupStart, "HH:MM")}–
                    {formatDate(pickupEnd, "HH:MM")}
                </td>
                <td>
                    <i className="far fa-calendar-alt location-icon" />
                    &nbsp;{formatDate(pickupStart, "ddd mm/dd")}&nbsp;&nbsp;&nbsp;
                    {formatDate(dropoffStart, "HH:MM")}–
                    {formatDate(dropoffEnd, "HH:MM")}
                </td>
                <td>${Utils.numberWithCommas(this.props.offer.offer)}</td>
                <td>{offer.miles} mi</td>
            </tr>
        );
    }
}

export default OfferRow;
