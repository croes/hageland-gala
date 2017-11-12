import * as React from 'react';

export class DinerPage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h1>Diner</h1>
        <p style={{textAlign: 'justify'}}>
          Vanaf 18u00 gaan we van start en bent u van harte welkom om te komen genieten van het aperitief aansluitend
          gevolgd door het diner.
          U heeft de keuze tussen een vlees-, vis-, of vegetarisch menu:
        </p>

        <h2 style={{textAlign: 'center'}}>Menu</h2>

        <div className="gala-prijs"><b>€60,- per persoon</b>, inclusief huiswijn, Stella en frisdrank</div>

        <div id="menu-vlees-vis" className="gala-menu">
          <h3>Vlees- of vismenu</h3>
          <p>Carpaccio van gemarineerde zalm, florentine van zalm en spinazie</p>
          <p><b>***</b></p>
          <p>Duo van varkenshaasje en kalkoenfilet (Vlees)</p>
          <p><b>OF</b></p>
          <p>Kabeljauw op de huid gebakken (Vis)</p>
          <p>Beide met warme seizoensgroenten</p>
          <p><b>***</b></p>
          <p>Balkje van chocolade met een mousse van Baileys, krokant ijs en macaron</p>
          <p><b>***</b></p>
          <p>Koffie met culinaire proevertjes</p>
        </div>

        <div id="menu-vegetarisch" className="gala-menu">
          <h3>Vegetarisch menu</h3>
          <p>Slaatje van trostomaat en buffelmozzarella</p>
          <p>met een krokante toast en een lichte dressing van balsamico</p>
          <p><b>***</b></p>
          <p>Groentewok met rijstnoedels</p>
          <p><b>***</b></p>
          <p>Balkje van chocolade met een mousse van Baileys, krokant ijs en macaron</p>
          <p><b>***</b></p>
          <p>Koffie met culinaire proevertjes</p>
        </div>
      </div>
    );
  }

}