import React from 'react';
import { Card, Form, FormGroup, Table } from 'reactstrap';

export default class ShopList extends React.Component {

  editHandle(){
    //edit
  }

  render() {
    const { urunList, title } = this.props;

    if (urunList)
      return (
        <Card className="FormFrame">
          <h1>{title}</h1>
          <Form>
            <FormGroup>
              <text className="title" for="exampleText">Alışveriş Listesi</text>
              <table style={{ border: "1px solid black;" }}>
                <thead>
                  <tr>
                    <th>urun adı</th>
                    <th>urun kodu</th>
                    <th>urun tutarı</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    urunList.map(item => {
                      return (
                        <tr>
                          <td>{item.urunAdi}</td>
                          <td>{item.urunKodu}</td>
                          <td>{item.tutar}</td>
                          <td><button onClick={this.editHandle.bind(this)}>Düzenle</button></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </FormGroup>
          </Form>
        </Card>
      );
    else
      return <span>henüz ürün yok</span>;
  }
}