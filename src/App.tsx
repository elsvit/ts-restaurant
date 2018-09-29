import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import './App.scss';
import Main from './components/scenes/Main';
import Restaurant from './components/scenes/Restaurant';
import Restaurants from './components/scenes/Restaurants';
import { IAppState } from './store';

interface IAppProps extends RouteProps {
  isAuthenticated: boolean;
}

class App extends React.Component<IAppProps> {
  public render() {
    const { isAuthenticated } = this.props;
    return (
      <Router>
        <div className="App">
          {isAuthenticated ? (
            <Switch>
              <Route path="/restaurants" component={Restaurants} />
              <Route path="/restaurant/:id" component={Restaurant} />
              <Redirect to="/restaurants" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Main} />
              <Redirect to="/login" />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
)(App);
