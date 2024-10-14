import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import * as React from 'react';

export interface IShpApiPAGEProps {
    context: WebPartContext;
}

export interface IShpApiPAGEState {
    listName: string;
    items: any[];
    meno: string;
    priezvisko: string;
    deletePriezvisko: string;
}

export default class ShpApiPAGE extends React.Component<IShpApiPAGEProps, IShpApiPAGEState> {

    constructor(props: IShpApiPAGEProps) {
        super(props);
        this.state = {
            listName: '',
            items: [],
            meno: '',
            priezvisko: '',
            deletePriezvisko: ''
        };
    }
    handleMenoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ meno: event.target.value });
        console.log('Meno: ', this.state.meno);
        
    }

    handlePriezviskoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ priezvisko: event.target.value });
    }

    handleDeletePriezviskoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ deletePriezvisko: event.target.value });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ listName: event.target.value });
    }

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
            console.log(data);            
            this.setState({ meno: '', priezvisko: '' });
            this.handleLoadClick();
        })
        .catch(error => {
            console.error(error);
        });
    }

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
                    this.setState({ deletePriezvisko: '' });
                    this.handleLoadClick();
                    alert(`Polozka s priezviskom ${this.state.deletePriezvisko} vymazana`);
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
            <div>
                {/* GET OPERACIA */}
                <h2>GET</h2>
                <input type="text" value={this.state.listName} onChange={this.handleInputChange} placeholder='Zadajte názov zoznamu' />
                <button onClick={this.handleLoadClick}>Nacitaj</button>

                {/* GET OPERACIA */}
                <h2>POST</h2>
                <input type="text" value={"Osoba"} readOnly={true} />
                <input type="text" value={this.state.meno} onChange={this.handleMenoChange} placeholder="Zadajte meno" />
                <input type="text" value={this.state.priezvisko} onChange={this.handlePriezviskoChange} placeholder="Zadajte priezvisko" />
        <button onClick={this.handleCreateClick}>Vytvoriť</button>

            <h2>DELETE</h2>
        <input type="text" value={this.state.deletePriezvisko} onChange={this.handleDeletePriezviskoChange} placeholder="Zadajte priezvisko pre vymazanie" />
        <button onClick={this.handleDeleteClick}>Vymazať</button>


         {/* Vypis Zoznamu */}
            <ul>
                {this.state.items.map((item: any, index: number) => (
                    <li key={index}>{item.Title} - {item.Meno} - {item.Priezvisko}</li>
                ))}
            </ul>
            </div>
        );
    }
}