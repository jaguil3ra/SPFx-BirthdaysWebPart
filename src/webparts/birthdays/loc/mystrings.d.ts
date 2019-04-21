declare interface IBirthdaysWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionPropertyTitle: string;
  DescriptionPropertyShowPhone:string;
  DescriptionPropertyShowDepartament:string;
  DescriptionPropertyShowJobTitle:string;
  DescriptionPropertyPersonaSize:string;
  DescriptionPropertyEnableSeeMore:string;
  OptionSizeShort:string,
  OptionSizeMedium:string,
  OptionSizeLarge:string,
  Title:string,
  CreditDescription:string,
  ButtonToday:string,
  ButtonWeek:string,
  ButtonMore:string,
  DescriptionModal:string,
  EmptyBirthday:string,
  loadingSpinner:string
}

declare module 'BirthdaysWebPartStrings' {
  const strings: IBirthdaysWebPartStrings;
  export = strings;
}
