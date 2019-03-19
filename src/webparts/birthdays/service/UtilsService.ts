import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';
type clousere = (items:Array<any>)=>void;
import * as moment from 'moment';
 //'node_modules/office-ui.fabric/fabric-9.6.0.scoped.min'
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
export const getUserBySearch = (sphttp:SPHttpClient,callback:clousere):void=> {
    console.log(moment().year(2000).date(1).month(0).toISOString());
    const spOpts: ISPHttpClientOptions = {
        body: JSON.stringify({
          request: {
                SourceId:'B09A7990-05EA-4AF9-81EF-EDFAB16C4E31',
                Querytext:"RefinableDate00>="+moment().year(2000).day(1).month(1).toISOString()+" AND RefinableDate00<="+moment().year(2000).date(31).month(11).toISOString(),
                RowLimit:1000,
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
    if(Environment.type !== EnvironmentType.Local){
      sphttp.post("/_api/search/postquery", SPHttpClient.configurations.v1,spOpts).then((response: SPHttpClientResponse)=>{
        response.json().then((responseJSON: any) => {
            console.log(responseJSON);
          const items = responseJSON.PrimaryQueryResult.RelevantResults.Table.Rows;
          let MyLista = [];
          items.forEach((elemento)=>{
              var temp = {};
            elemento.Cells.forEach((act, i)=>{
              temp[act.Key] = act.Value
            })
            MyLista.push(temp)
          })
          console.log(MyLista);
          callback(MyLista)
        });
      })
    }else{
      setTimeout(()=>{
        callback([
          {
            Birthday01:"10/16/2000 12:00:00 AM",
            Title:"Jose Aguilera",
            JobTitle:"Consultor SharePoint",
            WorkEmail:"dl_jose5@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"10/16/2000 12:00:00 AM",
            Title:"Inocencia Yepez",
            JobTitle:"Gerente General",
            WorkEmail:"inocencia@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"15/03/2000 12:00:00 AM",
            Title:"Sonia Ramirez",
            JobTitle:"Gerente RRHHH",
            WorkEmail:"sonia@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"21/07/2000 12:00:00 AM",
            Title:"Li Aguilera",
            JobTitle:"Presidenta",
            WorkEmail:"Li Aguilera@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"10/16/2000 12:00:00 AM",
            Title:"Jose Aguilera",
            JobTitle:"Consultor SharePoint",
            WorkEmail:"dl_jose51@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"10/16/2000 12:00:00 AM",
            Title:"Inocencia Yepez",
            JobTitle:"Gerente General",
            WorkEmail:"inocencia1@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"15/03/2000 12:00:00 AM",
            Title:"Sonia Ramirez",
            JobTitle:"Gerente RRHHH",
            WorkEmail:"sonia1@hotmail.com",
            WorkPhone:"99999999"
          },
          {
            Birthday01:"21/07/2000 12:00:00 AM",
            Title:"Li Aguilera",
            JobTitle:"Presidenta",
            WorkEmail:"Li Aguilera1@hotmail.com",
            WorkPhone:"99999999"
          }
        ])
      },1000)
    }
}


