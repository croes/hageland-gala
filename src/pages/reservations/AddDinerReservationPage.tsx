import * as React from 'react';
import { DinerReservationCreateForm } from '../../components/DinerReservationCreateForm';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { BANK_ACCOUNT } from '../../constants';

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
            Bedankt! Je reservatie is genoteerd.
            Een bevestiginsmail is verstuurd naar <b>{user.email}</b>.
          </p>

          <h2>Betalen</h2>
          <p>
            Betalen kan via overschrijving op rekeningnummer <b>{BANK_ACCOUNT}</b>.
            Vermeld hierbij de namen van de ingeschrevenen, en de keuze van het hoofdgerecht.
          </p>
          <p>
            <b>Opgelet!</b> Een reservatie is pas finaal als de betaling ontvangen is.
            Gelieve te betalen voor <b>10 maart 2018</b>!
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