
export enum MenuChoice {
  MEAT = 'MEAT',
  FISH = 'FISH',
  VEGI = 'VEGI'
}

export enum ReservationStatus {
  SUBMITTED = 'SUBMITTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED'
}

export interface Reservation {
  key?: string;
  path?: string;
  reserveeName: string;
  createdOn: number; // Date.now number
  createdBy: string; // firebase.User.uid
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

export function translateMenuChoice(choice: MenuChoice) {
  switch (choice) {
    case MenuChoice.MEAT: return 'Vlees';
    case MenuChoice.FISH: return 'Vis';
    case MenuChoice.VEGI: return 'Vegetarisch';
    default: return 'Onbekend';
  }
}