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
import {  Range } from '../components/IBirthdaysProps';
import * as strings from 'BirthdaysWebPartStrings';
import * as moment from 'moment';
export default class Birthdays extends React.Component<IBirthdaysProps, {}> {
  
  constructor(props){
    super(props)
    this._loadUsers(Range.Year);
    this._openModal = this._openModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._changeMonth = this._changeMonth.bind(this);
    this._changeToWeek = this._changeToWeek.bind(this);
    this._changeToday = this._changeToday.bind(this);
  }
  state ={
    personsToday:Array<IUserServiceProps>(),
    personsWeek:Array<IUserServiceProps>(),
    personsMonth:Array<IUserServiceProps>(),
    month:moment().month(),
    isToday:true,
    showModal:false,
    isLoad:false,
    isLoadModal:false
  };
  private _loadUsers = (range:Range,month?:number):void=>{
    getUserBySearch(this.props.spHttp, (items:Array<IUserServiceProps>)=>{ 
      items = items.sort((a,b) => (a.Birthday01 > b.Birthday01) ? 1 : ((b.Birthday01 > a.Birthday01) ? -1 : 0))
      if(range == Range.Year){
        this.setState({ 
          personsToday:items,
          personsWeek:items,
          isLoad:true});      
      }else{
        this.setState({ 
          personsMonth:items,
          isLoadModal:true
        })
      }
    }, range, month);    
  }
  private _openModal =():void=> {
    this.setState({
      showModal:true
    })
    this._loadUsers(Range.Month,this.state.month)
  }
  private _hideModal =():void=> {
    this.setState({
      showModal:false
    })
  }
  private _changeToWeek =():void=>{

    this.setState({
      isToday: false
    })
  }
  private _changeToday =():void=>{

    this.setState({
      isToday: true
    })
  }

  private _changeMonth =(monthNumber:number):void=>{
    this.setState({
      month:monthNumber
    })
    this._loadUsers(Range.Month,monthNumber)
  }
  
  public render(): React.ReactElement<IBirthdaysProps> {
    let spiner = !this.state.isLoad ? <div>
              <Spinner size={SpinnerSize.large} label="Sorry, still loading..." ariaLive="assertive" /> 
    </div>:"";
    let pernsonRender = this.state.isToday? this.state.personsToday: this.state.personsWeek;
    let persons = pernsonRender.map((item:IUserServiceProps,i:number)=>{
      return  <Persona className={customStyles["persona-item"]}
      key={i}
      imageUrl={ item.PictureURL}
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
          <div className="ms-Grid-col ms-sm12">
            <div className={customStyles["bar-secondary"]}>
              <div className="ms-Grid">
                  <div className="ms-Grid-col ms-sm6">
                  <Button className={customStyles.light} style={{marginRight:"20px"}} onClick={()=>{this._changeToday()}}  ><Icon iconName="GotoToday" /> {strings.ButtonToday} </Button>
                  <Button className={customStyles.light}  onClick={()=>{ this._changeToWeek()}}><Icon iconName="CalendarWeek" /> {strings.ButtonWeek}</Button>              
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Button className={customStyles.light}  style={ {float:"right"}} onClick={()=>{ this._openModal() }} > <Icon iconName="ShowResults"></Icon> {strings.ButtonMore}</Button>
                  </div>                
              </div>
            </div>  
          </div>  
        </div>
        <BirthdayModal _showModal={this.state.showModal} _openModal={this._openModal} _hideModal={this._hideModal}  _persons={this.state.personsMonth} ></BirthdayModal>
      </div>
    );
  }
}
