import * as React from 'react';
import { Persona } from 'office-ui-fabric-react/lib/Persona'
import { IPersonaProps } from './IBirthdaysProps'
const PersonaItem:(props:IPersonaProps) => JSX.Element = (props:IPersonaProps)=>{
    return(<Persona
        key={props.email}
        imageUrl={"/_layouts/userphoto.aspx?size=L&accountname="+props.email }
        text={props.title}
        secondaryText={props.jobTitle ? props.jobTitle: ""}
        hidePersonaDetails={false}
        tertiaryText={props.departament ? props.departament:"" }
        //showSecondaryText={true}
        size={props.size}>
    ></Persona>)
}