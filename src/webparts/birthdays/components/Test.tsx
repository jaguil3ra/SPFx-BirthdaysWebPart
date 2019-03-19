import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';


const examplePersona: IPersonaSharedProps = {
  imageUrl: "",
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaBasicExample extends React.Component<
  {},
  {
    renderPersonaDetails?: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderPersonaDetails: true
    };
  }

  public render(): JSX.Element {
    const { renderPersonaDetails } = this.state;

    return (
      <div>
        <div>
          <Checkbox label="Include persona details" checked={renderPersonaDetails} onChange={this._onChange} />
        </div>

        <Label >Size 10 Persona, with no presence</Label>
        <Persona  size={PersonaSize.size10} hidePersonaDetails={!renderPersonaDetails} />
        <Label >Size 10 Persona, with presence</Label>
        <Persona
          
          size={PersonaSize.size10}
          presence={PersonaPresence.offline}
          hidePersonaDetails={!renderPersonaDetails}
        />
        <Label >Size 24 Persona</Label>
        <Persona
          
          size={PersonaSize.size24}
          presence={PersonaPresence.online}
          hidePersonaDetails={!renderPersonaDetails}
        />
        <Label >Size 28 Persona</Label>
        <Persona
          
          size={PersonaSize.size28}
          presence={PersonaPresence.online}
          hidePersonaDetails={!renderPersonaDetails}
        />
        <Label >Size 32 Persona</Label>
        <Persona
          
          size={PersonaSize.size32}
          presence={PersonaPresence.online}
          hidePersonaDetails={!renderPersonaDetails}
        />

        <Label >Size 40 Persona</Label>
        <Persona  size={PersonaSize.size40} presence={PersonaPresence.away} hidePersonaDetails={!renderPersonaDetails} />
        <Label >Size 48 Persona (default) </Label>
        <Persona  hidePersonaDetails={!renderPersonaDetails} presence={PersonaPresence.busy} />

        <Label >Size 72 Persona</Label>
        <Persona  size={PersonaSize.size72} presence={PersonaPresence.dnd} hidePersonaDetails={!renderPersonaDetails} />
        <Label >Size 100 Persona</Label>
        <Persona
          
          size={PersonaSize.size100}
          presence={PersonaPresence.blocked}
          hidePersonaDetails={!renderPersonaDetails}
        />
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined): void => {
    this.setState({ renderPersonaDetails: checked });
  };
}