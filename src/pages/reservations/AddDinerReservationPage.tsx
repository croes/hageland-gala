import * as React from 'react';
import { DinerReservationCreateForm } from '../../components/DinerReservationCreateForm';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

interface AddDinerReservationPageProps {
  user: firebase.User;
}

interface AddDinerReservationPageState {
  finishedCreating: boolean;
}

export class AddDinerReservationPage
  extends React.Component<AddDinerReservationPageProps, AddDinerReservationPageState> {

  constructor(props: AddDinerReservationPageProps) {
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
          <h1>Reservatie geplaatst</h1>
          <p>
            U kan uw reservatie later nog aanpassen.
          </p>
          <Link to="/reservaties">Ga terug naar Mijn Reservaties</Link>
        </div>
      );
    }
    return (
      <DinerReservationCreateForm
        user={user}
        onSubmit={(dinerReservation, busReservation) => {
          this.setState({...this.state, finishedCreating: true});
          const createDinerPromise = new Promise<void>((resolve, reject) => {
            firebase.database()
              .ref(`reservations/diner`)
              .push(dinerReservation, (error) => {
                if (error) {
                  reject(error);
                }
                resolve();
              });
          });
          let creationPromises: Promise<void>[] = [createDinerPromise];
          if (busReservation) {
            const createBusReservationPromise = new Promise<void>((resolve, reject) => {
              firebase.database()
                .ref('reservations/bus')
                .push(busReservation, (error) => {
                  if (error) {
                    reject(error);
                  }
                  resolve();
                });
            });
            creationPromises.push(createBusReservationPromise);
          }
          return Promise.all(creationPromises).then(() => undefined);
        }}
      />
    );
  }
}