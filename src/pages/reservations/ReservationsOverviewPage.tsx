import * as React from 'react';
import * as firebase from 'firebase';
import { DinerReservation } from '../../model';
import { DinerList } from '../../components/DinerList';
import { Link } from 'react-router-dom';

interface ReservationsOverviewPageProps {
  user: firebase.User;
}

interface ReservationOverviewPageState {
  isLoading: boolean;
  dinerReservations: DinerReservation[];
}

export class ReservationsOverviewPage
  extends React.Component <ReservationsOverviewPageProps, ReservationOverviewPageState> {

  _dinerReservationsRef: firebase.database.Query;

  constructor(props: ReservationsOverviewPageProps) {
    super(props);
    this.state = {
      isLoading: true,
      dinerReservations: []
    };
  }

  componentDidMount() {
    const {user} = this.props;
    this.setState({...this.state, isLoading: true});
    this._dinerReservationsRef = firebase.database()
      .ref('reservations/diner')
      .orderByChild('createdBy')
      .equalTo(user.uid);
    this._dinerReservationsRef.on('value', (diners) => {
      this.setState({...this.state, isLoading: false, dinerReservations: []});
      if (diners) {
        diners.forEach((diner) => {
          this.setState({
            dinerReservations: [...this.state.dinerReservations, diner.val()]
          });
          return false;
        });
      }
    });
  }

  componentWillUnmount() {
    this._dinerReservationsRef.off();
  }

  render() {
    const {dinerReservations, isLoading} = this.state;
    const {user} = this.props;
    return (
      <div>
        <h1>{(user && user.displayName) ? `Reservaties voor ${user.displayName}` : 'Mijn reservaties'}</h1>
        <DinerList
          reservations={dinerReservations}
          emptyListMessage={isLoading ? 'Aan het laden...' : 'Geen reservaties gevonden.'}
        />
        <Link className="btn btn-primary" to={'/reservaties/nieuw'}>Voeg reservatie toe</Link>
      </div>
    );
  }

}