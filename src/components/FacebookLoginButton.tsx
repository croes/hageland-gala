import * as React from 'react';
import * as Button from 'react-bootstrap/lib/Button';
import * as firebase from 'firebase';
import { RouteComponentProps, withRouter } from 'react-router';

class FacebookLoginButtonComponent extends React.Component<RouteComponentProps<{}>, {}> {

  handleButtonClick = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    firebase.auth().signInWithRedirect(provider).then(() => {
      this.props.history.push('/reservaties');
    });
  }

  render() {
    return (
      <Button bsSize="large" bsStyle="primary" block={true} onClick={this.handleButtonClick}>
        <i className="fa fa-facebook-official" /> Login via Facebook
      </Button>
    );
  }
}

export const FacebookLoginButton = withRouter<{}>(FacebookLoginButtonComponent);