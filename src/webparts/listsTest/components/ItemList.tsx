import * as React from 'react';

export interface IItemListProps {
  items: any[];
}

class ItemList extends React.Component<IItemListProps> {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
            <li key={index}>{item.Title}</li>
            // key={index}: key je špeciálny atribút v Reacte, ktorý pomáha Reactu efektívne identifikovať, ktoré prvky sa zmenili, pridali alebo odstránili. 

            // Príklad s dátami
            // Ak by this.props.items obsahovalo:

            // [
            //   { Title: 'Item 1' },
            //   { Title: 'Item 2' },
            //   { Title: 'Item 3' }
            // ]
            // Výsledné HTML by bolo:

            // CopyInsert
            // <ul>
            //   <li key="0">Item 1</li>
            //   <li key="1">Item 2</li>
            //   <li key="2">Item 3</li>
            // </ul>
        ))}
      </ul>
    );
  }
}

export default ItemList;