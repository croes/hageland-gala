import * as React from 'react';
import * as Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom';

export class BusPage extends React.Component<{}, {}> {

  render() {
    const leuvenLocatieLink = (
      <a
        href={'https://www.google.be/maps/place/Gerechtsgebouw+Leuven/@50.880762,4.6997716,17z/' +
        'data=!4m8!1m2!2m1!1sgerechtsgebouw+Leuven!3m4!1s0x47c160d9ee73b4fb:0xeda3bc5537402fb3!' +
        '8m2!3d50.8805706!4d4.7017549'}
        target="_blank"
      >
        Gerechtsgebouw, Leuven
      </a>
    );
    const gelabalLocatieLink = (
      <a
        href={'https://www.google.be/maps/place/Lindenhof/@51.0097158,4.7524869,17z/data=!3m1!4b1' +
        '4m5!3m4!1s0x47c15bee2016b15d:0x7162802076e0b30a!8m2!3d51.0097124!4d4.7546756'}
        target="_blank"
      >
        Lindenhof, Baal
      </a>
    );
    return (
      <div className="page">
        <h1>Busdiensten</h1>
        <Table striped={true} bordered={true} hover={true} responsive={true}>
          <thead>
          <tr>
            <th/>
            <th>Vertrekuur</th>
            <th>Locatie vertrek</th>
            <th>Locatie aankomst</th>
            <th>Uur van aankomst</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Bus diner</td>
            <td>17:00</td>
            <td>{leuvenLocatieLink}</td>
            <td>{gelabalLocatieLink}</td>
            <td>18:00</td>
          </tr>
          <tr>
            <td>Bus avondfeest</td>
            <td>21:00</td>
            <td>{leuvenLocatieLink}</td>
            <td>{gelabalLocatieLink}</td>
            <td>22:00</td>
          </tr>
          <tr>
            <td>Nachtbus</td>
            <td>03:45</td>
            <td>{gelabalLocatieLink}</td>
            <td>{leuvenLocatieLink}</td>
            <td>05:00</td>
          </tr>
          </tbody>
        </Table>

        <p>
          Alle busritten zijn <b>gratis</b>.<br/>
          <b>Reserveren is wel verplicht</b> en kan via de <Link to="/reservaties">Mijn reservaties</Link> pagina.
        </p>
      </div>
    );
  }

}