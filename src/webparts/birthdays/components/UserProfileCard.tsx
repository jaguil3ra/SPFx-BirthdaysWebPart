import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import  customStyles from './Birthdays.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {IUserServiceProps} from './IBirthdaysProps';

export const UserProfileCard = (props:IUserServiceProps):JSX.Element =>{
    return(
        <div className={customStyles.userCart}>
            <div className={customStyles['ms-PersonaCard']+" "+customStyles['ms-PersonaCard']}>
                <div className={customStyles['ms-PersonaCard-persona']}>
                <div className={customStyles['ms-Persona ms-Persona--xl']} style={{padding:"1px 0px 13px 20px"}}>
                <Persona className={customStyles["persona-item"]}
                        imageUrl={"/_layouts/userphoto.aspx?size=L&accountname="+props.WorkEmail}
                        text={props.Title}
                        secondaryText={props.JobTitle}
                        hidePersonaDetails={false}
                        tertiaryText={ props.Department }
                        size={15} >
                        <strong>{props.Birthday01}</strong>
                        </Persona>
                </div>
                </div>
                <ul  className={customStyles['ms-PersonaCard-actions']}>
                <li  className={customStyles['ms-PersonaCard-action']+" "+customStyles['is-active']}>
                    <Icon iconName="TeamsLogo" />
                </li>
                <li  className={customStyles['ms-PersonaCard-action']}>
                    <Icon iconName="Phone" />
                </li>
                <li  className={customStyles['ms-PersonaCard-action']}>
                    <Icon iconName="Mail" />
                </li>
                <li className={customStyles["ms-PersonaCard-overflow"]} title="View profile in Delve">View profile</li>
                </ul>
                <div className={customStyles['ms-PersonaCard-actionDetailBox']}>
                    <ul id="detailList" className={customStyles['ms-PersonaCard-detailChat']}>
                        <li id="chat" className={customStyles['ms-PersonaCard-actionDetails'] +" "+customStyles['detail-1']}>
                            <div className={customStyles['ms-PersonaCard-detailLine']}>
                                <span className={customStyles['ms-PersonaCard-detailLabel']}>Skype: </span> 
                                <a className={customStyles['ms-Link']} href="#">Teams an IM chat</a>
                            </div>
                        </li>
                        <li id="phone" className={customStyles['ms-PersonaCard-actionDetails'] +" "+customStyles['detail-2']}>
                            <div className={customStyles['ms-PersonaCard-detailLine']}>
                                <span className={customStyles['ms-PersonaCard-detailLabel']}>Work: </span>{props.WorkPhone}
                            </div>
                        </li>
                        <li id="mail" className={customStyles['ms-PersonaCard-actionDetails'] +" "+customStyles['detail-4']}>
                            <div className={customStyles['ms-PersonaCard-detailLine']}>
                                <span className={customStyles['ms-PersonaCard-detailLabel']}>Work: </span> 
                                <a className={customStyles['ms-Link']} href="mailto:{props.email}">{props.WorkEmail}</a>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div> 
            <br />
            <br />
        </div>
    )
}

export default UserProfileCard;