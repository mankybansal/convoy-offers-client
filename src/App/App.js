import React, { Component } from "react";
import "./App.css";
import { Consts } from "./Utils";

import Header from "./Components/Header";
import OfferViewer from "./Components/OfferViewer";
import SortBar from "./Components/SortBar";
import PaginationBar from "./Components/PaginationBar";

class App extends Component {
    constructor(props) {
        super(props);

        // setup handlers
        this.sortHandler = this.sortHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.showCountHandler = this.showCountHandler.bind(this);
        this.viewTypeHandler = this.viewTypeHandler.bind(this);

        // set initial state
        this.state = {
            error: false,
            isLoaded: false,
            offers: [],
            sortMethod: Consts.SORT_METHODS.pickupDate,
            orderMethod: Consts.ORDER.asc,
            showCount: Consts.SHOW_LIMITS[2],
            showOffset: 0,
            view: Consts.VIEWS.cards
        };
    }

    viewTypeHandler = view => {
        this.setState({
            view: view
        });
    };

    pageHandler = pageCount => {
        this.setState(
            {
                showOffset: Math.max(
                    0,
                    this.state.showOffset + pageCount * this.state.showCount
                )
            },
            () => {
                this.updateOffers();
            }
        );
    };

    sortHandler = event => {
        this.setState(
            {
                showOffset: 0,
                sortMethod: event.target.value,
                orderMethod: Consts.ORDER.asc
            },
            () => {
                this.updateOffers();
            }
        );
    };

    orderHandler = event => {
        this.setState(
            {
                orderMethod: event.target.value
            },
            () => {
                this.updateOffers();
            }
        );
    };

    showCountHandler = event => {
        this.setState(
            {
                showCount: parseInt(event.target.value)
            },
            () => {
                this.updateOffers();
            }
        );
    };

    updateOffers = () => {
        this.setState({
            isLoaded: false,
            error: false,
            offers: []
        });

        let params = new URLSearchParams({
            sort: this.state.sortMethod,
            order: this.state.orderMethod,
            limit: this.state.showCount,
            offset: this.state.showOffset
        }).toString();

        fetch("https://convoy-frontend-homework-api.herokuapp.com/offers?" + params)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    isLoaded: true,
                    offers: response,
                    error: false
                });
            })
            .catch(error => {
                console.log("ERROR: " + error);
                this.setState({
                    isLoaded: true,
                    error: true
                });
            });
    };

    componentDidMount() {
        this.updateOffers();
    }

    render() {
        const {
            view,
            sortMethod,
            orderMethod,
            showCount,
            showOffset,
            offers
        } = this.state;

        return (
            <div className="App">
                <Header />

                <SortBar
                    sortMethod={sortMethod}
                    orderMethod={orderMethod}
                    view={view}
                    showCount={showCount}
                    sortHandler={this.sortHandler}
                    orderHandler={this.orderHandler}
                    showCountHandler={this.showCountHandler}
                    viewTypeHandler={this.viewTypeHandler}
                />

                <OfferViewer
                    state={this.state}
                    updateOffersHandler={this.updateOffers}
                />

                <PaginationBar
                    offers={offers}
                    showOffset={showOffset}
                    showCount={showCount}
                    pageHandler={this.pageHandler}
                />
            </div>
        );
    }
}

export default App;

// todo: add user profile
// todo: add sidebar with hamburger menu
