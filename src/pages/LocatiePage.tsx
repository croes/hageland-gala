import * as React from 'react';

export class LocatiePage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="page">
        <h2>Adres</h2>
        <div className="gala-adres">
          <a href="http://www.hetmonnikenhofvanvlierbeek.be/">Het Monnikenhof van Vlierbeek</a><br/>
          Kasteellaan 5<br/>
          3450 Geetbets
        </div>

        <h2>Kaart</h2>
        <div id="locatie-google-map" style={{width: '100%', height: '450px'}}>
          <iframe
            frameBorder={0}
            style={{border: 0, width: '100%', height: '450px'}}
            src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.432694714032!' +
                 '2d5.110916315895863!3d50.897209362953355!2m3!1f0!2f0!3f0!3m2!1i1024!2i76' +
                 '8!4f13.1!3m3!1m2!1s0x47c115f978b1bd65%3A0xd5983105463949cc!2sHet+Monnike' +
                 'nhof+van+Vlierbeek!5e0!3m2!1sen!2sbe!4v1510492088120'}
            allowFullScreen={true}
          />
        </div>
      </div>
    );
  }

}