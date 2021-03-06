import * as React from 'react';
import customStyles from './Birthdays.module.scss';
import { IBirthdaysProps } from './IBirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { utilsService } from '../service/UtilsService';
import UserProfileCard from './UserProfileCard';
import  { BirthdayModal } from './BirthdaysModal';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import {IUserServiceProps} from './IBirthdaysProps';
import {  Range } from '../components/IBirthdaysProps';
import * as strings from 'BirthdaysWebPartStrings';
import * as moment from 'moment';

export default class Birthdays extends React.Component<IBirthdaysProps, {}> {
  
  constructor(props){
    super(props)
    this._loadUsers(Range.Week);
    this._openModal = this._openModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._changeMonth = this._changeMonth.bind(this);
    this._changeToWeek = this._changeToWeek.bind(this);
    this._changeToday = this._changeToday.bind(this);
  }
  state ={
    //today's birthdays
    todayBirthdays:Array<IUserServiceProps>(),
    //week's birthdays
    weekBirthdays:Array<IUserServiceProps>(),
    //month's birthdays
    monthBirthdays:Array<IUserServiceProps>(),
    birthdaysToShow:Array<IUserServiceProps>(),
    month:moment().month(),
    isToday:true,
    showModal:false,
    showSpinner:true,
    showSpinnerModal:true
  };

  //Method let me call searchService
  private _loadUsers = (range:Range,month?:number):void=>{
    utilsService.getUserBySearch(this.props.spHttp, (items:Array<IUserServiceProps>)=>{ 
      items = items.sort((a,b) => (moment(a.Birthday01) > moment(b.Birthday01)) ? 1 : ((moment(b.Birthday01) > moment(a.Birthday01)) ? -1 : 0));
      if(range == Range.Week){
        this.setState({ 
          todayBirthdays:items.filter(p => moment(p.Birthday01).format("DDMMMM") == moment().format("DDMMMM")),
          weekBirthdays:items,
          showSpinner:false});      
      }else{
        this.setState({ 
          monthBirthdays:items,
          showSpinnerModal:false
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
      isToday: false,
      birthdaysToShow:this.state.weekBirthdays
    })
  }
  private _changeToday =():void=>{

    this.setState({
      isToday: true,
      birthdaysToShow:this.state.todayBirthdays
    })
  }
  //let me change de modal's month
  private _changeMonth =(monthNumber:number):void=>{
    this.setState({
      month:monthNumber,
      monthBirthdays:Array<IUserServiceProps>(),
      showSpinnerModal:true,
    })
    this._loadUsers(Range.Month,monthNumber)
  }
  
  public render(): React.ReactElement<IBirthdaysProps> {
    //here define the current language ui for calendar
    let currentLocale = "en";
    if(this.props._pageContext.cultureInfo._currentUICultureName == "es-ES"){
        currentLocale = "es"
    }
    let spiner = this.state.showSpinner ? 
              <Spinner size={SpinnerSize.large} label={strings.loadingSpinner} ariaLive="assertive" /> 
    :<div></div>;

    // i validate the desicion for show in the main div
    let personsToRender = this.state.isToday? this.state.todayBirthdays: this.state.weekBirthdays;

    let sameDay =Array<Number>();
    let persons = personsToRender.map((item:IUserServiceProps,i:number)=>{
      let showBar = false;
      if(sameDay.filter(p => p == moment(item.Birthday01).date()).length === 0){
        sameDay.push(moment(item.Birthday01).date());
        showBar=true;
      }
      return  <div key={i}>
                {this.state.isToday || !showBar? "": <strong className={customStyles["tag-week"]}>{moment(item.Birthday01).locale(currentLocale).format("dddd DD")}</strong>}
                <UserProfileCard 
                Birthday01={item.Birthday01}
                PictureURL={item.PictureURL}
                WorkEmail={item.WorkEmail}
                WorkPhone={item.WorkPhone}
                Title={item.Title}
                Department={this.props.birthdayProps.showDepartament ? item.Department: ""}
                JobTitle={this.props.birthdayProps.showJobTitle? item.JobTitle: ""}
                ></UserProfileCard>
              </div>
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
            <div className="" style={{maxHeight:"600px", overflowY:"scroll"}}>
              {spiner}
              <br />
              {  this.state.showSpinner || persons.length > 0 ? 
                persons : 
                <div style={{textAlign:"center"}}>
                  <Icon style={{fontSize:"80px"}}  iconName="Balloons" className="ms-font-xxl" />
                  <p className="ms-font-xxl">{strings.EmptyBirthday}</p>
                </div>
              } 
            </div>
          </div>    
          <div className="ms-Grid-col ms-sm12">
            <div className={customStyles["bar-secondary"]}>
              <div className="ms-Grid">
                  <div className="ms-Grid-col ms-md8 ms-sm12">
                  <Button className={ this.state.isToday ? customStyles.dark : customStyles.light } style={{marginRight:"10px"}}  onClick={()=>{this._changeToday()}}  ><Icon iconName="GotoToday" /> {strings.ButtonToday} </Button>
                  <Button className={ this.state.isToday ? customStyles.light : customStyles.dark }  onClick={()=>{ this._changeToWeek()}}><Icon iconName="CalendarWeek" /> {strings.ButtonWeek}</Button>              
                  </div>
                  <div className="ms-Grid-col ms-md4 ms-hiddenSm">
                    { this.props.birthdayProps.enableButtonSeeMore 
                      ? <Button className={customStyles.light}  style={ {float:"right"}} onClick={()=>{ this._openModal() }} > <Icon iconName="GroupedList"></Icon> {strings.ButtonMore}</Button>
                      :""
                    }
                  </div>                
              </div>
            </div>  
          </div>  
        </div>
        <BirthdayModal locale={currentLocale} showSpinner={this.state.showSpinnerModal} _changeMonth={this._changeMonth} _month={this.state.month} _showModal={this.state.showModal} _openModal={this._openModal} _hideModal={this._hideModal}  _persons={this.state.monthBirthdays} ></BirthdayModal>
      </div>
    );
  }
}
