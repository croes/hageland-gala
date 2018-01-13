import * as React from 'react';
import { DinerReservation, ReservationStatus, translateMenuChoice } from '../model';
import * as Table from 'react-bootstrap/lib/Table';

interface DinerListProps {
  reservations: DinerReservation[];
  emptyListMessage: string;
}

export class DinerList extends React.Component<DinerListProps, {}> {

  renderRows() {
    const {reservations} = this.props;
    if (reservations.length === 0) {
      return (
        <tr>
          <td colSpan={4} style={{textAlign: 'center'}}><b>{this.props.emptyListMessage}</b></td>
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
          <td>{paid ? 'Jas' : 'Nee'}</td>
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