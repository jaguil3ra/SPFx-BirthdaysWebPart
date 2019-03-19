import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http'

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
//import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'BirthdaysWebPartStrings';
import Birthdays from './components/Birthdays';
import { IBirthdaysWebProps,IBirthdaysProps } from './components/IBirthdaysProps';


export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebProps> {
  
  public render(): void {
    console.log(this.context.pageContext.cultureInfo);
    const element: React.ReactElement<IBirthdaysProps> = React.createElement(
      Birthdays,
      {
        birthdayProps: this.properties,
        spHttp: this.context.spHttpClient
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
                PropertyPaneDropdown('pictureSize', {
                  label: strings.DescriptionPropertyPersonaSize,
                  selectedKey:1,
                  options:[
                    {
                      key:13,
                      text:strings.OptionSizeShort
                    },
                    {
                      key:14,
                      text:strings.OptionSizeMedium
                    },
                    {
                      key:15,
                      text:strings.OptionSizeLarge
                    },                                        
                  ]
                }),                
                PropertyPaneCheckbox('showDepartament', {
                  text: strings.DescriptionPropertyShowDepartament,
                  checked:false
                }),                  
                PropertyPaneCheckbox('showPhone', {
                  text: strings.DescriptionPropertyShowPhone,
                  checked:false
                }),
                PropertyPaneCheckbox('showJobTitle', {
                  text: strings.DescriptionPropertyShowJobTitle,
                  checked:false
                }),                                                 
              ]
            }
          ]
        }
      ]
    };
  }
}