import * as React from 'react';
import { Modal } from 'react-bootstrap';
import * as Col from 'react-bootstrap/lib/Col';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Button from 'react-bootstrap/lib/Button';

interface PasswordPromptProps {
  showPrompt: boolean;
  message: string;
  onPasswordEntered: ((password: string) => void) | null;
  onHide: (() => void) | null;
}

interface PasswordPromptState {
  passwordValue: string;
}

export class PasswordPrompt extends React.Component<PasswordPromptProps, PasswordPromptState> {

  constructor(props: PasswordPromptProps) {
    super(props);
    this.state = {
      passwordValue: ''
    };
  }

  handlePasswordInputChange = (event: React.FormEvent<FormControl>) => {
    // tslint:disable-next-line:no-any
    this.setState({...this.state, passwordValue: (event.currentTarget as any).value});
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    if (this.props.onPasswordEntered) {
      this.props.onPasswordEntered(this.state.passwordValue);
    }
  }

  render() {
    const {showPrompt, message, onHide} = this.props;
    const {passwordValue} = this.state;
    return (
        <Modal show={showPrompt} onHide={onHide || (() => undefined)}>
          <Modal.Body>
            <Col sm={12}>{message}</Col>
            <Form horizontal={true} onSubmit={this.handleSubmit}>
              <FormGroup controlId="loginPassword">
                <Col componentClass={ControlLabel} sm={3}>
                  Wachtwoord
                </Col>
                <Col sm={9}>
                  <FormControl
                      type="password"
                      value={passwordValue}
                      placeholder="Wachtwoord"
                      onChange={this.handlePasswordInputChange}
                  />
                </Col>
              </FormGroup>
              <Button bsStyle="primary" type="submit">
                Bevestig
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
    );
  }

}