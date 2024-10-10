import * as React from 'react';
import styles from './ListsTest.module.scss';
import { IListsTestProps } from './IListsTestProps';
import ItemListContainer from './ItemListContainer';
import { loadStyles } from "@microsoft/load-themed-styles";
import Button from './Button';

const customStyles = `
  #workbenchPageContent {
    max-width: 95% !important;
    padding: 0 10px !important;
  }
  .CanvasZone {
    max-width: 100% !important;
  }
  .spAppIFrame {
    max-width: 100% !important;
    width: 90% !important;
  }
`;

loadStyles(customStyles);

export interface IListsTestState {
  large: boolean;   // // Pridáme stav pre zmenu veľkosti tlačidla
}

export default class ListsTest extends React.Component<IListsTestProps, IListsTestState> {
  constructor(props: IListsTestProps) {
    super(props);

    this.state = {
      large: false
    };
  }



  public render(): React.ReactElement<IListsTestProps> {
    const buttonClassName = this.state.large ? styles.largeButton : '';
    
    return (
      <div className={styles.listsTest}>
        <div className={styles.container}>
          {/* <div className={styles.row}>
            <div className={styles.column}> */}
             
              {/* <ItemListContainer context={this.props.context} /> */}
              <ItemListContainer context={this.props.context} SPService={this.props.SPService}/>


              <Button className={buttonClassName} onClick={this.handleSizeToggle} />

              
            </div>
          </div>
      //   </div>
      // </div>
    );
  }

  handleSizeToggle = () => {
    console.log('Before toggle:', this.state.large);
    this.setState(prevState => {
      const newState = !prevState.large;
      console.log('After toggle:', newState);
      return { large: newState };
    });
  }

}
