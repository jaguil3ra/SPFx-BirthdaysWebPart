import { SPHttpClient } from '@microsoft/sp-http'

export interface IBirthdaysProps {
  birthdayProps:IBirthdaysWebProps;
  spHttp:SPHttpClient,
  _pageContext:{
    cultureInfo:{
      _currentCultureName:string
      _currentUICultureName:string
    },
    site:{
      absoluteUrl:string,
      _isNoScriptEnabled:boolean
    },
    web:{
      absoluteUrl:string,
      language:number,
      logoUrl:string,
    },
    user:{
      displayName:string,
      email:string,
      loginName:string,
    }
    
  }
}

export interface IBirthdaysWebProps {
  title: string;
  showDepartament:boolean;
  showJobTitle:boolean;
}
export interface IPersonaProps{
  title:string;
  WorkEmail:string;
  jobTitle:string;
  departament:string;
  phone:string;
  birthday?:Date
}

export interface IUserServiceProps{
  AccountName?:string;
  Birthday01?:Date;
  HireDate01?:Date;
  Department:string;  
  JobTitle:string;
  Title:string;
  WorkEmail:string;
  WorkPhone?:string;
  RefinableDate00?:Date;
  RefinableDate01?:Date;
  PictureURL:string
}

export enum Range{
  Week,
  Month,
  Year
}

