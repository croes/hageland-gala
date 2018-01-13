import * as React from 'react';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Form from 'react-bootstrap/lib/Form';
import * as Col from 'react-bootstrap/lib/Col';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import * as ToggleButton from 'react-bootstrap/lib/ToggleButton';
import { BusReservation, DinerReservation, MenuChoice, ReservationStatus, translateMenuChoice } from '../model';
import * as Button from 'react-bootstrap/lib/Button';
import * as HelpBlock from 'react-bootstrap/lib/HelpBlock';
import * as firebase from 'firebase';

interface DinerReservationCreateFormProps {
  user: firebase.User;
  onSubmit: (dinerReservation: DinerReservation, busReservation: BusReservation | null) => Promise<void>;
}

interface DinerReservationCreateFormState {
  reserveeName: string;
  menuChoice: MenuChoice;
  takesDinerBus: boolean;
  takesNightBus: boolean;
  submitting: boolean;
  submitError: Error | null;
}

const LEFT_COLUMN_SIZE = 4;
const RIGHT_COLUMN_SIZE = 12 - LEFT_COLUMN_SIZE;

export class DinerReservationCreateForm
  extends React.Component<DinerReservationCreateFormProps, DinerReservationCreateFormState> {

  constructor(props: DinerReservationCreateFormProps) {
    super(props);
    this.state = {
      reserveeName: '',
      menuChoice: MenuChoice.MEAT,
      takesDinerBus: false,
      takesNightBus: false,
      submitting: false,
      submitError: null
    };
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    this.setState({...this.state, submitting: true});
    const {reserveeName, menuChoice, takesDinerBus, takesNightBus} = this.state;
    if (!reserveeName) {
      const error = new Error('Geen naam ingegeven');
      this.setState({...this.state, submitting: false, submitError: error});
      return;
    }
    const date: number = Date.now();
    let busReservation: BusReservation | null = null;
    if (takesNightBus || takesDinerBus) {
      busReservation = {
        reserveeName: reserveeName,
        dinerBus: takesDinerBus,
        nightBus: takesNightBus,
        partyBus: false,
        createdBy: this.props.user.uid,
        createdOn: date,
        status: ReservationStatus.SUBMITTED
      };
    }
    const dinerReservation: DinerReservation = {
      reserveeName: reserveeName,
      menuChoice: menuChoice,
      createdBy: this.props.user.uid,
      createdOn: date,
      status: ReservationStatus.SUBMITTED
    };
    this.props.onSubmit(dinerReservation, busReservation).catch(error => {
      this.setState({...this.state, submitting: false, submitError: error});
    });
  }

  render() {
    if (this.state.submitError) {
      return (
        <div>
          <h1>Oops!</h1>
          <p>Er is iets misgelopen tijdens het plaatsen van de reservatie:</p>
          <pre>{this.state.submitError.message}</pre>
          <Button
            bsStyle="primary"
            block={true}
            onClick={() => {
              this.setState({...this.state, submitting: false, submitError: null});
            }}
          >
            Probeer opnieuw
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Form horizontal={true} onSubmit={this.handleSubmit}>
          <FormGroup controlId="reservationNameField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Naam
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <FormControl
                type="text"
                placeholder="Jan Janssens"
                value={this.state.reserveeName}
                onChange={(event) => {
                  // tslint:disable-next-line:no-any
                  this.setState({...this.state, reserveeName: (event.currentTarget as any).value});
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="dinerChoiceField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Menu
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.menuChoice}
                  onChange={(newValue) => {
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, menuChoice: (newValue as any as MenuChoice)});
                  }}
                >
                  <ToggleButton value={MenuChoice.MEAT}>
                    {translateMenuChoice(MenuChoice.MEAT)}
                  </ToggleButton>
                  <ToggleButton value={MenuChoice.FISH}>
                    {translateMenuChoice(MenuChoice.FISH)}
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </FormGroup>

          <FormGroup controlId="dinerBusField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Bus naar het diner?
              <HelpBlock>vertrekt om 17u aan het Gerechtsgebouw te Leuven</HelpBlock>
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.takesDinerBus ? 'ja' : 'nee'}
                  onChange={(newValue) =>
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, takesDinerBus: (newValue as any as string) === 'ja'})
                  }
                >
                  <ToggleButton value={'ja'}>
                   Ja
                  </ToggleButton>
                  <ToggleButton value={'nee'}>
                   Nee
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </FormGroup>

          <FormGroup controlId="dinerBusField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Bus terug naar Leuven?
              <HelpBlock>vertrekt om 3u45 op het galabal naar het Gerechtsgebouw te Leuven</HelpBlock>
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.takesNightBus ? 'ja' : 'nee'}
                  onChange={(newValue) =>
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, takesNightBus: (newValue as any as string) === 'ja'})
                  }
                >
                  <ToggleButton value={'ja'}>
                    Ja
                  </ToggleButton>
                  <ToggleButton value={'nee'}>
                    Nee
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </FormGroup>

          <Button
            type="submit"
            bsStyle="primary"
            block={true}
            disabled={this.state.submitting}
          >
            {this.state.submitting ? 'Reservatie in verwerking...' : 'Plaats reservatie'}
          </Button>
        </Form>
      </div>
    );
  }

}