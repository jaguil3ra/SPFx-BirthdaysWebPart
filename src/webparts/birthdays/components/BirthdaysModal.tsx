import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import  customStyles from './Birthdays.module.scss';
import { getUserBySearch } from '../service/UtilsService';
import UserProfileCard from './UserProfileCard';
import { IUserServiceProps } from './IBirthdaysProps';
import styles from './Birthdays.module.scss';
import * as moment from 'moment';

export interface IBirthdayModal {
    _openModal:()=>void,
    _hideModal:()=>void
    _showModal:boolean,
    _persons:Array<any>
}

export interface IBirthdaySection{
    date : Date ,
    users: Array<IUserServiceProps>
}

export const BirthdayModal = (props:IBirthdayModal):JSX.Element => {
    let daysElements = Array<IBirthdaySection>();

    props._persons.forEach((elem:IUserServiceProps,i:number)=>{
        let currentElements = daysElements.filter( k => k.date===elem.Birthday01);
        if(currentElements.length === 0){
            let temp:IBirthdaySection = ({ date : elem.Birthday01, users: new Array<IUserServiceProps>()});
            temp.users.push(elem);
            daysElements.push(temp);        
        }else{
            currentElements[0].users.push(elem);
        }
    })
    
    let persons: Array<JSX.Element> = daysElements.map((elem:IBirthdaySection, i:number)=>{

        return(
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <h2> {moment(elem.date).format("DD-MM")}</h2>
                    {
                        elem.users.map((elem:IUserServiceProps, i:number)=>{
                            return(
                            <div className="ms-Grid-col ms-sm1 ms-md4 ms-lg3">
                            <strong style={{textAlign:"center"}}>{elem.Birthday01}</strong>
                                <UserProfileCard 
                                    Birthday01={elem.Birthday01} 
                                    Title={elem.Title} 
                                    Department={elem.Department} 
                                    JobTitle={elem.JobTitle} 
                                    HireDate01={elem.HireDate01} 
                                    WorkPhone={elem.WorkPhone}
                                    WorkEmail={elem.WorkEmail} ></UserProfileCard>
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    });


    return(<div className="ms-Grid-col ms-sm12">
        <div className={styles["bar-secondary"]}>
            <div className="ms-Grid">
                <div className="ms-Grid-col ms-sm6">
                <Button className={customStyles.light} style={{marginRight:"20px"}}  ><Icon iconName="GotoToday" /> Hoy </Button>
                <Button className={customStyles.light} ><Icon iconName="CalendarWeek" /> Esta Semana</Button>              
                </div>
                <div className="ms-Grid-col ms-sm6">
                <Button className={customStyles.light}  style={ {float:"right"}} onClick={()=>{ props._openModal() }} > <Icon iconName="ShowResults"></Icon> Mostrar Mas</Button>
                </div>                
            </div>
            
            <Modal 
              titleAriaId={"HOla"}
              subtitleAriaId={"Mundo"}
              isOpen={props._showModal}
              onDismiss={props._hideModal}
              isBlocking={false}
              containerClassName={customStyles.containerModal}
            >
                <div className={styles["ms-modalExample-header"]}>
                    <span>Cumpleañeros mes de Enero</span>
                        <Button onClick={()=>{ props._hideModal() }} text="Close" style={{textAlign:"left"}} />

                </div>    
                <div id="Mundo" className={styles["ms-modalExample-body"]}>
                    <div>                         
                        {persons}
                    </div>                
                </div>
            </Modal>
        </div>
    </div>)
}





