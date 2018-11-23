import React from 'react';
import { Button, Card, Form, FormGroup, Label, Input, Col, Row, ListGroupItem } from 'reactstrap';

export default class FormPart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:
                { urunAdi: '', urunKodu: '', urunMik: 0, urunBirim: 0, tutar: 0 }
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    inputChangeHandler(e) {
        let formFields = JSON.parse(JSON.stringify(this.state.data));
        formFields[e.target.name] = e.target.value;
        console.log(e.target.value);
        formFields.tutar = this.state.data.urunBirim * this.state.data.urunMik;
        this.setState({
            data: formFields
        });
    }

    render() {
        return (
            <div>
            <Card className="FormFrame">
                    <Form>
                        <text className="title">Form</text>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Ürün Adı</Label>
                                    <Input type="text" name="urunAdi" id="urunAdi" onChange={this.inputChangeHandler} value={this.state.data.urunAdi} />
                                </Col>
                                <Col>
                                    <Label>Ürün Kodu</Label>
                                    <Input type="text" name="urunKodu" id="urunKodu" onChange={this.inputChangeHandler} value={this.state.data.urunKodu} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>Ürün Miktarı</Label>
                                    <Input type="number" name="urunMik" id="urunMik" onChange={this.inputChangeHandler} value={this.state.data.urunMik} />
                                </Col>
                                <Col>
                                    <Label>Ürün Birim Fiyatı</Label>
                                    <Input type="number" name="urunBirim" id="urunBirim" onChange={this.inputChangeHandler} value={this.state.data.urunBirim} />
                                </Col>
                                <Col>
                                    <Label>Ürün Tutarı</Label>
                                    <ListGroupItem style={{ height: 38 }}>{this.state.data.tutar}</ListGroupItem>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button onClick={() => this.props.action(this.state.data)} className="EkleButton">Ürün Ekle</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}