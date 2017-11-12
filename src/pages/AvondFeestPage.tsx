import * as React from 'react';
import { Link } from 'react-router-dom';

export class AvondFeestPage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h1>Avondfeest</h1>
        <p>
          Vanaf 22u30 kan u mee uit de bol gaan op ons spetterend dansfeest. De ambiance zal worden verzorgd
          door DJ Wild Turkey. Verder kan u ook genieten van heerlijke cava en cocktails aan onze cava &amp;
          cocktailbar.
          Iedereen is van harte welkom en de inkom is volledig GRATIS.
          Het enige wat u hoeft te doen is uw avondkledij aantrekken en komen genieten van een heerlijke avond!
        </p>

        <h2>Busdienst</h2>
        Indien u wenst, kan u gebruik maken van onze busdienst en dit voor maar slechts €5.
        Voor het avondfeest is er 1 heenrit en 1 terugrit voorzien.
        Meer informatie vind je op de <Link to="/bus">Bus pagina</Link>.
      </div>
    );
  }

}