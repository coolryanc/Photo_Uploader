import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PanelContainer from './containers/PanelContainer'
import ImageContainer from './containers/ImageContainer'
import { setting as funcs } from './shared/config'
import CSSModules from 'react-css-modules';
import styles from './App.sass';

class App extends Component {
  getChildContext() {
    return {
      settingBars: funcs,
    };
  }

  render() {
    return (
      <div styleName="app">
        <div styleName="panel">
          <PanelContainer />
        </div>
        <div styleName="editZone">
          <ImageContainer />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  settingBars: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    minVal: PropTypes.string.isRequired,
    maxVal: PropTypes.string.isRequired,
    defaultVal: PropTypes.string.isRequired
  })).isRequired,
}

export default new CSSModules(App, styles);
