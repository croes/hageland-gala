import * as React from 'react';
import { EmailLogin } from '../components/EmailLogin';

export class LoginPage extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>Login</h1>
        <EmailLogin/>
      </div>
    );
  }

}