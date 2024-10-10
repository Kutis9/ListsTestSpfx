import { WebPartContext } from "@microsoft/sp-webpart-base";
import SPService from "./SPService";

export interface IListsTestProps {
  description: string;
  context: WebPartContext;
  SPService: SPService;
}
