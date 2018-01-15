import * as React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { BusReservationCreateForm } from '../../components/BusReservationCreateForm';

interface AddBusReservationPageProps {
  user: firebase.User;
}

interface AddBusReservationPageState {
  finishedCreating: boolean;
}

export class AddBusReservationPage
  extends React.Component<AddBusReservationPageProps, AddBusReservationPageState> {

  constructor(props: AddBusReservationPageProps) {
    super(props);
    this.state = {
      finishedCreating: false
    };
  }

  render() {
    const {user} = this.props;
    const {finishedCreating} = this.state;
    if (finishedCreating) {
      return (
        <div>
          <h1>Reservatie geplaatst!</h1>
          <p>
            Bedankt! Je reservatie is genoteerd.
            Een bevestigingsmail is verstuurd naar <b>{user.email}</b>.
          </p>
          <Link to="/reservaties">Ga terug naar Mijn Reservaties</Link>
        </div>
      );
    }
    return (
      <BusReservationCreateForm
        user={user}
        onSubmit={(busReservation) => {
          this.setState({...this.state, finishedCreating: true});
          return new Promise((resolve, reject) => {
            firebase.database()
              .ref(`reservations/bus`)
              .push(busReservation, (error) => {
                if (error) {
                  reject(error);
                }
                resolve();
              });
          });
        }}
      />
    );
  }
}