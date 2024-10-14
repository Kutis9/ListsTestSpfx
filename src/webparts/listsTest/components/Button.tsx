import * as React from 'react';

export interface IButtonProps {
  text: string;
  onClick: () => void; // Callback funkcia
  className?: string;
}

class Button extends React.Component<IButtonProps> {
  render() {
    return (
    <div>
        <button className={this.props.className} onClick={this.props.onClick}>{this.props.text}</button>
    </div>
    );

  }
}

export default Button;