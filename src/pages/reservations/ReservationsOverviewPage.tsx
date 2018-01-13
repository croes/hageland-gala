import * as React from 'react';
import * as firebase from 'firebase';
import { BusReservation, DinerReservation } from 'shared/model';
import { DinerList } from '../../components/DinerList';
import { Link } from 'react-router-dom';
import { BusReservationList } from '../../components/BusReservationList';

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
        diners.forEach((dinerReservations) => {
          this.setState({
            dinerReservations: [...this.state.dinerReservations, dinerReservations.val()]
          });
          return false;
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
        busReservations.forEach((busReservation) => {
          this.setState({
            dinerReservations: [...this.state.busReservations, busReservation.val()]
          });
          return false;
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
        <Link className="btn btn-primary" to={'/reservaties/diner/nieuw'}>Voeg diner reservatie toe</Link>

        <h2>Bus</h2>
        <BusReservationList
          reservations={busReservations}
          emptyListMessage={isLoadingBus ? 'Aan het laden...' : 'Geen reservaties gevonden.'}
        />
        <Link className="btn btn-primary" to={'/reservaties/bus/nieuw'}>Voeg bus reservatie toe</Link>

        <h2>Betalen</h2>
        <p>
          Betalen kan via overschrijving op rekeningnummer <b>BE92 3770 1835 1023</b>.
          Vermeld hierbij de namen van de ingeschrevenen, en de keuze van het hoofdgerecht.
        </p>
        <p>
          <b>Opgelet!</b> Een reservatie is pas finaal als de betaling ontvangen is.
          Reserveren kan tot <b>10 maart 2018</b>!
        </p>
      </div>
    );
  }

}