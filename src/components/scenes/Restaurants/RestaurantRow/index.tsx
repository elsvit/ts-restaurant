import get from 'lodash-es/get';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { IRestaurant } from 'src/store/restaurants';
import './styles.scss';

interface IRestaurantRowProps {
  restaurant: IRestaurant;
}

class RestaurantRow extends React.Component<IRestaurantRowProps> {
  public render() {
    const { restaurant } = this.props;
    const logoUri = get(restaurant, 'general.logo_uri', '');
    const name = get(restaurant, 'general.name', '');
    const averageRating = get(restaurant, 'rating.average', '');
    const city = get(restaurant, 'address.city', '');
    const streetName = get(restaurant, 'address.street_name', '');
    const streetNumber = get(restaurant, 'address.street_number', '');
    const location = `${streetNumber}, ${streetName}, ${city}`;
    const categories = get(restaurant, 'general.categories', []);
    return (
      <NavLink to={`/restaurant/${restaurant.id}`} className="restaurantRaw">
        <div className="logo">
          <img className="flex" src={logoUri} alt="" />
        </div>
        <div className="restaurantInfoWrapper">
          <div className="nameRowWrapper">
            {`${name}  (${averageRating})`}
          </div>
          <div className="locationWrapper">
            {location}
          </div>
          <div className="categoryWrapper">
            {categories.map((val: string) => (
              <div key={val} className="category">{val}</div>
            ))}
          </div>
        </div>
      </NavLink>
    );
  }
}

export default RestaurantRow;
