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
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';


export interface IBirthdayModal {
    _openModal:()=>void,
    _hideModal:()=>void
    _showModal:boolean,
    _month:number,
    _persons:Array<any>,
    _changeMonth: (i:number)=>void,
    showSpinner:boolean,
    locale:string;
}

export const BirthdayModal = (props:IBirthdayModal):JSX.Element => {
    let currentLocale = "en";
    if(props.locale == "es-ES"){
        currentLocale = "es"
    }

    let spiner = props.showSpinner ? 
        <Spinner size={SpinnerSize.large} label={strings.loadingSpinner} ariaLive="assertive" /> :<div></div>
    return(
        <Modal 
            isOpen={props._showModal}
            onDismiss={props._hideModal}
            isBlocking={false}
            containerClassName={customStyles.containerModal}
            >
            <div className={customStyles["ms-modalExample-header"]}>
                <span style={{marginRight:"20px"}}>{strings.DescriptionModal}</span>
                <Dropdown 
                    onChanged={(op: IDropdownOption)=>{
                        props._changeMonth(Number(op.key)) 
                    }}
                    dropdownWidth={200}
                    defaultSelectedKey={props._month}
                    options={[
                        {key:0, text: moment().month(0).locale(currentLocale).format("MMMM")},
                        {key:1, text: moment().month(1).locale(currentLocale).format("MMMM")},
                        {key:2, text: moment().month(2).locale(currentLocale).format("MMMM")},
                        {key:3, text: moment().month(3).locale(currentLocale).format("MMMM")},
                        {key:4, text: moment().month(4).locale(currentLocale).format("MMMM")},
                        {key:5, text: moment().month(5).locale(currentLocale).format("MMMM")},
                        {key:6, text: moment().month(6).locale(currentLocale).format("MMMM")},
                        {key:7, text: moment().month(7).locale(currentLocale).format("MMMM")},
                        {key:8, text: moment().month(8).locale(currentLocale).format("MMMM")},
                        {key:9, text: moment().month(9).locale(currentLocale).format("MMMM")},
                        {key:10, text: moment().month(10).locale(currentLocale).format("MMMM")},
                        {key:11, text: moment().month(11).locale(currentLocale).format("MMMM")},                        
                    ]}
                />
                    
            </div>    
            <div  className={customStyles["ms-modalExample-body"]}>
                <Button onClick={()=>{ props._hideModal() }} text="Close" className={customStyles.light}  /><br /><br />
                <div>
                    {spiner}
                    {props._persons.length == 0 && !props.showSpinner? 
                    <div style={{textAlign:"center"}}>
                        <Icon style={{fontSize:"80px"}}  iconName="Balloons" className="ms-font-xxl" />
                        <p className="ms-font-xxl">{strings.EmptyBirthday}</p>
                    </div>: 
                        props._persons.map((elem:IUserServiceProps,i:number)=>{
                        return(
                            <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4 ms-xl3" key={elem.WorkEmail}>
                                <strong className={customStyles["tag-date"]}>{moment(elem.Birthday01).locale(currentLocale).format("dddd DD")}</strong>
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



