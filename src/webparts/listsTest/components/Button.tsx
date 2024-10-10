import * as React from 'react';

export interface IButtonProps {
  onClick: () => void; // Callback funkcia
  className?: string;
}

class Button extends React.Component<IButtonProps> {
  render() {
    return (
    <div>
        <button className={this.props.className} onClick={this.props.onClick}>Klik</button>
    </div>
    );

  }
}

export default Button;