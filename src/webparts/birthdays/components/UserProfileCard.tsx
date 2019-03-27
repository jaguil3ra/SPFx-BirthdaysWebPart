import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import  customStyles from './Birthdays.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {IUserServiceProps} from './IBirthdaysProps';

export class UserProfileCard extends React.Component<IUserServiceProps, {}>{
    constructor(props){
        super(props);
        this._showTeam = this._showTeam.bind(this)
        this._showPhone = this._showPhone.bind(this)
        this._showMail = this._showMail.bind(this)
    }
    state={
        teams:true,
        phone:false,
        email:false
    }
    private _showTeam = ():void=>{
        this.setState({
            teams:true,
            phone:false,
            email:false
        })
    }
    private _showPhone = ()=>{
        this.setState({
            teams:false,
            phone:true,
            email:false
        })        
    }
    private  _showMail = ()=>{
        this.setState({
            teams:false,
            phone:false,
            email:true
        })
    }
    public render(): React.ReactElement<IUserServiceProps>{

        return(
            <div className={customStyles.userCart} key={this.props.WorkEmail}>
                <div className={customStyles['ms-PersonaCard']+" "+customStyles['ms-PersonaCard']}>
                    <div className={customStyles['ms-PersonaCard-persona']}>
                    <div className={customStyles['ms-Persona ms-Persona--xl']} style={{padding:"1px 0px 13px 20px"}}>
                    <Persona className={customStyles["persona-item"]}
                            imageUrl={this.props.PictureURL}
                            text={this.props.Title}
                            secondaryText={this.props.JobTitle}
                            hidePersonaDetails={false}
                            tertiaryText={ this.props.Department }
                            size={15} >
                            <strong>{this.props.Birthday01}</strong>
                            </Persona>
                    </div>
                    </div>
                    <ul  className={customStyles['ms-PersonaCard-actions']}>
                    <li onClick={()=>{ this._showTeam() }} className={customStyles['ms-PersonaCard-action'] +" "+ (this.state.teams ? customStyles['is-active']: "")} >
                        <Icon iconName="TeamsLogo" />
                    </li>
                    <li onClick={()=>{ this._showPhone() }} className={customStyles['ms-PersonaCard-action'] +" "+ (this.state.phone ? customStyles['is-active']: "")} >
                        <Icon iconName="Phone" />
                    </li>
                    <li onClick={()=>{ this._showMail() }} className={customStyles['ms-PersonaCard-action'] +" "+ (this.state.email ? customStyles['is-active']: "")} >
                        <Icon iconName="Mail" />
                    </li>
                    <li className={customStyles["ms-PersonaCard-overflow"]} title="View profile in Delve">View profile</li>
                    </ul>
                    <div className={customStyles['ms-PersonaCard-actionDetailBox']}>
                        <ul id="detailList" className={customStyles['ms-PersonaCard-detailChat']}>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.teams ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span className={customStyles['ms-PersonaCard-detailLabel']}>Skype: </span> 
                                    <a className={customStyles['ms-Link']} href="#">Teams an IM chat</a>
                                </div>
                            </li>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.phone ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span className={customStyles['ms-PersonaCard-detailLabel']}>Work: </span>{this.props.WorkPhone}
                                </div>
                            </li>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.email ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span className={customStyles['ms-PersonaCard-detailLabel']}>Work: </span> 
                                    <a className={customStyles['ms-Link']} href="mailto:{props.email}">{this.props.WorkEmail}</a>
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
}

export default UserProfileCard;