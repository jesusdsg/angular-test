export class StateModel {
  name!: string;
  value!: number;
  population!: number;
}

export class AmountModel {
  name!: string;
  value!: number;
}

export class DateModel {
  date!: string;
}

export class ReportModel {
  date!: string | Date;
  result!: {
    highest: {};
    lowest: {};
  };
}
