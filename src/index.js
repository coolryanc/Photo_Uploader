import React from 'react';
import { render } from 'react-dom'
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

document.getElementById('root').style.width = '100%';
document.getElementById('root').style.height = '100%';
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
