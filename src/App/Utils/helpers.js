import * as Const from './contants'

let toggleOrder = (currentOrder) => {
    return (currentOrder === Const.ORDER.ASC) ? Const.ORDER.DESC : Const.ORDER.ASC;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function camelCase(x) {
    let result = x.replace(/([A-Z])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1));
}

export {
    toggleOrder,
    numberWithCommas,
    camelCase,
}