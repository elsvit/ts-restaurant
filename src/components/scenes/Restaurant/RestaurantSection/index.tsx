import find from 'lodash-es/find';
import get from 'lodash-es/get';
import * as React from 'react';

import { IRestaurantSection, IRestaurantSectionItem } from 'src/store/restaurants';
import './styles.scss';

interface IRestaurantSectionProps {
  section: IRestaurantSection;
}

class RestaurantSection extends React.Component<IRestaurantSectionProps> {
  public handleBtnClick = (id: number) => {
    const item = find(this.props.section.items, item => item.id === id);
    console.log('item:', item);
  };

  public render() {
    const { section } = this.props;
    const name = get(section, 'name', '');
    const items = section ? section.items : [];
    return (
      <div className="restaurantSectionRow">
        <div className="sectionNameBlock">{name}</div>
        <div className="sectionItemsBlock">
          {items.map((item: IRestaurantSectionItem) => (
            <div key={item.id} className="sectionItemBlock">
              <div className="productName">{item.name}</div>
              <div className="productPrice">{item.price}</div>
              <div className="productBtn" onClick={() => this.handleBtnClick(item.id)}>
                button
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RestaurantSection;
