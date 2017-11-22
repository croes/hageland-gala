import * as React from 'react';
import { Modal } from 'react-bootstrap';
import * as Col from 'react-bootstrap/lib/Col';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';

interface PasswordPromptProps {
  showPrompt: boolean;
  message: string;
  onPasswordEntered: (password: string) => void;
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
    this.setState({...this.state, passwordValue: event.currentTarget.value});
  }

  render() {
    const {showPrompt, email, message} = this.props;
    return (
        <Modal show={showPrompt} onHide={() => {}}>
          <Modal.Header>
            Geef paswoord in
          </Modal.Header>
          <Modal.Body>
            {message}
            <Form horizontal={true}>
              <FormGroup controlId="loginPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Wachtwoord
                </Col>
                <Col sm={10}>
                  <FormControl
                      type="password"
                      placeholder="Wachtwoord"
                      onChange={this.handlePasswordInputChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
    );
  }

}