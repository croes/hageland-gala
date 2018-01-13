import * as React from 'react';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Form from 'react-bootstrap/lib/Form';
import * as Col from 'react-bootstrap/lib/Col';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import * as ToggleButton from 'react-bootstrap/lib/ToggleButton';
import { BusReservation, ReservationStatus } from '../model';
import * as Button from 'react-bootstrap/lib/Button';
import * as HelpBlock from 'react-bootstrap/lib/HelpBlock';
import * as firebase from 'firebase';

interface BusReservationCreateFormProps {
  user: firebase.User;
  onSubmit: (busReservation: BusReservation) => Promise<void>;
}

interface BusReservationCreateFormState {
  reserveeName: string;
  dinerBus: boolean;
  partyBus: boolean;
  nightBus: boolean;
  submitting: boolean;
  submitError: Error | null;
}

const LEFT_COLUMN_SIZE = 4;
const RIGHT_COLUMN_SIZE = 12 - LEFT_COLUMN_SIZE;

export class BusReservationCreateForm
  extends React.Component<BusReservationCreateFormProps, BusReservationCreateFormState> {

  constructor(props: BusReservationCreateFormProps) {
    super(props);
    this.state = {
      reserveeName: '',
      dinerBus: false,
      partyBus: true,
      nightBus: true,
      submitting: false,
      submitError: null
    };
  }

  handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    const {reserveeName, dinerBus, partyBus, nightBus} = this.state;
    this.setState({...this.state, submitting: true});
    if (!reserveeName) {
      const error = new Error('Geen naam ingegeven');
      this.setState({...this.state, submitting: false, submitError: error});
      return;
    }
    const date: number = Date.now();
    const busReservation: BusReservation = {
      reserveeName: reserveeName,
      dinerBus: dinerBus,
      nightBus: nightBus,
      partyBus: partyBus,
      createdBy: this.props.user.uid,
      createdOn: date,
      status: ReservationStatus.SUBMITTED
    };
    this.props.onSubmit(busReservation).catch(error => {
      this.setState({...this.state, submitError: error});
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

          <FormGroup controlId="dinerBusField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Bus naar het diner?
              <HelpBlock>vertrek: 17u@Leuven</HelpBlock>
              <HelpBlock>aankomst: 18u@Galabal</HelpBlock>
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.dinerBus ? 'ja' : 'nee'}
                  onChange={(newValue) =>
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, dinerBus: (newValue as any as string) === 'ja'})
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

          <FormGroup controlId="partyBusField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Bus naar het avondfeest?
              <HelpBlock>vertrek: 21u@Leuven</HelpBlock>
              <HelpBlock>aankomst: 22u@Galabal</HelpBlock>
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.partyBus ? 'ja' : 'nee'}
                  onChange={(newValue) =>
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, partyBus: (newValue as any as string) === 'ja'})
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

          <FormGroup controlId="partyBusField">
            <Col componentClass={ControlLabel} sm={LEFT_COLUMN_SIZE}>
              Bus terug naar Leuven?
              <HelpBlock>vertrek: 3u45@Galabal</HelpBlock>
              <HelpBlock>aankomst: 5u00@Leuven</HelpBlock>
            </Col>
            <Col sm={RIGHT_COLUMN_SIZE}>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.nightBus ? 'ja' : 'nee'}
                  onChange={(newValue) =>
                    // tslint:disable-next-line:no-any
                    this.setState({...this.state, nightBus: (newValue as any as string) === 'ja'})
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