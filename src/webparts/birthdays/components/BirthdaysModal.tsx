import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import  customStyles from './Birthdays.module.scss';
import * as strings from 'BirthdaysWebPartStrings';
import UserProfileCard from './UserProfileCard';
import { IUserServiceProps } from './IBirthdaysProps';
import * as moment from 'moment';

export interface IBirthdayModal {
    _openModal:()=>void,
    _hideModal:()=>void
    _showModal:boolean,
    _month:number,
    _persons:Array<any>,
    _changeMonth: (i:number)=>void
}

export const BirthdayModal = (props:IBirthdayModal):JSX.Element => {

    return(
        <Modal 
            isOpen={props._showModal}
            onDismiss={props._hideModal}
            isBlocking={false}
            containerClassName={customStyles.containerModal}
            >
            <div className={customStyles["ms-modalExample-header"]}>
                <span>Cumpleañeros mes de Enero</span>
                <Dropdown 
                    onChanged={(op: IDropdownOption)=>{
                        props._changeMonth(Number(op.key)) 
                    }}
                    dropdownWidth={200}
                    defaultSelectedKey={props._month}
                    options={[
                        {key:0, text: moment().month(0).format("MMMM")},
                        {key:1, text: moment().month(1).format("MMMM")},
                        {key:2, text: moment().month(2).format("MMMM")},
                        {key:3, text: moment().month(3).format("MMMM")},
                        {key:4, text: moment().month(4).format("MMMM")},
                        {key:5, text: moment().month(5).format("MMMM")},
                        {key:6, text: moment().month(6).format("MMMM")},
                        {key:7, text: moment().month(7).format("MMMM")},
                        {key:8, text: moment().month(8).format("MMMM")},
                        {key:9, text: moment().month(9).format("MMMM")},
                        {key:10, text: moment().month(10).format("MMMM")},
                        {key:11, text: moment().month(11).format("MMMM")},                        
                    ]}
                    
                />
                    <Button onClick={()=>{ props._hideModal() }} text="Close" style={{textAlign:"left"}} />
            </div>    
            <div id="Mundo" className={customStyles["ms-modalExample-body"]}>
                <div>                         
                    {props._persons.map((elem:IUserServiceProps,i:number)=>{
                        return(
                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4 ms-xl3" key={elem.WorkEmail}>
                                <strong className={customStyles["tag-date"]}>{moment(elem.Birthday01).format("dddd DD")}</strong>
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



