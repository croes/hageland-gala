import * as React from 'react';
import { DinerReservation, ReservationStatus, translateMenuChoice } from '../model';
import * as Table from 'react-bootstrap/lib/Table';
import { CancelReservationButton } from './CancelReservationButton';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { PayButton } from './PayButton';

interface DinerListProps {
  reservations: DinerReservation[];
  emptyListMessage: string;
  onPayButtonClick?: (clickedReservation: DinerReservation) => void;
}

export class DinerList extends React.Component<DinerListProps, {}> {

  _handlePayButtonClick = (reservation: DinerReservation) => {
    if (this.props.onPayButtonClick) {
      this.props.onPayButtonClick(reservation);
    }
  }

  renderRows() {
    const {reservations} = this.props;
    if (reservations.length === 0) {
      return (
        <tr>
          <td colSpan={5} style={{textAlign: 'center'}}><b>{this.props.emptyListMessage}</b></td>
        </tr>
      );
    }
    return reservations.map((reservation, i) => {
      const reservationDate = new Date(reservation.createdOn);
      const reservationDateString = reservationDate.toLocaleDateString() + ' ' + reservationDate.toLocaleTimeString();
      const paid = reservation.status === ReservationStatus.PAID;

      return (
        <tr key={'reservation' + i}>
          <td>{reservation.reserveeName}</td>
          <td>{translateMenuChoice(reservation.menuChoice)}</td>
          <td>{reservationDateString}</td>
          <td>{paid ? 'Ja' : 'Nee'}</td>
          <td>
            <ButtonToolbar>
              <PayButton reservation={reservation} />
              <CancelReservationButton reservation={reservation} />
            </ButtonToolbar>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Table responsive={true} striped={true} hover={true} bordered={true}>
          <thead>
          <tr>
            <th>Naam</th>
            <th>Menu</th>
            <th>Datum reservatie</th>
            <th>Betaald?</th>
            <th>Acties</th>
          </tr>
          </thead>
          <tbody>
          {this.renderRows()}
          </tbody>
        </Table>
      </div>
    );
  }

}