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
        onSubmit={(dinerReservation) => {
          this.setState({...this.state, finishedCreating: true});
          return Promise.resolve();
        }}
      />
    );
  }
}