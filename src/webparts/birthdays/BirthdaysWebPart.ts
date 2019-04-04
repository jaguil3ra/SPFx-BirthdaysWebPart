import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http'
import * as microsoftTeams from '@microsoft/teams-js';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
//import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import  PropertyPaneCredits from './PropertyPanelCredits'
import * as strings from 'BirthdaysWebPartStrings';
import Birthdays from './components/Birthdays';
import { IBirthdaysWebProps,IBirthdaysProps } from './components/IBirthdaysProps';


export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebProps> {
  //private _teamsContext: microsoftTeams.Context;
  
  public render(): void {
    const element: React.ReactElement<IBirthdaysProps> = React.createElement(
      Birthdays,
      {
        birthdayProps: this.properties,
        spHttp: this.context.spHttpClient,
        _pageContext:this.context.pageContext
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

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
                PropertyPaneTextField('title', {
                  label: strings.DescriptionPropertyTitle,
                  maxLength:50
                }),
                PropertyPaneCheckbox('showJobTitle', {
                  text: strings.DescriptionPropertyShowJobTitle,
                  checked:true
                }),                 
                PropertyPaneCheckbox('showDepartament', {
                  text: strings.DescriptionPropertyShowDepartament,
                  checked:false
                }),                  
  
                new PropertyPaneCredits()                                              
              ]
            }
          ],
          
        }
      ]
    };
  }
}
