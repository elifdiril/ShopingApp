import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

export default class DbsInput extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let val = e.target.value;
        if (this.props.fieldName === "urunTuru") {
            if (val === 1)
                val = this.props.URUN_TYPES.BUZDOLABI
            else if (val === 2)
                val = this.props.URUN_TYPES.TV
            else if (val === 3)
                val = this.props.URUN_TYPES.FIRIN
            else if (val === 4)
                val = this.props.URUN_TYPES.UTU
        }

        this.props.onChange(this.props.fieldName, val);
    }

    render() {
        return (
            <div width="100px">
                <Label>{this.props.label}</Label>
                <Input
                    fieldName={this.props.fieldName}
                    value={this.props.value}
                    onChange={this.onChange}
                    type={this.props.type} />
            </div>
        );
    }

}