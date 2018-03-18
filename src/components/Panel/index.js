import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from './component/Slider'
import CSSModules from 'react-css-modules';
import styles from './panel.sass';

const contextTypes = {
  settingBars: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    minVal: PropTypes.string.isRequired,
    maxVal: PropTypes.string.isRequired,
    defaultVal: PropTypes.string.isRequired
  })).isRequired,
};

const propTypes = {
  set_filter: PropTypes.func.isRequired,
};

class Panel extends Component {
  constructor(props) {
    super(props);

    this.saveToImg = this.saveToImg.bind(this);
  }

  renderSliderNodes(settingBars, set_filter) {
    const sliderNodes = settingBars.map(el => (
      <Slider key={el.name} funcObj={el} dispathfunc={set_filter}/>
    ));

    return sliderNodes;
  }

  saveToImg(e) {
    const canvas = document.getElementById("editCanvas");
    if (canvas) {
      let saveCanvas = document.createElement("canvas");
      let context = saveCanvas.getContext("2d");
      saveCanvas.width = canvas.width;
      saveCanvas.height = canvas.height;
      const cssFilter = getComputedStyle(canvas).filter;
      context.filter = cssFilter;
      context.drawImage(canvas, 0, 0);
      let link = document.createElement("a");
      link.href = saveCanvas.toDataURL("image/png");
      link.download = `final_${Date.now()}.png`;
      link.click();
    }
  }

  render() {
    return (
      <div styleName="panel">
        <div styleName="slider-contain">
          {this.renderSliderNodes(this.context.settingBars, this.props.set_filter)}
        </div>
        <div styleName="button-contain">
          <div styleName="btn" onClick={(e) => this.saveToImg(e)}>Save</div>
        </div>
      </div>
    );
  }
}

Panel.contextTypes = contextTypes;
Panel.propTypes = propTypes;

export default CSSModules(Panel, styles);
