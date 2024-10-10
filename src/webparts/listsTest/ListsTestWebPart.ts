import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListsTestWebPartStrings';
import ListsTest from './components/ListsTest';
import { IListsTestProps } from './components/IListsTestProps';
import SPService from './components/SPService';

export interface IListsTestWebPartProps {
  description: string;
}

export default class ListsTestWebPart extends BaseClientSideWebPart<IListsTestWebPartProps> {

  private SPService: SPService;

  protected onInit(): Promise<void> {
    this.SPService = new SPService(this.context); // Vytvoríme inštanciu služby
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IListsTestProps > = React.createElement(
      ListsTest,
      {
        description: this.properties.description,
        context: this.context,
        SPService: this.SPService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
