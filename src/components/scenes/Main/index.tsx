import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { getToken, logOut } from 'src/store/auth';
import { IAppState } from 'src/store/index';
import Header from './Header/index';
import './styles.scss';

interface IMainProps {
  isAuthenticated: boolean;
  getToken: typeof getToken;
  logOut: typeof logOut;
}

class Main extends React.Component<IMainProps> {
  public signIn = () => {
    this.props.getToken();
  };

  public signOut = () => {
    this.props.logOut();
  };

  public render() {
    const { isAuthenticated, children } = this.props;
    return (
      <div>
        <Header isAuthenticated={isAuthenticated} signIn={this.signIn} signOut={this.signOut} />
        {children && <div className="restaurantsList">{children}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getToken,
      logOut,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
