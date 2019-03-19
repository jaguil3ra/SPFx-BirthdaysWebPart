import { SPHttpClient } from '@microsoft/sp-http'

export interface IBirthdaysProps {
  birthdayProps:IBirthdaysWebProps;
  spHttp:SPHttpClient
}

export interface IBirthdaysWebProps {
  title: string;
  pictureSize:number;
  showDepartament:boolean;
  showPhone:boolean;
  showJobTitle:boolean;
}
export interface IPersonaProps{
  title:string;
  WorkEmail:string;
  jobTitle:string;
  departament:string;
  phone:string;
  size?:number;
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
}


