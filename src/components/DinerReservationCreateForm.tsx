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
import * as Panel from 'react-bootstrap/lib/Panel';

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
    const {reserveeName, menuChoice, takesDinerBus, takesNightBus} = this.state;
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
      this.setState({...this.state, submitError: error});
    });
  }

  render() {
    return (
      <div>
        <Form horizontal={true} onSubmit={this.handleSubmit}>
          <FormGroup controlId="reservationNameField">
            <Col componentClass={ControlLabel} sm={2}>
              Naam
            </Col>
            <Col sm={10}>
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
            <Col componentClass={ControlLabel} sm={2}>
              Menu
            </Col>
            <Col sm={10}>
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
                  <ToggleButton value={MenuChoice.VEGI}>
                    {translateMenuChoice(MenuChoice.VEGI)}
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </FormGroup>

          <FormGroup controlId="dinerBusField">
            <Col componentClass={ControlLabel} sm={2}>
              Bus naar het diner?
              <HelpBlock>vertrekt om 17u vanop het Ladeuzeplein, Leuven</HelpBlock>
            </Col>
            <Col sm={10}>
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
            <Col componentClass={ControlLabel} sm={2}>
              Bus terug naar Leuven?
              <HelpBlock>vertrekt om 04u op het galabal, rijdt naar het Ladeuzeplein, Leuven</HelpBlock>
            </Col>
            <Col sm={10}>
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
        {this.state.submitError && (
          <Panel bsStyle="danger" header="Fout tijdens het verwerken van de reservatie">
            {this.state.submitError.message}
          </Panel>
        )}
      </div>
    );
  }

}