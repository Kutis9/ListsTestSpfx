import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import ItemList from './ItemList';
import Button from './Button';
import SPService from './SPService';
import ItemListShp from './ItemListShp';

export interface IItemListContainerProps {
  context: WebPartContext;
  SPService: SPService;
}

export interface IItemListContainerState {
  items: any[];
  clicked: boolean;
}

class ItemListContainerShp extends React.Component<IItemListContainerProps, IItemListContainerState> {
  constructor(props: IItemListContainerProps) {
    super(props);

    this.state = {
      items: [],
      clicked: false
    };
  }

  componentDidMount() {
    // this.fetchItems();
    this.fetchShpItems();
  }



  render() {

    const containerStyle = {
        backgroundColor: this.state.clicked ? 'green' : 'transparent' // Nastavenie štýlu pozadia
      };

    return (
      <div style={containerStyle}>
        <h1>Items zo zoznamu {this.listName} </h1>
        <ItemListShp items={this.state.items} /> 
        {/* items={this.state.items} predavame do komponenty ItemList ako props */}
        {/* <ItemList items={this.state.items} />  */}

        <Button onClick={this.handleClick} text='Zmena farby' />
      </div>
    );
  }





  // fetchItems() {
  //   const { context } = this.props;

  //   context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/web/lists`, SPHttpClient.configurations.v1)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ items: data.value });
  //     });
  // }
  listName = 'CRUDLIST';
  
  fetchShpItems = () => {
    this.props.SPService.getItems(this.listName).then((response) => {
      response.json().then((data) => {
        this.setState({ items: data.value });
      });
    });
  }

  handleClick = () => {
    console.log('Clicked: ', this.state.clicked);
    
    this.setState(prevState => {
        const newState = !prevState.clicked;
        console.log('Clicked: ', newState);
        
        return { clicked: newState };
    });
  }
}

export default ItemListContainerShp;