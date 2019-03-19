import * as React from 'react';
import customStyles from './Birthdays.module.scss';
import { IBirthdaysProps } from './IBirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { getUserBySearch } from '../service/UtilsService';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import  { BirthdayModal } from './BirthdaysModal';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import {IUserServiceProps} from './IBirthdaysProps';
export default class Birthdays extends React.Component<IBirthdaysProps, {}> {
  
  constructor(props){
    super(props)
    this._loadUsers();
    this._openModal = this._openModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
  }
  state ={
    personsToday:Array<IUserServiceProps>(),
    personsByRange:Array<IUserServiceProps>(),
    showModal:false,
    isLoad:false,
  };
  private _loadUsers = ():void=>{
    getUserBySearch(this.props.spHttp, (items:Array<IUserServiceProps>)=>{ 
      this.setState({ personsToday:items,isLoad:true});      
    });    
  }
  private _openModal =():void=> {
    this.setState({
      showModal:true
    })
  }
  private _hideModal =():void=> {
    this.setState({
      showModal:false
    })
  }
  
  public render(): React.ReactElement<IBirthdaysProps> {
    let spiner = !this.state.isLoad ? <div>
              <Spinner size={SpinnerSize.large} label="Sorry, still loading..." ariaLive="assertive" /*labelPosition="top"*/ /> 
    </div>:"";
    let persons = this.state.personsToday.map((item:IUserServiceProps,i:number)=>{
      return  <Persona className={customStyles["persona-item"]}
      key={i}
      imageUrl={"/_layouts/userphoto.aspx?size=L&accountname="+item.WorkEmail }
      text={item.Title}
      secondaryText={item.JobTitle ? item.JobTitle: ""}
      hidePersonaDetails={false}
      tertiaryText={item.Department ? item.Department:"" }
      //showSecondaryText={true}
      size={   this.props.birthdayProps.pictureSize} >
    </Persona>
    });

    return (
      <div className={ customStyles.birthdays }>
        <div className="ms-Grid">
          <div className="ms-Grid-col ms-sm12" >
            <div className={customStyles["title-zone"]}>
              <Icon  iconName="BirthdayCake" className="ms-font-xxl" /> <span className="ms-font-xxl">{escape(this.props.birthdayProps.title)}</span>
            </div>            
          </div>
          <div className="ms-Grid-col ms-sm12">
            <div className="" style={{maxHeight:"300px", overflowY:"scroll"}}>
              {spiner}
              {persons}
            </div>
          </div>    
          <div >
            <BirthdayModal _showModal={this.state.showModal} _openModal={this._openModal} _hideModal={this._hideModal}  _persons={this.state.personsToday} ></BirthdayModal>
          </div>                
        </div>
      </div>
    );
  }
}
