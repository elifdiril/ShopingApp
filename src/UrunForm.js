import React, { Component } from 'react';
import { Button, Card, Form, FormGroup, Label, Col, Row, ListGroupItem } from 'reactstrap';
import DbsDropdown from './DbsDropDown';
import DbsInput from './DbsInput';

export const URUN_TYPES = {
    BUZDOLABI: "buzdolabi",
    TV: "tv",
    FIRIN: "fırın",
    UTU: "ütü"
};

export default class UrunForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urunTurleri: props.dropDownItems,
            urunId: props.urunId || 0,
            urunAdi: props.urunAdi || '',
            urunKodu: props.urunKodu || '',
            urunMik: props.urunMik || 0,
            urunBirim: props.urunBirim || 0,
            tutar: props.tutar || 0,
            urunTuru: ''
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.backHandle = this.backHandle.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.newFormValues && nextProps.newFormValues)
            || (this.props.newFormValues && nextProps.newFormValues && this.props.newFormValues.id !== nextProps.newFormValues.id)) {
            this.setState({
                urunAdi: nextProps.newFormValues.urunAdi,
                urunKodu: nextProps.newFormValues.urunKodu,
                urunMik: nextProps.newFormValues.urunMik,
                urunBirim: nextProps.newFormValues.urunBirim,
                tutar: nextProps.newFormValues.tutar,
                urunTuru: nextProps.newFormValues.urunTuru
            });
        }
    }

    inputChangeHandler(field, value) {
        let tutar = this.state.tutar;
        if (field === "urunMik")
            tutar = value * this.state.urunBirim;
        else if (field === "urunBirim")
            tutar = value * this.state.urunMik;

        if (field === "urunTuru") {
            if (value === 1)
                value = URUN_TYPES.BUZDOLABI
            else if (value === 2)
                value = URUN_TYPES.TV
            else if (value === 3)
                value = URUN_TYPES.FIRIN
            else if (value === 4)
                value = URUN_TYPES.UTU
        }

        this.setState({
            [field]: value,
            tutar: tutar
        });
    }

    backHandle() {
        this.props.backHandle();
    }

    onFormSubmit() {
        if (!this.state.urunAdi)
            return;

        let formValues = {
            urunId: this.state.urunId,
            urunAdi: this.state.urunAdi,
            urunKodu: this.state.urunKodu,
            urunMik: this.state.urunMik,
            urunBirim: this.state.urunBirim,
            tutar: this.state.tutar,
            urunTuru: this.state.urunTuru
        }

        this.props.action(formValues);
    }

    onEditSubmit() {
        if (!this.state.urunAdi)
            return;
        let formValues = {
            urunAdi: this.state.urunAdi,
            urunKodu: this.state.urunKodu,
            urunMik: this.state.urunMik,
            urunBirim: this.state.urunBirim,
            tutar: this.state.tutar,
            urunTuru: this.state.urunTuru
        }

        this.props.editHandler(formValues);
    }

    render() {
        return (
            <div>
                <Card className="FormFrame">
                    <Form>
                        <span className="title">Form</span>
                        <FormGroup className="formItems">
                            <Row>

                                <Col>
                                    <DbsInput fieldName="urunAdi"
                                        value={this.state.urunAdi}
                                        onChange={this.inputChangeHandler}
                                        label="Ürün Adı"
                                        type="text" />
                                </Col>

                                <Col>
                                    <DbsInput fieldName="urunKodu"
                                        value={this.state.urunKodu}
                                        onChange={this.inputChangeHandler}
                                        label="Ürün Kodu"
                                        type="text" />
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <DbsInput fieldName="urunMik"
                                        value={this.state.urunMik}
                                        onChange={this.inputChangeHandler}
                                        label="Ürün Miktarı"
                                        type="number" />
                                </Col>

                                <Col>
                                    <DbsInput fieldName="urunBirim"
                                        value={this.state.urunBirim}
                                        onChange={this.inputChangeHandler}
                                        label="Birim Fiyatı"
                                        type="number" />
                                </Col>

                                <Col>
                                    <Label>Ürün Tutarı</Label>
                                    <ListGroupItem style={{ height: 38 }}>{this.state.tutar}</ListGroupItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <DbsDropdown
                                        fieldName="urunTuru"
                                        label="Ürün Türü"
                                        urunTurleri={this.state.urunTurleri}
                                        textField="ad"
                                        value={this.state.urunTuru}
                                        onChange={this.inputChangeHandler}
                                        onSelect={this.inputChangeHandler}

                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormButtons
                            isEdit={this.props.isEdit}
                            onFormSubmit={this.onFormSubmit}
                            backHandle={this.backHandle}
                            onEditSubmit={this.onEditSubmit} />
                    </Form>
                </Card>
            </div>
        );
    }
}

const FormButtons = (props) => {
    const { isEdit = false, onFormSubmit, backHandle, onEditSubmit } = props;

    if (isEdit) {
        return (
            <div>
                <Button onClick={onEditSubmit} color="success" className="DüzenleButton"> Düzenle </Button>
                <Button onClick={backHandle} color="danger" className="VazgecButton"> Vazgeç </Button>
            </div>);
    }
    else {
        return (<Button onClick={onFormSubmit} color="success" className="EkleButton">Ürün Ekle</Button>);
    }
};