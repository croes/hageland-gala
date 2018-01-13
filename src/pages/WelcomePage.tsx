import * as React from 'react';

export class WelcomePage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="page">
        <header>
          <h1>Galabal KVHC Ons Hageland-Bessemclub</h1>
          <span className="text-muted">24 maart 2018</span>
        </header>
        <br/>
        <p>
          <i>
            Hooggeachte oud-Seniores,<br/>
            Eerwaarde commilitones &amp; oud-commilitones,<br/>
            Verderfelijk schachtengebroed &amp; bietengespuis,<br/>
            Goede vrienden,<br/>
          </i>
        </p>

        <p>
          Broeder Hagelander: werkleven ex, decadentie in. Grijp naar uw lint, zoek naar die bierpet, sleur tevoorschijn
          die zwarte kas en zààg bij die vrouw. De tijd van beschaving &amp; moderatie is voorbij, nu is het uur van het
          Zwijn! Anno 2018 valt ons de eer ten beurt u uit te nodigen voor het 144ste Galabal der Lelijkheid.
        </p>

        <img src={require('../assets/images/15.jpg')} style={{width: '100%'}}/>

        <p>
          Via deze site kan u informatie over het diner, het avondfeest en de busdiensten (avondfeest, diner)
          raadplegen.
          Wij en de onzen hopen u, onze broeder, te mogen verwelkomen op dit 144ste galabal.
        </p>

        <p>
          <b>Ut Vivat Crescat Floreatque KVHC Ons Hageland-Bessemclub!</b>
        </p>

        <p>
          <i>- het galabalcomité</i>
        </p>
      </div>
    );
  }
}