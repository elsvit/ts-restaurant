import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {
  parseUrl,
  stringify,
} from 'query-string';
import * as React from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { filterRestaurants, sortRestaurants } from 'src/services/utils';
import { IAppState } from 'src/store';
import { ICommonState } from 'src/store/common';
import { GET_RESTAURANTS, IRestaurant, getRestaurants } from 'src/store/restaurants';
import Main from '../Main';
import RestaurantRow from './RestaurantRow';
import './styles.scss';

type SelectT = '' | 'sort' | 'filter';

interface IRestaurantsProps extends RouteComponentProps {
  getRestaurants: typeof getRestaurants;
  loading: Partial<ICommonState>;
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
    this.state = this.setInitialState();
  }

  public componentDidMount() {
    this.props.getRestaurants();
  }

  public componentWillReceiveProps(nextProps: IRestaurantsProps) {
    if (this.props.restaurants !== nextProps.restaurants) {
      let restaurants = filterRestaurants(nextProps.restaurants, this.state.filter);
      restaurants = sortRestaurants(restaurants, this.state.sort);
      this.setState({ restaurants });
    }
  }

  public setInitialState = () => {
    const url = window.location.href;
    const params = parseUrl(url).query;
    const filter: string = params.filter || '';
    const sort: string = params.sort || '';
    const openSelect: SelectT = '';
    let restaurants = filterRestaurants(this.props.restaurants, filter);
    restaurants = sortRestaurants(restaurants, sort);
    const initialState = {
      filter,
      openSelect,
      restaurants,
      sort,
    };
    return initialState;
  };

  public handleChangeFilter = (event: any) => {
    const { value } = event.target;
    const { location, history } = this.props;
    let restaurants = filterRestaurants(this.props.restaurants, value);
    restaurants = sortRestaurants(restaurants, this.state.sort);
    const params = parseUrl(location.search).query;
    if (value) {
      params.filter = value;
    } else {
      delete params.filter;
    }
    const search = stringify(params);
    history.push({
      pathname: location.pathname,
      search,
    });
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
    const { loading } = this.props;
    return (
      <Main>
        {loading[GET_RESTAURANTS] ? (
          <div className="reactLoadingWrapper">
            <ReactLoading type="spin" color="#777" className="reactLoading" />
          </div>
        ) : (
          <div className="Restaurants">
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
          </div>
        )}
      </Main>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  loading: state.common.loading,
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
