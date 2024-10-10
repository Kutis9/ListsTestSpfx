import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default class SPService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  // Create item
  public createItem(listName: string, item: any): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient.post(
      `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        },
        body: JSON.stringify(item)
      }
    );
  }

  // Read items
  public getItems(listName: string): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient.get(
      `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      SPHttpClient.configurations.v1
    );
  }

  // Update item
  public updateItem(listName: string, itemId: number, item: any): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient.post(
      `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE'
        },
        body: JSON.stringify(item)
      }
    );
  }

  // Delete item
  public deleteItem(listName: string, itemId: number): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient.post(
      `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'DELETE'
        }
      }
    );
  }
}