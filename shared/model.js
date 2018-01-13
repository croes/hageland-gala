"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuChoice;
(function (MenuChoice) {
    MenuChoice["MEAT"] = "MEAT";
    MenuChoice["FISH"] = "FISH";
    MenuChoice["VEGI"] = "VEGI";
})(MenuChoice = exports.MenuChoice || (exports.MenuChoice = {}));
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["SUBMITTED"] = "SUBMITTED";
    ReservationStatus["PAID"] = "PAID";
    ReservationStatus["DELETED"] = "DELETED";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
function translateMenuChoice(choice) {
    switch (choice) {
        case MenuChoice.MEAT: return 'Vlees';
        case MenuChoice.FISH: return 'Vis';
        case MenuChoice.VEGI: return 'Vegetarisch';
        default: return 'Onbekend';
    }
}
exports.translateMenuChoice = translateMenuChoice;
