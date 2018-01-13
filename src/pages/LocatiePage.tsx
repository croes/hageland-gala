import * as React from 'react';

const GOOGLE_API_KEY = 'AIzaSyCBmIen-pSvDEf2Zocje42SVZ75OK5Xj1c';

export class LocatiePage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h2>Adres</h2>
        <div className="gala-adres">
          <a href="http://http://www.feestzaallindenhof.be//">Feestzaal Lindenhof</a><br/>
          Booischotsestraat 1<br/>
          3128 Tremelo
        </div>

        <h2>Kaart</h2>
        <div id="locatie-google-map" style={{width: '100%', height: '450px'}}>
          <iframe
            frameBorder={0}
            style={{border: 0, width: '100%', height: '450px'}}
            src={
              'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXbEWIO5bwUcRCrPgdiCAYnE&key=' + GOOGLE_API_KEY
            }
            allowFullScreen={true}
          />
        </div>
      </div>
    );
  }

}