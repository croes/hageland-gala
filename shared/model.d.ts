export declare enum MenuChoice {
    MEAT = "MEAT",
    FISH = "FISH",
    VEGI = "VEGI",
}
export declare enum ReservationStatus {
    SUBMITTED = "SUBMITTED",
    PAID = "PAID",
    DELETED = "DELETED",
}
export interface Reservation {
    reserveeName: string;
    createdOn: number;
    createdBy: string;
    status: ReservationStatus;
}
export interface DinerReservation extends Reservation {
    menuChoice: MenuChoice;
}
export interface BusReservation extends Reservation {
    dinerBus: boolean;
    partyBus: boolean;
    nightBus: boolean;
}
export declare function translateMenuChoice(choice: MenuChoice): "Vlees" | "Vis" | "Vegetarisch" | "Onbekend";
