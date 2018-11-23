import React from 'react';
import { Button, Card, Form, FormGroup, Label, Input, Col, Row, ListGroupItem } from 'reactstrap';

export default class FormPart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { urunAdi: '', urunKodu: '', urunMik: 0, urunBirim: 0, tutar: 0 }
            ]
        }
    }

    inputChangeHandler(e) {
        let _this = this;
        let formFields = { ...this.state.data };
        formFields[e.target.name] = e.target.value;
        console.log(e.target.value);
        this.setState({
            formFields
        });
        console.log('ad ' + _this.state.data.urunAdi);
    }

    formHandler() {
        let _this = this;
        console.log('ad ' + _this.state.data.urunAdi);
        console.log('birim ' + _this.state.data.urunBirim);
    }

    render() {
        return (
            <Card className="FormFrame">
                <Form>
                    <text className="title">Form</text>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label>Ürün Adı</Label>
                                <Input type="text" name="urunAdi" id="urunAdi" onChange={this.inputChangeHandler.bind(this)} />
                            </Col>
                            <Col>
                                <Label>Ürün Kodu</Label>
                                <Input type="text" name="urunKodu" id="urunKodu" onChange={this.inputChangeHandler.bind(this)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>Ürün Miktarı</Label>
                                <Input type="text" name="urunMik" id="urunMik" onChange={this.inputChangeHandler.bind(this)} />
                            </Col>
                            <Col>
                                <Label>Ürün Birim Fiyatı</Label>
                                <Input type="text" name="urunBirim" id="urunBirim" onChange={this.inputChangeHandler.bind(this)} />
                            </Col>
                            <Col>
                                <Label>Ürün Tutarı</Label>
                                <ListGroupItem style={{ height: 38 }}>{}</ListGroupItem>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Button onClick={this.formHandler.bind(this)} className="EkleButton">Ürün Ekle</Button>
                </Form>
            </Card>
        );
    }
}