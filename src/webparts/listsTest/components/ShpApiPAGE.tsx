import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import * as React from 'react';
import styles from './ShpApiPAGE.module.scss';

export interface IShpApiPAGEProps {
    context: WebPartContext;
}

export interface IShpApiPAGEState {
    listName: string;
    items: any[];
    meno: string;
    priezvisko: string;
    deletePriezvisko: string;
    updateId: string;
    updateMeno: string;
    updatePriezvisko: string;
}

export default class ShpApiPAGE extends React.Component<IShpApiPAGEProps, IShpApiPAGEState> {

    constructor(props: IShpApiPAGEProps) {
        super(props);
        this.state = {
            listName: '',
            items: [],
            meno: '',
            priezvisko: '',
            deletePriezvisko: '',
            updateId: '',
            updateMeno: '',
            updatePriezvisko: ''
        };
    }
    handleMenoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ meno: event.target.value });
        console.log('Meno: ', this.state.meno);
        
    }

    handlePriezviskoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ priezvisko: event.target.value });
    }
    
    handleUpdateIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ updateId: event.target.value });
    }

    handleUpdateMenoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ updateMeno: event.target.value });
      }
    
      handleUpdatePriezviskoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ updatePriezvisko: event.target.value });
      }

    handleDeletePriezviskoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ deletePriezvisko: event.target.value });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ listName: event.target.value });
    }

    // CREATE ITEM
    handleCreateClick = () => {
        const item = {
            __metadata: {
                type: 'SP.Data.CRUDLISTListItem'
              },
            Title: 'Osoba',
            Meno: this.state.meno,
            Priezvisko: this.state.priezvisko
        };

        console.log('Posielane hodnoty: ', item);
        

        this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CRUDLIST')/items`, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': '',
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            alert('Položka bola úspešne vytvorená');
            console.log(data);            
            this.setState({ meno: '', priezvisko: '' });
            this.handleLoadClick();
        })
        .catch(error => {
            console.error(error);
        });
    }

    // DELETE ITEM
    handleDeleteClick = () => {


        this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CRUDLIST')/items?$filter=Priezvisko eq '${this.state.deletePriezvisko}'`, SPHttpClient.configurations.v1)
        .then(response => response.json())
        .then(data => {
            if(data.value.length > 0) {
                const itemId = data.value[0].Id;
                this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CRUDLIST')/items(${itemId})`, SPHttpClient.configurations.v1, {
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-type': 'application/json;odata=verbose',
                        'odata-version': '',
                        'X-HTTP-Method': 'DELETE',
                        'IF-MATCH': '*'
                    }
                })
                .then(() => {
                    console.log(data);
                    alert(`Polozka s priezviskom ${this.state.deletePriezvisko} vymazana`);
                    this.setState({ deletePriezvisko: '' });
                    this.handleLoadClick();
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                console.log('Polozka s tymto priezviskom neexistuje');
                alert('Polozka s tymto priezviskom neexistuje');
            }
            this.setState({ items: data.value });
        })
        .catch(error => {
            console.error(error);
        });
    }

    // UPDATE ITEM
    handleUpdateClick = () => {
        const { context } = this.props;
        const { updateId, updateMeno, updatePriezvisko } = this.state;
    
        const item = {
          __metadata: {
            type: 'SP.Data.CRUDLISTListItem'
          },
          Meno: updateMeno,
          Priezvisko: updatePriezvisko
        };
    
        context.spHttpClient.post(`${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CRUDLIST')/items(${updateId})`, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'X-HTTP-Method': 'MERGE',
            'If-Match': '*'
          },
          body: JSON.stringify(item)
        })
          .then(() => {
            console.log('Položka bola úspešne aktualizovaná');
            alert(`Položka s ID: ${updateId} bola úspešne aktualizovaná`);
            this.setState({ updateId: '', updateMeno: '', updatePriezvisko: '' });
            this.handleLoadClick();
          })
          .catch(error => console.error(error));
      }

      // GET ITEM/S
    handleLoadClick = () => {
        
        this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CRUDLIST')/items`, SPHttpClient.configurations.v1)
        .then(response => response.json())
        .then(data => {
            this.setState({ items: data.value });
        })
        .catch(error => {
            console.error(error);
        });
            
    }

    render() {
        return (
            <div className={styles.shpApiPage}>
                {/* GET OPERACIA */}
                <h2>GET</h2>
                {/*<input type="text" value={this.state.listName} onChange={this.handleInputChange} placeholder='Zadajte názov zoznamu' />*/}
                <button onClick={this.handleLoadClick}>Nacitaj</button>

                {/* POST OPERACIA */}
                <h2>POST</h2>
                <input type="text" value={"Osoba"} readOnly={true} />
                <input type="text" value={this.state.meno} onChange={this.handleMenoChange} placeholder="Zadajte meno" />
                <input type="text" value={this.state.priezvisko} onChange={this.handlePriezviskoChange} placeholder="Zadajte priezvisko" />
                <button onClick={this.handleCreateClick}>Vytvoriť</button>

                {/* DELETE OPERACIA */}
                <h2>DELETE</h2>
                <input type="text" value={this.state.deletePriezvisko} onChange={this.handleDeletePriezviskoChange} placeholder="Zadajte priezvisko pre vymazanie" />
                <button onClick={this.handleDeleteClick}>Vymazať</button>

                {/* UPDATE OPERACIA */}
                <h2>UPDATE</h2>
                <input type="text" value={this.state.updateId} onChange={this.handleUpdateIdChange} placeholder="Zadajte ID položky pre aktualizáciu" />
                <input type="text" value={this.state.updateMeno} onChange={this.handleUpdateMenoChange} placeholder="Zadajte meno pre aktualizáciu" />
                <input type="text" value={this.state.updatePriezvisko} onChange={this.handleUpdatePriezviskoChange} placeholder="Zadajte priezvisko pre aktualizáciu" />
                <button onClick={this.handleUpdateClick}>Aktualizovať</button>


                {/* Vypis Zoznamu */}
                <ul>
                    {this.state.items.map((item: any, index: number) => (
                        <li key={index}>{item.ID} - {item.Title} - {item.Meno} {item.Priezvisko}</li>
                    ))}
                </ul>
            </div>
        );
    }
}