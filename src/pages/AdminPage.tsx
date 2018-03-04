import * as React from 'react';
import * as firebase from 'firebase';
import { DinerReservation } from '../model';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { b64DecodeUnicode } from '../util';
import { BusReservation } from '../model';
import { AdminDinerList } from '../components/AdminDinerList';
import { BusReservationList } from '../components/BusReservationList';

interface AdminPageState {
  isLoading: boolean;
  user: firebase.User | null;
  isAdmin: boolean;
  isLoadingDiner: boolean;
  isLoadingBus: boolean;
  dinerReservations: DinerReservation[];
  busReservations: BusReservation[];
}

class AdminPageComponent extends React.Component<RouteComponentProps<{}>, AdminPageState> {

  _dinerReservationsRef: firebase.database.Query;
  _busReservationsRef: firebase.database.Query;

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      user: null,
      isAdmin: false,
      isLoading: true,
      isLoadingDiner: false,
      isLoadingBus: false,
      dinerReservations: [],
      busReservations: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        this.setState({user, isLoading: false, isAdmin: false});
        return;
      }
      user.getIdToken().then(idToken => {
        const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
        const isAdmin = !!payload.admin;
        this.setState({...this.state, user, isLoading: false, isAdmin});

        if (isAdmin) {
          this.setState({...this.state, isLoadingDiner: true, isLoadingBus: true});
          this._dinerReservationsRef = firebase.database()
            .ref('reservations/diner');
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
            .ref('reservations/bus');

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
      });
    });
  }

  componentWillUnmount() {
    this._dinerReservationsRef.off();
    this._busReservationsRef.off();
  }

  render() {
    const {isLoading, user, isAdmin, dinerReservations, busReservations, isLoadingBus, isLoadingDiner} = this.state;
    const dinerBusReservations = busReservations.filter(busReservation => busReservation.dinerBus);
    const partyBusReservations = busReservations.filter(busReservation => busReservation.partyBus);
    const nightBusReservations = busReservations.filter(busReservation => busReservation.nightBus);

    if (isLoading) {
      return (
        <h1>Loading....</h1>
      );
    }

    if (!user) {
      return (
        <Redirect to="/login"/>
      );
    }

    if (!isAdmin) {
      return (
        <div>
          <h1>Onvoldoende toegangsrechten.</h1>
          <p>De 'Admin' pagina is enkel toegankelijk voor leden van het galabalcomite.</p>
        </div>
      );
    }

    const dinerMessage = isLoadingDiner ? 'Aan het laden...' : 'Geen reservaties gevonden';
    const busMessage = isLoadingBus ? 'Aan het laden...' : 'Geen reservaties gevonden';

    return (
      <div>
        <h1>Galabal Admin</h1>
        <h2>Reservaties Diner</h2>
        <AdminDinerList emptyListMessage={dinerMessage} reservations={dinerReservations} />
        <h2>Buslijst Diner</h2>
        <BusReservationList reservations={dinerBusReservations} emptyListMessage={busMessage}/>
        <h2>Buslijst Avondfeest</h2>
        <BusReservationList reservations={partyBusReservations} emptyListMessage={busMessage}/>
        <h2>Buslijst Nachtbus</h2>
        <BusReservationList reservations={nightBusReservations} emptyListMessage={busMessage}/>
      </div>
    );
  }

}

export const AdminPage = withRouter(AdminPageComponent);