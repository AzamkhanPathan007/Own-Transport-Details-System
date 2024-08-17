import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSlipDto {
  constructor() {
    this.Sir_name = '';
    this.Party_name = '';
    this.Truck_number = '';
    this.Drop_location = '';
    this.Pickup_location = '';
    this.Fixed_rate = '';
    this.Advance_wage = 0;
    this.Load = '';
    this.Payment_location = '';
    this.Remarks = '';
    this.Unloading_point = '';
  }

  @IsOptional()
  @Transform(({ value }) =>
    value
      ? new Date(value).toLocaleDateString('en-GB')
      : new Date().toLocaleDateString('en-GB'),
  )
  Date: string;

  @IsOptional()
  @IsString()
  Sir_name: string;

  @IsOptional()
  @IsString()
  Party_name: string;

  @IsOptional()
  @IsString()
  Truck_number: string;

  @IsOptional()
  @IsString()
  Drop_location: string;

  @IsOptional()
  @IsString()
  Pickup_location: string;

  @IsOptional()
  @IsString()
  Fixed_rate: string;

  @IsOptional()
  @IsNumber()
  Advance_wage: number;

  @IsOptional()
  @IsString()
  Load: string;

  @IsOptional()
  @IsString()
  Payment_location: string;

  @IsOptional()
  @IsString()
  Remarks: string;

  @IsOptional()
  @IsString()
  Unloading_point: string;
}
