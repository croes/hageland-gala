import * as React from 'react';
import { Reservation } from '../model';
import * as Button from 'react-bootstrap/lib/Button';
import { ReservationStatus } from '../model';
import { ConfirmationDialog } from './ConfirmationDialog';
import * as firebase from 'firebase';

interface CancelReservationButtonProps {
  reservation: Reservation;
}

interface CancelReservationButtonState {
  showDialog: boolean;
}

export class CancelReservationButton
  extends React.Component<CancelReservationButtonProps, CancelReservationButtonState> {

  constructor(props: CancelReservationButtonProps) {
    super(props);
    this.state = {
      showDialog: false
    };
  }

  _handleCancelButtonClick = () => {
    this.setState({...this.state, showDialog: true});
  }

  _handleConfirm = () => {
    const {reservation} = this.props;
    if (reservation.path && reservation.key) {
      firebase.database().ref(reservation.path).remove().then(() => {
        this.setState({...this.state, showDialog: false});
      });
    } else {
      throw new Error('Could not remove reservation. The reservation has no path or key defined');
    }
  }

  _handleCancel = () => {
    this.setState({...this.state, showDialog: false});
  }

  render() {
    const {reservation} = this.props;
    const {showDialog} = this.state;
    const cancelButtonDisabled = reservation.status !== ReservationStatus.SUBMITTED;
    return (
      <div>
        <Button
          bsSize="xs"
          bsStyle="danger"
          disabled={cancelButtonDisabled}
          onClick={() => this._handleCancelButtonClick()}
        >
          Annuleer
        </Button>
        <ConfirmationDialog
          showDialog={showDialog}
          onConfirm={this._handleConfirm}
          onCancel={this._handleCancel}
        >
          Weet je zeker dat je de reservering voor <b>{reservation.reserveeName.toUpperCase()}</b> wil annuleren?
        </ConfirmationDialog>
      </div>

    );
  }

}