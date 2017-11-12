import * as React from 'react';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as firebase from 'firebase';
import * as HelpBlock from 'react-bootstrap/lib/HelpBlock';
import * as Panel from 'react-bootstrap/lib/Panel';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as Col from 'react-bootstrap/lib/Col';
import * as Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

interface RegisterPageState {
  formValid: boolean;
  registerErrorMessage: string | null;
  registerSuccess: boolean;
  registering: boolean;
}

export class RegisterPage extends React.Component<{}, RegisterPageState> {

  _nameInput: HTMLInputElement;
  _emailInput: HTMLInputElement;
  _passwordInput: HTMLInputElement;
  _confirmPasswordInput: HTMLInputElement;

  constructor(props: {}) {
    super(props);
    this.state = {
      formValid: false,
      registerErrorMessage: null,
      registerSuccess: false,
      registering: false
    };
  }

  validateForm = () => {
    const nameValue = this._nameInput.value;
    const passwordValue = this._passwordInput.value;
    const confirmedPassword = this._confirmPasswordInput.value;
    const formValid = nameValue.length > 0 && passwordValue === confirmedPassword;
    this.setState({...this.state, formValid});
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    const emailValue = this._emailInput.value;
    const passwordValue = this._passwordInput.value;
    const name = this._nameInput.value;
    this.setState({...this.state, registering: true});
    firebase.auth().createUserWithEmailAndPassword(
      emailValue,
      passwordValue
    ).then(() => {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('Er is iets misgelopen bij de registratie');
      }
      return user.updateProfile({
        displayName: name,
        photoURL: null
      });
    }).then(() => {
      this.setState({...this.state, registering: false, registerSuccess: true});
    }).catch(error => {
      this.setState({...this.state, registering: false, registerSuccess: false, registerErrorMessage: error.message});
    });
  }

  renderForm() {
    const {formValid, registering, registerErrorMessage} = this.state;
    const mismatchingPasswords = (this._passwordInput && this._passwordInput.value.length > 0 && !formValid);
    return (
      <div>
        <h1>
          Registratie
        </h1>
        <Form horizontal={true} onSubmit={this.handleSubmit}>
          <FormGroup controlId="registerName">
            <Col componentClass={ControlLabel} sm={2}>
              Naam
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Jan Janssens"
                inputRef={(ref) => this._nameInput = ref}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="registerEmail">
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

          <FormGroup controlId="registerPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Wachtwoord
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Wachtwoord"
                onChange={this.validateForm}
                inputRef={(ref) => this._passwordInput = ref}
              />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="registerPasswordConfirm"
            onChange={this.validateForm}
            validationState={mismatchingPasswords ? 'error' : undefined}
          >
            <Col componentClass={ControlLabel} sm={2}>
              Bevestig wachtwoord
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Bevestig wachtwoord"
                inputRef={(ref) => this._confirmPasswordInput = ref}
              />
              {mismatchingPasswords && <HelpBlock>Paswoorden komen niet overeen</HelpBlock>}
            </Col>
          </FormGroup>

          <Button type="submit" disabled={!formValid} block={true} bsStyle="primary">
            {registering ? 'Registratie in behandeling...' : 'Registreer'}
          </Button>
        </Form>
        {registerErrorMessage && this.renderFormSubmitError()}
      </div>
    );
  }

  renderFormSubmitError() {
    return (
      <Panel style={{marginTop: '1em'}} header="Er is een fout tijdens registratie! Probeer opnieuw." bsStyle="danger">
        {this.state.registerErrorMessage}
      </Panel>
    );
  }

  renderFormSubmitSuccess() {
    const user = firebase.auth().currentUser;
    return (
      <div>
        <h1>
          Registratie succesvol!
        </h1>
        <p>
          {user && `U bent nu geregistreerd als ${user.displayName}.`}
          <Link to="/diner">Reserveer een diner.</Link>
        </p>
      </div>
    );
  }

  render() {
    const {registerSuccess} = this.state;
    if (registerSuccess) {
      return this.renderFormSubmitSuccess();
    }
    return this.renderForm();
  }

}