import * as React from 'react';
import { Link } from 'react-router-dom';

export class AvondFeestPage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h1>Avondfeest</h1>
        <p>
          Vanaf 22u00 kan u mee uit de bol gaan op ons spetterend avondfeest. De ambiance zal worden verzorgd
          door DJ Wild Turkey. Iedereen is van harte welkom.
          Het enige wat u hoeft te doen is uw avondkledij aantrekken en komen genieten van een heerlijke avond!
        </p>

        <h2>Prijs</h2>
        <p>
          Het avondfeest is inbegrepen in de prijs van het diner.<br/>
          Als u niet komt dineren, dan is het avondfeest <b>€20,- per persoon</b>.<br/>
          Deze prijs is <b>inclusief drank</b> (exclusief schuimwijnen) tot <b>04u00</b>.
        </p>

        <h2>Busdienst</h2>
          Indien u wenst, kan u gebruik maken van onze gratis busdienst.
          Meer informatie vind je op de <Link to="/bus">Bus pagina</Link>.
      </div>
    );
  }

}