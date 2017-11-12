import * as React from 'react';
import { Link } from 'react-router-dom';

export class NotFoundPage extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Oops!</h1>
        <p>Pagina niet gevonden!</p>
        <Link to="/">Ga terug naar de startpagina</Link>
      </div>
    );
  }
}