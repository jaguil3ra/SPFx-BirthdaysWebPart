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
                            size={14} >
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
                    <li className={customStyles["ms-PersonaCard-overflow"]} title="View profile in Delve"><a target="_blank" href={"/_layouts/15/me.aspx/?p="+this.props.WorkEmail}>View profile</a></li>
                    </ul>
                    <div className={customStyles['ms-PersonaCard-actionDetailBox']}>
                        <ul id="detailList" className={customStyles['ms-PersonaCard-detailChat']}>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.teams ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span className={customStyles['ms-PersonaCard-detailLabel']}>Skype: </span> 
                                    <a className={customStyles['ms-Link']} target="_blank" href={"sip:"+this.props.WorkEmail }>Teams</a>
                                </div>
                            </li>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.phone ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span  className={customStyles['ms-PersonaCard-detailLabel']}>Work: </span>{this.props.WorkPhone}
                                </div>
                            </li>
                            <li  className={customStyles['ms-PersonaCard-actionDetails'] +" "+ (this.state.email ? customStyles['is-active']: customStyles['hide'])}>
                                <div className={customStyles['ms-PersonaCard-detailLine']}>
                                    <span className={customStyles['ms-PersonaCard-detailLabel']}>Email: </span> 
                                    <a className={customStyles['ms-Link']}  href={"mailto:"+this.props.WorkEmail}>{this.props.WorkEmail}</a>
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