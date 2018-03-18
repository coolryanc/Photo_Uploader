import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './slider.sass';

const propTypes = {
  dispathfunc: PropTypes.func.isRequired,
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.minVal = this.props.funcObj.minVal;
    this.maxVal = this.props.funcObj.maxVal;
    this.distance = Number(this.maxVal) - Number(this.minVal);
    const defaultBarWidth = Number(this.props.funcObj.defaultVal) / this.distance * 100;
    this.state = {
      value: this.props.funcObj.defaultVal,
      barWidth: `${defaultBarWidth}%`
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let percent = ((Number(e.target.value) - this.minVal) / this.distance) * 100;
    percent = `${Math.round(percent)}%`
    this.setState({value: e.target.value});
    this.setState({barWidth: percent});
    this.props.dispathfunc(this.props.funcObj.name, e.target.value);
  }

  render() {
    return (
      <div styleName="field-wrap">
        <div style={{position: "relative"}}>
          <label>{this.props.funcObj.name}</label>
          <span styleName="percent">{this.state.barWidth}</span>
        </div>
        <div styleName="range-slider_wrapper">
          <span styleName="slider-bar" style={{width: this.state.barWidth}} />
          <input
           styleName="range-slider"
           value={this.state.value}
           onChange={this.handleChange}
           type="range"
           name={this.props.funcObj.name}
           min={this.minVal}
           max={this.maxVal}
           step="0.01"
          />
        </div>
      </div>
    );
  }
}

Slider.propTypes = propTypes;

export default CSSModules(Slider, styles);
