import * as React from 'react';
import { Link } from 'react-router-dom';

export class DinerPage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h1>Diner</h1>
        <p style={{textAlign: 'justify'}}>
          Vanaf <b>18u00</b> gaan we van start met de receptie, gevolgd door het diner om 19u00.
          U kan kiezen tussen een vlees-, of vismenu:
        </p>

        <h2 style={{textAlign: 'center'}}>Menu</h2>

        <div id="menu-vlees-vis" className="gala-menu">
          <p>Aperitief</p>
          <p><b>***</b></p>
          <p>Wilde zalm en mozarella op een bedje van rucola en zongedroogde tomaatjes, besprenkeld met balsamico</p>
          <p><b>***</b></p>
          <p>Parelhoenfilet met een sausje van calvados en appeltjes (vleesmenu)</p>
          <p><b>OF</b></p>
          <p>Kabeljauwhaasje met een sausje van jonge prei (vismenu)</p>
          <p><b>***</b></p>
          <p>Dessertenpallet</p>
        </div>

        <div className="gala-prijs">
          <b>€80,- per persoon</b>, inclusief drank (exclusief schuimwijnen) tot <b>04u00</b><br/>
          Actieve studenten genieten van een voordeeltarief van <b>€75,- per persoon</b><br/>
          Reserveren kan via de <Link to="/reservaties">Mijn reservaties</Link> pagina.
        </div>
      </div>
    );
  }

}