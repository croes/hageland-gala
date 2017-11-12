import * as React from 'react';
import * as firebase from 'firebase';
import { DinerList } from '../components/DinerList';
import { DinerReservation } from '../model';
import { DinerReservationCreateForm } from '../components/DinerReservationCreateForm';

interface ReservationsPageState {
  isLoading: boolean;
  user: firebase.User | null;
  reservations: DinerReservation[];
}

export class ReservationsPage extends React.Component<{}, ReservationsPageState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      reservations: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({...this.state, user, isLoading: false});
    });
  }

  render() {
    const {isLoading, user, reservations} = this.state;
    if (isLoading || !user) {
      return (
        <h1>Loading....</h1>
      );
    }
    return (
      <div>
        <h1>Reservaties diner</h1>
        <DinerList reservations={reservations}/>
        <DinerReservationCreateForm
          user={user}
          onSubmit={(dinerReservation) => {
            this.setState({...this.state, reservations: [...reservations, dinerReservation]});
            return Promise.resolve();
          }}
        />
      </div>
    );
  }

}