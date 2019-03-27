import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
import * as strings from 'BirthdaysWebPartStrings';
export class PropertyPaneCredits implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneCustomFieldProps;

    constructor() {
        this.properties = {
            key: "Credits",
            onRender: this.onRender.bind(this)
       };
   }

   private onRender(elem: HTMLElement): void {
        elem.innerHTML = `
        <div style="position:absolute; bottom:0px;background: #1870b9;width: 100%;margin-left:-30px;padding:5px;text-align:right">
        <div style="color:#FFF">Author: <strong><a href="mailto:dl_jose5@hotmail.com" style="color:#FFF">José Aguilera</a></strong></div>
        <div ><a href="https://jaguil3ra.com/" style="color:#FFF" target="_blank">`+strings.CreditDescription+`</a></div>
        </div>`;
    }
}
export default PropertyPaneCredits;