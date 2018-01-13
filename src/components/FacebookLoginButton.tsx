import * as React from 'react';
import * as Button from 'react-bootstrap/lib/Button';
import * as firebase from 'firebase';
import { RouteComponentProps, withRouter } from 'react-router';
import { PasswordPrompt } from './PasswordPrompt';

// tslint:disable:no-console

interface FacebookLoginButtonState {
  existingEmailAddress: string;
  showPasswordPrompt: boolean;
  passwordPrompResult: string;
}

type FacebookLoginButtonProps = RouteComponentProps<{}>;

class FacebookLoginButtonComponent extends React.Component<FacebookLoginButtonProps, FacebookLoginButtonState> {

  _onPasswordEntered: ((password: string) => void) | null = null;
  _onHide: (() => void) | null = null;
  
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      showPasswordPrompt: false,
      passwordPrompResult: '',
      existingEmailAddress: ''
    };
  }

  promptUserForPassword = () => {
    const passwordPromise = new Promise<string>((resolve, reject) => {
      this._onPasswordEntered = resolve;
      this._onHide = () => {
        reject(new Error('Password prompt closed'));
      };
      this.setState({...this.state, showPasswordPrompt: true, passwordPrompResult: ''});
    });
    passwordPromise.then(this.resetPasswordPromptListeners).catch(this.resetPasswordPromptListeners);
    return passwordPromise;
  }

  resetPasswordPromptListeners = () => {
    this._onHide = null;
    this._onPasswordEntered = null;
  }

  handleButtonClick = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    const auth = firebase.auth();
    auth.signInWithPopup(provider).then((result) => {
      this.props.history.push('/reservaties');
    }).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
        const email = error.email;
        auth.fetchProvidersForEmail(email)
          .then((providers) => {
            if (providers[0] === 'password') {
              this.setState({...this.state, existingEmailAddress: email});
              return this.promptUserForPassword();
            } else {
              throw new Error('Don\'t know what to do with provider:' + providers[0]);
            }
          }).then((password) => {
          return auth.signInWithEmailAndPassword(email, password);
        }).then((user: firebase.User) => {
          return user.linkWithCredential(pendingCred);
        }).then(() => {
          this.props.history.push('/reservaties');
        }).catch(linkAccountError => {
          console.log('Error occured while linking account', linkAccountError);
        });
      }
    });
  }

  render() {
    const {showPasswordPrompt, existingEmailAddress} = this.state;
    return (
      <Button bsSize="large" bsStyle="primary" block={true} onClick={this.handleButtonClick}>
        <i className="fa fa-facebook-official"/> Login via Facebook
        <PasswordPrompt
          showPrompt={showPasswordPrompt}
          message={`Er bestaat al een account met email-adres ${existingEmailAddress}.
                    Geef het wachtwoord in voor deze account.`}
          onPasswordEntered={this._onPasswordEntered}
          onHide={this._onHide}
        />
      </Button>
    );
  }
}

export const FacebookLoginButton = withRouter<FacebookLoginButtonProps>(FacebookLoginButtonComponent);