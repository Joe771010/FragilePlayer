// react
import React from 'react'
import ReactDOM from 'react-dom'
// router
// import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// my components
import Main from './components/Main'

let store = createStore(rootReducer);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store = {store}>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
