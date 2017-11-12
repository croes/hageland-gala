import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './theme/readable/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAGYO81z92Th9HJf7rSkuVCkKvWkarl0o0',
  authDomain: 'hageland-gala.firebaseapp.com',
  databaseURL: 'https://hageland-gala.firebaseio.com',
  projectId: 'hageland-gala',
  storageBucket: '',
  messagingSenderId: '506501277518'
};
firebase.initializeApp(config);

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
