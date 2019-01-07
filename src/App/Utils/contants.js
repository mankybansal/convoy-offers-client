const ORDER = {
    asc: "asc",
    desc: "desc"
};

const VIEWS = {
    cards: 0,
    table: 1
};

const SHOW_LIMITS = [10, 20, 50, 100, 200, 500, 1000];

const SORT_METHODS = {
    pickupDate: "pickupDate",
    dropoffDate: "dropoffDate",
    miles: "miles",
    price: "price",
    origin: "origin",
    destination: "destination"
};

export { ORDER, VIEWS, SHOW_LIMITS, SORT_METHODS };
