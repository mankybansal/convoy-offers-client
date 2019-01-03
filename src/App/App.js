import React, {Component} from 'react';
import logo from './Resources/convoy-logo.png';
import './App.css';
import { Utils, Consts } from './Utils'
import OfferViewer from './Components/OfferViewer'

class App extends Component {
    constructor(props) {
        super(props);

        // Setup Handlers
        this.sortHandler = this.sortHandler.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.showCountHandler = this.showCountHandler.bind(this);
        this.viewTypeHandler = this.viewTypeHandler.bind(this);

        this.state = {
            error: false,
            isLoaded: false,
            offers: [],
            sortMethod: 'pickupDate',
            orderMethod: Consts.ORDER.DESC,
            showCount: Consts.SHOW_LIMITS[2],
            showOffset: 0,
            view: Consts.VIEWS.cards
        };
    }

    viewTypeHandler = (view) => {
        this.setState({
            view: view
        });
    }

    pageHandler = (pageCount) => {
        this.setState({
            showOffset: Math.max(0, this.state.showOffset + pageCount * this.state.showCount)
        }, () => {
            this.updateOffers()
        });
    };

    sortHandler = (sortMethod) => {
        if (sortMethod === this.state.sortMethod) {
            console.log("Same sort in " + Utils.toggleOrder(this.state.orderMethod));
            this.setState({
                orderMethod: Utils.toggleOrder(this.state.orderMethod),
            }, () => {
                this.updateOffers()
            });
        } else {
            console.log("Different sort by " + sortMethod + " in " + Consts.ORDER.DESC);
            this.setState({
                orderMethod: Consts.ORDER.DESC,
                sortMethod: sortMethod
            }, () => {
                this.updateOffers()
            });
        }
    };

    showCountHandler = (event) => {
        this.setState({
            showCount: parseInt(event.target.value)
        }, () => {
            this.updateOffers()
        });
    };

    updateOffers = () => {

        this.setState({
            isLoaded: false,
            error: false,
            offers: [],
        });

        let params = new URLSearchParams({
            sort: this.state.sortMethod,
            order: this.state.orderMethod,
            limit: this.state.showCount,
            offset: this.state.showOffset
        }).toString();

        console.log("Updated params: " + params);

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

    };

    componentDidMount() {
        this.updateOffers()
    }

    render() {
        const {showOffset, offers} = this.state;

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

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="App-title">Freight Offers</div>
                </header>

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
                    <button className="dark" onClick={() => this.sortHandler('pickupDate')}>Pickup
                        Date &nbsp;&nbsp;
                        <i className="fa fa-sort"/></button>
                    <button className="dark" onClick={() => this.sortHandler('dropoffDate')}>Dropoff
                        Date &nbsp;&nbsp;<i className="fa fa-sort"/></button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorted
                    by <span
                    className="Offers-sort-method">{Utils.camelCase(this.state.sortMethod)}, {Utils.camelCase(this.state.orderMethod)}</span>
                </div>

                <OfferViewer state={this.state} updateOffers={this.updateOffers}/>

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
                            {Consts.SHOW_LIMITS.map((limit, index) => (
                                <option key={index} value={limit}>
                                    {limit}
                                </option>
                            ))}
                        </select>
                        &nbsp; per page
                    </div>
                    <div className="Offers-pagenation-view">
                        <i className="fas fa-th-list selected" onClick={() => {
                            this.viewTypeHandler(Consts.VIEWS.table)
                        }}> </i>
                        <i className="fas fa-th-large" onClick={() => {
                            this.viewTypeHandler(Consts.VIEWS.cards)
                        }}> </i>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;


// todo: add user profile
// todo: add on click for offer
// todo: add map if possible
// todo: add sorting direction buttons / asc/desc
// todo: add sidebar with hamburger menu
