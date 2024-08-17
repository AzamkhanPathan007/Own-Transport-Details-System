import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMemoDto {
  constructor() {
    this.Memo_number = Math.ceil(Math.random());
    this.Truck_number = '';
    this.Pickup_location = '';
    this.Owner_address = '';
    this.Owner_name = '';
    this.Owner_number = 0;
    this.Driver_name = '';
    this.Drop_location = '';
    this.Consignor = '';
    this.Consignee = '';
    this.Particulars = '';
    this.Weight = '';
    this.Total_collection = 0;
    this.Height_freight = 0;
    this.Height_charge = 0;
    this.Workout = 0;
    this.Advance = 0;
    this.Payment_location = '';
    this.Remarks = '';
    this.Commission = 0;
    this.Tapal = 0;
    this.Weight_wage = 0;
    this.Guide_rupees = 0;
    this.Other_expenses = 0;
    // this.Calculated_collection = 0;
    // this.Balance = 0;
    // this.Grand_total = 0;
  }

  @IsOptional()
  @IsNumber()
  Memo_number: number;

  @IsOptional()
  @IsString()
  Truck_number: string;

  @IsOptional()
  @Transform(({ value }) =>
    value
      ? new Date(value).toLocaleDateString('en-GB')
      : new Date().toLocaleDateString('en-GB'),
  )
  Inserted_date: string;

  @IsOptional()
  @IsString()
  Pickup_location: string;

  @IsOptional()
  @IsString()
  Owner_address: string;

  @IsOptional()
  @IsString()
  Owner_name: string;

  @IsOptional()
  @IsNumber()
  Owner_number: number;

  @IsOptional()
  @IsString()
  Driver_name: string;

  @IsOptional()
  @IsString()
  Drop_location: string;

  @IsOptional()
  @IsString()
  Consignor: string;

  @IsOptional()
  @IsString()
  Consignee: string;

  @IsString()
  @IsOptional()
  Particulars: string;

  @IsOptional()
  @IsString()
  Weight: string;

  @IsOptional()
  @IsNumber()
  Total_collection: number;

  @IsOptional()
  @IsNumber()
  Height_freight: number;

  @IsOptional()
  @IsNumber()
  Height_charge: number;

  @IsOptional()
  @IsNumber()
  Workout: number;

  @IsOptional()
  @IsNumber()
  Advance: number;

  @IsOptional()
  @IsString()
  Payment_location: string;

  @IsOptional()
  @IsString()
  Remarks: string;

  @IsOptional()
  @IsNumber()
  Commission: number;

  @IsOptional()
  @IsNumber()
  Tapal: number;

  @IsOptional()
  @IsNumber()
  Weight_wage: number;

  @IsOptional()
  @IsNumber()
  Guide_rupees: number;

  @IsOptional()
  @IsNumber()
  Other_expenses: number;

  //!these 3 fields are calculated and are not taken as input

  get Calculated_collection(): number {
    return this.Height_charge + this.Height_freight + this.Total_collection;
  }

  get Balance(): number {
    return this.Calculated_collection - this.Advance;
  }

  get Grand_total(): number {
    return (
      this.Commission +
      this.Tapal +
      this.Weight_wage +
      this.Guide_rupees +
      this.Other_expenses
    );
  }
}
