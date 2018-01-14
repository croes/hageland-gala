import * as React from 'react';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as Button from 'react-bootstrap/lib/Button';

interface ConfirmationDialogProps {
  showDialog: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export class ConfirmationDialog extends React.Component<ConfirmationDialogProps, {}> {

  render() {
    const {showDialog, onConfirm, onCancel, children} = this.props;
    return (
      <Modal show={showDialog} onHide={onCancel}>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="success"
            onClick={() => onConfirm()}
          >
            Ja
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => onCancel()}
          >
            Nee
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

}