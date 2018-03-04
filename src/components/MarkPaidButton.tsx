import * as React from 'react';
import * as firebase from 'firebase';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as Button from 'react-bootstrap/lib/Button';
import { Reservation, ReservationStatus } from '../model';

interface MarkPaidButtonProps {
  reservation: Reservation;
}

interface MarkPaidButtonState {
  dialogOpen: boolean;
  error: Error | null;
}

export class MarkPaidButton extends React.Component<MarkPaidButtonProps, MarkPaidButtonState> {

  constructor(props: MarkPaidButtonProps) {
    super(props);
    this.state = {
      dialogOpen: false,
      error: null
    };
  }

  _showDialog = () => {
    this.setState({...this.state, dialogOpen: true});
  }

  _hideDialog = () => {
    this.setState({...this.state, dialogOpen: false});
  }

  _markPaidBtnClick = () => {
    const {reservation} = this.props;
    if (reservation.path && reservation.key) {
      const paidReservation: Reservation = {...reservation, status: ReservationStatus.PAID};
      firebase.database().ref(reservation.path).update(paidReservation).then(() => {
        this._hideDialog();
      }).catch();
    } else {
      throw new Error('Could not remove reservation. The reservation has no path or key defined');
    }
  }

  render() {
    const {dialogOpen, error} = this.state;
    const {reservation} = this.props;
    const payButtonDisabled = reservation.status !== ReservationStatus.SUBMITTED;
    return (
      <div>
        <Modal show={dialogOpen} onHide={this._hideDialog}>

          <Modal.Header closeButton={true}>
            <h2>Betaling goed ontvangen</h2>
          </Modal.Header>

          <Modal.Body>
            {!error &&
            <p>
              Weet je zeker dat je de betaling als 'goed ontvangen' wilt markeren?
              Dit kan niet ongedaan worden. De ingeschrevene zal een e-mail ter bevestiging van de betaling ontvangen.

              Naam van ingeschrevene: <b>{reservation.reserveeName.toUpperCase()}</b>
            </p>
            }

            {error &&
            (
              <div>
                <h1>Oops</h1>
                <p>Er is iets fout gelopen:</p>
                <pre>Error message:{error.message}</pre>
                <pre>Error stack: {error.stack}</pre>
              </div>
            )
            }
          </Modal.Body>

          <Modal.Footer>
            {!error && <Button
              bsStyle="primary"
              onClick={this._markPaidBtnClick}
            >
              Bevestig betaling
            </Button>
            }
            <Button
              onClick={this._hideDialog}
            >
              Annuleer
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          disabled={payButtonDisabled}
          bsSize="xs"
          bsStyle="success"
          onClick={this._showDialog}
        >
          {payButtonDisabled ? 'Reeds betaald' : 'Bevestig betaling'}
        </Button>
      </div>
    );
  }

}