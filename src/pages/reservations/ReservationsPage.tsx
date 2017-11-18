import * as React from 'react';
import * as firebase from 'firebase';
import { DinerReservation } from '../../model';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { AddDinerReservationPage } from './AddDinerReservationPage';
import { ReservationsOverviewPage } from './ReservationsOverviewPage';

interface ReservationsPageState {
  isLoading: boolean;
  user: firebase.User | null;
  reservations: DinerReservation[];
}

class ReservationsPageComponent extends React.Component<RouteComponentProps<{}>, ReservationsPageState> {

  constructor(props: RouteComponentProps<{}>) {
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
    const {match} = this.props;
    const {isLoading, user} = this.state;
    if (isLoading) {
      return (
        <h1>Loading....</h1>
      );
    }

    if (!user) {
      return (
        <Redirect to="/login"/>
      )
    }
    return (
      <Switch>
        <Route path={`${match.url}/nieuw`} render={() => <AddDinerReservationPage user={user} />}/>
        <Route path={`${match.url}`} component={ReservationsOverviewPage}/>
      </Switch>
    );
  }

}

export const ReservationsPage = withRouter(ReservationsPageComponent);