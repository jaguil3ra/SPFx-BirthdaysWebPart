declare interface IBirthdaysWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionPropertyTitle: string;
  DescriptionPropertyShowPhone:string;
  DescriptionPropertyShowDepartament:string;
  DescriptionPropertyShowJobTitle:string;
  DescriptionPropertyPersonaSize:string;
  OptionSizeShort:string,
  OptionSizeMedium:string,
  OptionSizeLarge:string,
  Title:string,
  CreditDescription:string,
  ButtonToday:string,
  ButtonWeek:string,
  ButtonMore:string
}

declare module 'BirthdaysWebPartStrings' {
  const strings: IBirthdaysWebPartStrings;
  export = strings;
}
