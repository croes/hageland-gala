import * as React from 'react';
import * as firebase from 'firebase';
import { BusReservation, DinerReservation } from '../../model';
import { DinerList } from '../../components/DinerList';
import { Link } from 'react-router-dom';
import { BusReservationList } from '../../components/BusReservationList';
import * as Glyphicon from 'react-bootstrap/lib/Glyphicon';

interface ReservationsOverviewPageProps {
  user: firebase.User;
}

interface ReservationOverviewPageState {
  isLoadingDiner: boolean;
  isLoadingBus: boolean;
  dinerReservations: DinerReservation[];
  busReservations: BusReservation[];
}

export class ReservationsOverviewPage
  extends React.Component <ReservationsOverviewPageProps, ReservationOverviewPageState> {

  _dinerReservationsRef: firebase.database.Query;
  _busReservationsRef: firebase.database.Query;

  constructor(props: ReservationsOverviewPageProps) {
    super(props);
    this.state = {
      isLoadingDiner: true,
      isLoadingBus: true,
      dinerReservations: [],
      busReservations: []
    };
  }

  componentDidMount() {
    const {user} = this.props;
    this.setState({...this.state, isLoadingDiner: true, isLoadingBus: true});
    this._dinerReservationsRef = firebase.database()
      .ref('reservations/diner')
      .orderByChild('createdBy')
      .equalTo(user.uid);
    this._dinerReservationsRef.on('value', (diners) => {
      this.setState({...this.state, isLoadingDiner: false, dinerReservations: []});
      if (diners) {
        const newReservations: DinerReservation[] = [];
        diners.forEach((dinerReservation) => {
          const dinerReservationWithKey = {
            ...dinerReservation.val(),
            key: dinerReservation.key,
            path: dinerReservation.ref.path
          };
          newReservations.push(dinerReservationWithKey);
          return false;
        });
        this.setState({
          dinerReservations: newReservations
        });
      }
    });

    this._busReservationsRef = firebase.database()
      .ref('reservations/bus')
      .orderByChild('createdBy')
      .equalTo(user.uid);

    this._busReservationsRef.on('value', (busReservations) => {
      this.setState({...this.state, isLoadingBus: false, busReservations: []});
      if (busReservations) {
        const newReservations: BusReservation[] = [];
        busReservations.forEach((busReservation) => {
          const busReservationWithKey = {
            ...busReservation.val(),
            key: busReservation.key,
            path: busReservation.ref.path
          };
          newReservations.push(busReservationWithKey);
          return false;
        });
        this.setState({
          busReservations: newReservations
        });
      }
    });
  }

  componentWillUnmount() {
    this._dinerReservationsRef.off();
    this._busReservationsRef.off();
  }

  render() {
    const {dinerReservations, busReservations, isLoadingDiner, isLoadingBus} = this.state;
    const {user} = this.props;
    return (
      <div>
        <h1>{(user && user.displayName) ? `Reservaties voor ${user.displayName}` : 'Mijn reservaties'}</h1>
        <h2>Diner</h2>
        <DinerList
          reservations={dinerReservations}
          emptyListMessage={isLoadingDiner ? 'Aan het laden...' : 'Geen reservaties gevonden.'}
        />
        <Link className="btn btn-primary" to={'/reservaties/diner/nieuw'}>
          <Glyphicon glyph="plus"/>{' '}Voeg diner reservatie toe
        </Link>

        <h2>Bus</h2>
        <BusReservationList
          reservations={busReservations}
          emptyListMessage={isLoadingBus ? 'Aan het laden...' : 'Geen reservaties gevonden.'}
        />
        <Link className="btn btn-primary" to={'/reservaties/bus/nieuw'}>
          <Glyphicon glyph="plus"/>{' '}Voeg bus reservatie toe
        </Link>
      </div>
    );
  }

}