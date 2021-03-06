import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';
import {  Range } from '../components/IBirthdaysProps';
type Clousere = (items:Array<any>)=>void;
import * as moment from 'moment';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export class UtilService {
  //#region Example
  //Only for example job and deparament
  private MockupElements = () =>{
    return [
      { job: "Developer Senior",dep: "PMO"},
      { job: "Developer Junior",dep: "PMO"},
      { job: "Technical Consultant",dep: "PMO"},
      { job: "Functional Consultant",dep: "PMO"},
      { job: "Developer Junio",dep: "PMO"},
      { job: "Technical Support",dep: "Support"},
      { job: "Recluter",dep: "Human Resources"},
      { job: "Telemarketing",dep: "Sales"},
      { job: "Chief Technology",dep: "Directory"},
      { job: "Technical Support",dep: "Support"},
      { job: "Functional Consultant",dep: "PMO"},
      { job: "Finantial Controller",dep: "Finantial"},
      { job: "Adoption Management",dep: "Adoption"},
      { job: "Product Manager",dep: "Sales Terrirory"},
      { job: "Marketing Manager",dep: "Marketing"},
      { job: "Sales",dep: "Sales"},
      { job: "Adoption Management",dep: "Adoption"},
      { job: "Etichal Hacking",dep: "SEcurity Compliance"},
      { job: "Networks Support",dep: "Infrastructure"},
      { job: "Telemarketing",dep: "Sales"},
      { job: "Developer Senior",dep: "PMO"},
    ]
  } 
  //Only for developer enviroment
  private getDataSample = (month:number,sphttp:SPHttpClient, callback: Clousere)=>{
    let page = month? month+1 : 13;
    sphttp.get("https://gorest.co.in/public-api/users?page="+page+"&_format=json&access-token=sBFgU5pW0SdEGU3kuTLEtSD3JGZlsvZlzKoY",SPHttpClient.configurations.v1).then((response: SPHttpClientResponse)=>{
      response.json().then((responseJSON: any) => {
        let MyLista = responseJSON.result.map((e)=>{ 
          let mokupElements = this.MockupElements();
          let mokup = mokupElements.pop();
          return{
          Birthday01: month 
          ? moment().month(month).date(Math.floor(Math.random()*30) +1).toISOString() 
          :moment().startOf('week').add(Math.floor(Math.random()*7),"day").month(moment().month()).toISOString() ,
          PictureURL:e._links.avatar.href,
          WorkEmail:e.email,
          Title:e.name,
          HireDate01:e.dob,
          WorkPhone:e.phone,
          JobTitle:mokup.job,
          Department:mokup.dep
        }})
        callback(MyLista)
      });
    })
  }
  //#endregion Example

  private callApiPost = (url: string, sphttp:SPHttpClient,spOpts:ISPHttpClientOptions,callback:(response: SPHttpClientResponse)=>void ):void =>{
    sphttp.post(url, SPHttpClient.configurations.v1,spOpts).then((response: SPHttpClientResponse)=>{
      callback(response);
    });
  }
  
  public getUserBySearch = (sphttp:SPHttpClient,callback:Clousere, period:Range, month?:number):void =>{
    if(Environment.type !== EnvironmentType.Local){
      let currentRange:string;
      if(period == Range.Week){
        currentRange = "Birthday01>="+moment().day(0).year(2000).toISOString()+" AND Birthday01<="+moment().day(6).year(2000).toISOString()
      }else if (period == Range.Month){
        currentRange = "Birthday01>="+moment().month(month).date(1).year(2000).toISOString()+" AND Birthday01<="+moment().month(month).endOf('month').year(2000).toISOString()
      }else{
        currentRange = "BirthdayO1>="+moment().year(2000).day(1).month(1).toISOString()+" AND BirthdayO1<="+moment().year(2000).date(31).month(11).toISOString()
      }
      const spOpts: ISPHttpClientOptions = {
        body: JSON.stringify({
          request: {
                SourceId:'B09A7990-05EA-4AF9-81EF-EDFAB16C4E31',
                Querytext:currentRange,
                RowLimit:500,
                SelectProperties: [
                    "PictureURL",
                    "JobTitle",
                    "WorkEmail",
                    "PreferredName",
                    "AccountName",
                    "Department",
                    "Birthday01",
                    "Title",
                    "WorkPhone",
                    "RefinableDate00",
                    "HireDate01",
                    "RefinableDate01"
                ]						
            }					
        })
      };
      this.callApiPost("/_api/search/postquery",sphttp,spOpts, (response: SPHttpClientResponse)=>{
        response.json().then((responseJSON: any) => {
          console.log(responseJSON.PrimaryQueryResult.RelevantResults.Table.Rows);
          const items = responseJSON.PrimaryQueryResult.RelevantResults.Table.Rows;
          let MyLista = [];
          items.forEach((elemento)=>{
            var temp = {};
            elemento.Cells.forEach((act, i)=>{
              temp[act.Key] = act.Value
              if(act.Key == "WorkEmail"){
                temp["PictureURL"] = "/_layouts/userphoto.aspx?size=L&accountname="+act.Value
              }
              if(act.Key == "Birthday01"){
                temp[act.Key] = moment(act.Value).year(moment().year()).toLocaleString()
              }
            })
            MyLista.push(temp)
          })
          callback(MyLista)
        }).catch((error)=>{
          console.log(error);
          callback([])
        });;
      })
    }else{
      this.getDataSample(month, sphttp,(items:Array<any>)=>{ console.log(items);callback(items) })
    }
  }
}
export const utilsService = new UtilService();
