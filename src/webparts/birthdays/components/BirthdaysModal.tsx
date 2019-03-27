import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import  customStyles from './Birthdays.module.scss';
import * as strings from 'BirthdaysWebPartStrings';
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

export const BirthdayModal = (props:IBirthdayModal):JSX.Element => {
    return(
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
                    {props._persons.map((elem:IUserServiceProps,i:number)=>{
                        return(
                            <div className="ms-Grid-col ms-sm1 ms-md4 ms-lg3" key={elem.WorkEmail}>
                                <strong style={{background:"#005a9e", color:"#FFF", padding:"5px"}}>{moment(elem.Birthday01).format("dddd DD")}</strong>
                                <UserProfileCard 
                                    Birthday01={elem.Birthday01} 
                                    PictureURL={elem.PictureURL}
                                    Title={elem.Title} 
                                    Department={elem.Department} 
                                    JobTitle={elem.JobTitle} 
                                    HireDate01={elem.HireDate01} 
                                    WorkPhone={elem.WorkPhone}
                                    WorkEmail={elem.WorkEmail} ></UserProfileCard>
                            </div>                          
                            )
                        })}
                </div>                
                </div>
        </Modal>
    )
}





