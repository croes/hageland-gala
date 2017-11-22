import * as React from 'react';
import * as Button from 'react-bootstrap/lib/Button';
import * as firebase from 'firebase';
import { RouteComponentProps, withRouter } from 'react-router';

// tslint:disable:no-console

interface FacebookLoginButtonState {
  showPasswordPrompt: boolean;
  passwordPrompResult: string;
}

class FacebookLoginButtonComponent extends React.Component<RouteComponentProps<{}>, FacebookLoginButtonState> {

  promptUserForPassword = () => {
   return "test";
  }

  handleButtonClick = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    const auth = firebase.auth();
    auth.signInWithPopup(provider).then((result) => {
      console.log(result.user);
      this.props.history.push('/reservaties');
    }).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
        const email = error.email;
        auth.fetchProvidersForEmail(email).then((providers) => {
          if (providers[0] === 'password') {
            const password = this.promptUserForPassword(); // TODO: implement promptUserForPassword.
            auth.signInWithEmailAndPassword(email, password).then(function(user) {
              // Step 4a.
              return user.link(pendingCred);
            }).then(function() {
              // Facebook account successfully linked to the existing Firebase user.
              this.props.history.push('/reservaties');
            });
          }
        });
      } else {
        console.error('Error occured while signing in: ', error);
      }
    }) ;
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