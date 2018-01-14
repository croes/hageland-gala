import * as React from 'react';
import { BusReservation } from '../model';
import * as Table from 'react-bootstrap/lib/Table';
import { CancelReservationButton } from './CancelReservationButton';

interface BusReservationListProps {
  reservations: BusReservation[];
  emptyListMessage: string;
}

export class BusReservationList extends React.Component<BusReservationListProps, {}> {

  renderRows() {
    const {reservations} = this.props;
    if (reservations.length === 0) {
      return (
        <tr>
          <td colSpan={6} style={{textAlign: 'center'}}><b>{this.props.emptyListMessage}</b></td>
        </tr>
      );
    }
    return reservations.map((reservation, i) => {
      const reservationDate = new Date(reservation.createdOn);
      const reservationDateString = reservationDate.toLocaleDateString() + ' ' + reservationDate.toLocaleTimeString();
      return (
        <tr key={'reservation' + i}>
          <td>{reservation.reserveeName}</td>
          <td>{reservation.dinerBus ? 'Ja' : 'Nee'}</td>
          <td>{reservation.partyBus ? 'Ja' : 'Nee'}</td>
          <td>{reservation.nightBus ? 'Ja' : 'Nee'}</td>
          <td>{reservationDateString}</td>
          <td>
            <CancelReservationButton reservation={reservation}/>
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
            <th>Bus naar diner</th>
            <th>Bus naar avondfeest</th>
            <th>Nachtbus terug naar Leuven</th>
            <th>Datum reservatie</th>
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