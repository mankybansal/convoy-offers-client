import React, {Component} from 'react';
import logo from '../Resources/convoy-logo.png';
import './App.css';
import formatDate from 'dateformat'

const ORDER = {
    ASC: 'desc',
    DESC: 'asc'
};

const SHOW_LIMITS = [
    10, 20, 50, 100, 200, 500, 1000
];

let toggleOrder = (currentOrder) => {
    return (currentOrder === ORDER.ASC) ? ORDER.DESC : ORDER.ASC;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function camelCase(x) {
    let result = x.replace(/([A-Z])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1)); // capitalize the first letter - as an example.
}


class Offer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let pickupStart = new Date(this.props.offer.origin.pickup.start);
        let pickupEnd = new Date(this.props.offer.origin.pickup.end);
        let dropoffStart = new Date(this.props.offer.destination.dropoff.start);
        let dropoffEnd = new Date(this.props.offer.destination.dropoff.end);

        let pickupLocation = this.props.offer.origin.city + ", " + this.props.offer.origin.state;
        let dropoffLocation = this.props.offer.destination.city + ", " + this.props.offer.destination.state;

        return (
            <div className="Offer-card" key={this.props.index}>

                <div className="Offer-card-location start">
                    <div className="point-date">
                        {formatDate(pickupStart, 'd mmm')}
                    </div>
                    <div className="point-marker start"/>
                    <div className="location-info">
                        <div className="location-type">
                            Pickup
                        </div>
                        <div className="location-area">
                            {pickupLocation}
                        </div>
                        <div className="location-timings">
                            <i className="far fa-clock"/> &nbsp; {formatDate(pickupStart, "hh:MMtt")}&nbsp;–&nbsp;{formatDate(pickupEnd, "hh:MMtt (Z)")}
                        </div>
                    </div>
                </div>

                <div className="Offer-card-location end">
                    <div className="point-date">
                        {formatDate(dropoffStart, 'd mmm')}
                    </div>
                    <div className="point-marker end"/>
                    <div className="location-info">
                        <div className="location-type">
                            Dropoff
                        </div>
                        <div className="location-area">
                            {dropoffLocation}
                        </div>
                        <div className="location-timings">
                            <i className="far fa-clock"/> &nbsp; {formatDate(dropoffStart, "hh:MMtt")}&nbsp;–&nbsp;{formatDate(dropoffEnd, "hh:MMtt (Z)")}
                        </div>
                    </div>
                </div>

                <div className="Offer-card-offer">
                    <div className="Offer-card-label">Price</div>
                    ${numberWithCommas(this.props.offer.offer)}
                </div>

                <br/>

                <div className="Offer-card-dist">
                    {this.props.offer.miles} miles
                </div>

                <div className="Offer-card-view">View</div>
            </div>
        );
    }
}

class OfferViewer extends React.Component {
    constructor(props) {
        super(props);

        // Setup Handlers
        this.sortHandler = this.sortHandler.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.showCountHandler = this.showCountHandler.bind(this);

        this.state = {
            error: false,
            isLoaded: false,
            offers: [],
            sortMethod: 'pickupDate',
            orderMethod: ORDER.DESC,
            showCount: SHOW_LIMITS[2],
            showOffset: 0,
        };
    }

    pageHandler(pageCount) {
        this.setState({
            showOffset: Math.max(0, this.state.showOffset + pageCount * this.state.showCount)
        }, () => {
            this.updateOffers()
        });
    }

    sortHandler(sortMethod) {
        if (sortMethod === this.state.sortMethod) {
            console.log("Same sort in " + toggleOrder(this.state.orderMethod));
            this.setState({
                orderMethod: toggleOrder(this.state.orderMethod),
            }, () => {
                this.updateOffers()
            });
        } else {
            console.log("Different sort by " + sortMethod + " in " + ORDER.DESC);
            this.setState({
                orderMethod: ORDER.DESC,
                sortMethod: sortMethod
            }, () => {
                this.updateOffers()
            });
        }
    }

    showCountHandler(event) {
        this.setState({
            showCount: parseInt(event.target.value)
        }, () => {
            this.updateOffers()
        });
    }

    updateOffers() {

        this.setState({
            isLoaded: false,
            error: false,
            offers: [],
        });

        let params =
            "sort=" + this.state.sortMethod +
            "&order=" + this.state.orderMethod +
            "&limit=" + this.state.showCount +
            "&offset=" + this.state.showOffset;

        console.log("update params: " + params);

        setTimeout(function () {
            fetch("https://convoy-frontend-homework-api.herokuapp.com/offers?" + params)
                .then(response => response.json())
                .then((response) => {
                    this.setState({
                        isLoaded: true,
                        offers: response,
                        error: false
                    });
                })
                .catch((error) => {
                    console.log("ERROR: " + error);
                    this.setState({
                        isLoaded: true,
                        error: true
                    });
                });
        }.bind(this), 1000);  // rate limit API calls

    }

    componentDidMount() {
        this.updateOffers()
    }

    render() {
        const {error, isLoaded, offers, showOffset} = this.state;

        let prevPageButton, nextPageButton;


        // Make sure prev page button doesn't show up when showing first offer
        if (showOffset > 0) {
            prevPageButton =
                <button className="light" onClick={() => this.pageHandler(-1)}><i
                    className="fa fa-angle-left"/>&nbsp;&nbsp; Previous Page</button>;
        } else {
            prevPageButton =
                <button className="light disabled"><i className="fa fa-angle-left"/>&nbsp;&nbsp; Previous Page
                </button>;
        }

        // Make sure next page button doesn't show up when showing last offer
        if (showOffset >= 0 && offers.length > 0 && offers.length === this.state.showCount) {
            nextPageButton =
                <button className="light" onClick={() => this.pageHandler(+1)}>Next Page &nbsp;&nbsp;<i
                    className="fa fa-angle-right"/></button>;
        } else {
            nextPageButton =
                <button className="light disabled">Next Page &nbsp;&nbsp;<i className="fa fa-angle-right"/></button>;
        }

        if (error) {
            return (
                <div>
                    <br/><br/><br/><br/><br/><br/><br/>Error loading results...
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="App-loading-container">
                    <i className="fa fa-circle-notch fa-spin"/> &nbsp;&nbsp;&nbsp; Loading Offers...
                </div>
            );
        } else {
            return (

                <div>
                    <div className="Offers-sort">
                        <button className="dark" onClick={() => this.sortHandler('origin')}>Origin &nbsp;&nbsp;<i
                            className="fa fa-sort"/></button>
                        <button className="dark"
                                onClick={() => this.sortHandler('destination')}>Destination &nbsp;&nbsp;<i
                            className="fa fa-sort"/></button>
                        <button className="dark" onClick={() => this.sortHandler('price')}>Price &nbsp;&nbsp;<i
                            className="fa fa-sort"/></button>
                        <button className="dark" onClick={() => this.sortHandler('miles')}>Miles &nbsp;&nbsp;<i
                            className="fa fa-sort"/></button>
                        <button className="dark" onClick={() => this.sortHandler('pickupDate')}>Pickup Date &nbsp;&nbsp;
                            <i className="fa fa-sort"/></button>
                        <button className="dark" onClick={() => this.sortHandler('dropoffDate')}>Dropoff
                            Date &nbsp;&nbsp;<i className="fa fa-sort"/></button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorted
                        by <span
                        className="Offers-sort-method">{camelCase(this.state.sortMethod)}, {camelCase(this.state.orderMethod)}</span>
                    </div>

                    <div className="Offers-pagenation">
                        {prevPageButton}
                        {nextPageButton}
                        <div className="Offers-pagenation-showing">
                            Showing
                            offers <strong>{parseInt(this.state.showOffset) + 1}</strong> to <strong>{parseInt(this.state.showOffset) + offers.length}</strong>
                        </div>
                        <div className="Offers-pagenation-limit">
                            Showing &nbsp;
                            <select id="showCount" onChange={this.showCountHandler} value={this.state.showCount}>
                                {SHOW_LIMITS.map((limit, index) => (
                                    <option key={index} value={limit}>
                                        {limit}
                                    </option>
                                ))}
                            </select>
                            &nbsp; per page
                        </div>
                    </div>

                    <div className="Offers-container">
                        {offers.map((offer, index) => (
                            <Offer index={index} offer={offer}/>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="App-title">Freight Offers</div>
                </header>

                <OfferViewer/>
            </div>
        );
    }
}


export default App;


// todo: add user profile
// todo: add on click for offer
// todo: add map if possible
// todo: fix error screen and timeout
// todo: add sorting direction buttons / asc/desc
// todo: add sidebar with hamburger menu