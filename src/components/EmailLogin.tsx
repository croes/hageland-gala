import * as React from 'react';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as Col from 'react-bootstrap/lib/Col';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Button from 'react-bootstrap/lib/Button';
import * as firebase from 'firebase';
import { RouteComponentProps } from 'react-router-dom';
import * as Panel from 'react-bootstrap/lib/Panel';
import { withRouter } from 'react-router';

interface EmailLoginState {
  isLoggingIn: boolean;
  errorMessage: string | null;
}

class EmailLoginComponent extends React.Component<RouteComponentProps<{}>, EmailLoginState> {

  _emailInput: HTMLInputElement;
  _passwordInput: HTMLInputElement;

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      isLoggingIn: false,
      errorMessage: null
    };
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    const email = this._emailInput.value;
    const password = this._passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.props.history.push('/reservaties');
    }).catch(error => {
      this.setState({...this.state, isLoggingIn: false, errorMessage: error.message});
    });
  }

  renderLoginButton() {
    const {isLoggingIn} = this.state;
    const text = isLoggingIn ? 'Bezig met aanmelden....' : 'Aanmelden';
    return <Button type="submit" bsStyle="primary" disabled={isLoggingIn} block={true}>{text}</Button>;
  }

  renderErrorMessage() {
    const {errorMessage} = this.state;
    return (
      <Panel header="Er is een fout tijdens het aanmelden! Probeer opnieuw." bsStyle="error">
        {errorMessage}
      </Panel>
    );
  }

  render() {
    const {errorMessage} = this.state;
    return (
      <Form horizontal={true} onSubmit={this.handleSubmit}>
        <FormGroup controlId="loginEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              placeholder="Email"
              inputRef={(ref) => this._emailInput = ref}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="loginPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Wachtwoord
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              placeholder="Wachtwoord"
              inputRef={(ref) => this._passwordInput = ref}
            />
          </Col>
        </FormGroup>
        {this.renderLoginButton()}
        {errorMessage && this.renderErrorMessage()}
      </Form>
    );
  }
}

export const EmailLogin = withRouter<{}>(EmailLoginComponent);