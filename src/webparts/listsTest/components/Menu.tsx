import * as React from 'react';
import styles from './Menu.module.scss';

export interface IMenuProps {
    onMenuItemClick: (menuItem: string) => void;
}

export interface IMenuState {
  activeMenuItem: string;
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      activeMenuItem: 'Domov'
    };
  }

  handleMenuItemClick = (menuItem: string) => {
    this.setState({ activeMenuItem: menuItem });
    this.props.onMenuItemClick(menuItem);
  }

  render() {
    return (
        <div className={styles.menu}>
        <ul>
          <li className={this.state.activeMenuItem === 'Domov' ? styles.active : ''} onClick={() => this.handleMenuItemClick('Domov')}>Domov</li>
          <li className={this.state.activeMenuItem === 'API' ? styles.active : ''} onClick={() => this.handleMenuItemClick('API')}>API</li>
        </ul>
      </div>
    );
  }
}

export default Menu;