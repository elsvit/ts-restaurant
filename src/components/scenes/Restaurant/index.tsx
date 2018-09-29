import get from 'lodash-es/get';
import * as React from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { IAppState } from 'src/store';
import { IRestaurantAll, getRestaurant } from 'src/store/restaurants';
import Main from '../Main/index';
import './styles.scss';

interface IRestaurantProps {
  getRestaurant: typeof getRestaurant;
  restaurant: IRestaurantAll;
}

class Restaurant extends React.Component<IRestaurantProps> {
  public componentDidMount() {
    console.log('Restaurant11 props', this.props);
    const pathname = get(this.props, 'location.pathname', null);
    if (pathname) {
      const arr = pathname.split('/');
      const id = arr[2];
      this.props.getRestaurant(id);
      console.log('Restaurant25 componentDidMount');
    }
  }

  public render() {
    const { restaurant } = this.props;
    const logoUri = get(restaurant, 'info.logoUri', '');
    const name = get(restaurant, 'info.name', '');
    const averageRating = get(restaurant, 'rating.average', '');
    const city = get(restaurant, 'address.city', '');
    const streetName = get(restaurant, 'address.streetName', '');
    const streetNumber = get(restaurant, 'address.streetNumber', '');
    const location = `${streetNumber}, ${streetName}, ${city}`;
    const categories = get(restaurant, 'info.categories', []);
    return (
      <Main>
        <div className="restaurantRaw">
          <div className="logo">
            <img className="flex" src={logoUri} alt="" />
          </div>
          <div className="restaurantInfoWrapper">
            <div className="nameRowWrapper">{`${name}  (${averageRating})`}</div>
            <div className="locationWrapper">{location}</div>
            <div className="categoryWrapper">
              {categories.map((val: string) => (
                <div key={val} className="category">
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  restaurant: state.restaurants.restaurant,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRestaurant,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurant);
