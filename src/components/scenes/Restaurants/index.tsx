// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// import flattenDeep from 'lodash-es/flattenDeep';
// import get from 'lodash-es/get';
import * as React from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { filterRestaurants, sortRestaurants } from 'src/services/utils';
import { IAppState } from 'src/store';
import { IRestaurant, getRestaurants } from 'src/store/restaurants';
import Main from '../Main';
import RestaurantRow from './RestaurantRow';
import './styles.scss';

type SelectT = '' | 'sort' | 'filter';

interface IRestaurantsProps {
  getRestaurants: typeof getRestaurants;
  restaurants: IRestaurant[];
}

interface IRestaurantsState {
  filter: string;
  openSelect: SelectT;
  restaurants: IRestaurant[];
  sort: string;
}

const SORT_KEYS = [
  {
    label: 'Name',
    value: 'general.name',
  },
  {
    label: 'Rating',
    value: 'rating.average',
  },
  {
    label: 'City',
    value: 'address.city',
  },
  {
    label: 'Categories',
    value: 'general.categories',
  },
];

class Restaurants extends React.Component<IRestaurantsProps, IRestaurantsState> {
  constructor(props: IRestaurantsProps) {
    super(props);
    this.state = {
      filter: '',
      openSelect: '',
      restaurants: this.props.restaurants,
      sort: '',
    };
  }

  public componentDidMount() {
    this.props.getRestaurants();
  }

  public componentWillReceiveProps(nextProps: IRestaurantsProps) {
    if (this.props.restaurants !== nextProps.restaurants) {
      this.setState({ restaurants: nextProps.restaurants });
    }
  }

  public handleChangeFilter = (event: any) => {
    const { value } = event.target;
    const restaurants = filterRestaurants(this.props.restaurants, value);
    this.setState({
      filter: value,
      restaurants,
    });
  };

  public handleChangeSort = (event: any) => {
    const { value } = event.target;
    const restaurants = sortRestaurants(this.state.restaurants, value);
    this.setState({
      restaurants,
      sort: value,
    });
  };

  public render() {
    const { restaurants } = this.state;
    return (
      <Main>
        <div className="restaurantsContainer">
          {restaurants.map((restaurant: IRestaurant, ind: number) => {
            const key = `${restaurant.id}-${ind}`;
            return <RestaurantRow key={key} restaurant={restaurant} />;
          })}
        </div>
        <div className="filterSortSection">
          <TextField
            label="Filter"
            type="search"
            className="textField"
            margin="normal"
            variant="outlined"
            value={this.state.filter}
            onChange={this.handleChangeFilter}
          />
          <TextField
            select={true}
            label="Sort"
            className="textField"
            value={this.state.sort}
            onChange={this.handleChangeSort}
            margin="normal"
            variant="outlined"
          >
            {SORT_KEYS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Main>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  restaurants: state.restaurants.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRestaurants,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurants);
