import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class RangeSlider extends Component {
  //   onChange = (value) => {
  //     console.log('onChange: ', value);
  //   };

  minimum = 0;
  maximum = 50000;
  defaultVal = [5000, 20000];
  state = {
    inputValue: this.defaultVal,
  };

  onChange1 = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  onChange2 = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <Col span={4}>
          <InputNumber
            min={this.minimum}
            max={this.maximum}
            style={{ margin: '0 16px' }}
            value={inputValue[0]}
            onChange={this.onChange1}
          />
        </Col>
        <Col span={15}>
          <Slider
            range
            onChange={this.onChange}
            defaultValue={this.defaultVal}
            min={this.minimum}
            max={this.maximum}
            value={inputValue}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={this.minimum}
            max={this.maximum}
            style={{ margin: '0 16px' }}
            value={inputValue[1]}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default RangeSlider;
