import * as React from 'react';
import * as Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom';

export class BusPage extends React.Component<{}, {}> {

  render() {
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
            <td>18:00</td>
            <td>Ladeuzeplein, Leuven</td>
            <td>Monikkenhof</td>
            <td>19:00</td>
          </tr>
          <tr>
            <td>Bus avondfeest</td>
            <td>21:00</td>
            <td>Ladeuzeplein, Leuven</td>
            <td>Monikkenhof</td>
            <td>22:00</td>
          </tr>
          <tr>
            <td>Nachtbus</td>
            <td>04:00</td>
            <td>Monikkenhof</td>
            <td>Ladeuzeplein, Leuven</td>
            <td>05:00</td>
          </tr>
          </tbody>
        </Table>

        <p>
          Een plaats op de bus kost &euro;5,00 (heen- en terugrit inbegrepen).
          Reserveren is verplicht en kan via de <Link to="/reservaties">Mijn reservaties</Link> pagina.
        </p>
      </div>
    );
  }

}