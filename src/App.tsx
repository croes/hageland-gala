import './App.css';
import * as React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { Switch, Redirect, Route } from 'react-router';
import { WelcomePage } from './pages/WelcomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DinerPage } from './pages/DinerPage';
import { AvondFeestPage } from './pages/AvondFeestPage';
import { LocatiePage } from './pages/LocatiePage';
import { BusPage } from './pages/BusPage';
import { ReservationsPage } from './pages/reservations/ReservationsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TOSPage } from './pages/TOSPage';
import { AdminPage } from './pages/AdminPage';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container">
        <NavigationBar/>
        <Switch>
          <Redirect exact={true} from="/" to="/welkom"/>
          <Route path="/welkom" component={WelcomePage}/>
          <Route path="/diner" component={DinerPage}/>
          <Route path="/avondfeest" component={AvondFeestPage}/>
          <Route path="/locatie" component={LocatiePage}/>
          <Route path="/bus" component={BusPage}/>
          <Route path="/registreer" component={RegisterPage}/>
          <Route path="/reservaties" component={ReservationsPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/privacy" component={PrivacyPolicyPage}/>
          <Route path="/tos" component={TOSPage}/>
          <Route path="/admin" component={AdminPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
