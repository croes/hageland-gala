import * as React from 'react';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as Button from 'react-bootstrap/lib/Button';
import { BANK_ACCOUNT, DINER_PRICE, END_OF_RESERVATION_DATE_STRING, DINER_STUDENT_PRICE } from '../constants';
import { Reservation, ReservationStatus } from '../model';

interface PayButtonProps {
  reservation: Reservation;
}

interface PayButtonState {
  dialogOpen: boolean;
}

export class PayButton extends React.Component<PayButtonProps, PayButtonState> {

  constructor(props: PayButtonProps) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  _showDialog = () => {
    this.setState({...this.state, dialogOpen: true});
  }

  _hideDialog = () => {
    this.setState({...this.state, dialogOpen: false});
  }

  render() {
    const {dialogOpen} = this.state;
    const {reservation} = this.props;
    const payButtonDisabled = reservation.status !== ReservationStatus.SUBMITTED;
    return (
        <div>
          <Modal show={dialogOpen} onHide={this._hideDialog}>

            <Modal.Header closeButton={true}>
              <h2>Betalen</h2>
            </Modal.Header>

            <Modal.Body>
              <p>
                Betalen kan via overschrijving op rekeningnummer <b>{BANK_ACCOUNT}</b>.
                Vermeld hierbij de namen van de ingeschrevenen, en de keuze van het hoofdgerecht.
                De prijs is {DINER_PRICE} euro per persoon ({DINER_STUDENT_PRICE} euro p.p. voor actieve studenten).
              </p>

              <p>
                Het galabalcomité markeert de reservatie als "Betaald" wanneer de overschrijving voltooid is.
                Ook hier krijgt u een bevestigingsmail van.
              </p>

              <p>
                <b>Opgelet!</b> Een reservatie is pas finaal als de betaling afgerond is.
                Gelieve te betalen voor <b>{END_OF_RESERVATION_DATE_STRING}</b>!
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                bsStyle="primary"
                onClick={this._hideDialog}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            disabled={payButtonDisabled}
            bsSize="xs"
            bsStyle="success"
            onClick={this._showDialog}
          >
            Betaal
          </Button>
        </div>
    );
  }

}