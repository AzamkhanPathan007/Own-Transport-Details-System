import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSlipDto {
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime())
      ? new Date().toLocaleDateString('en-GB')
      : date.toLocaleDateString('en-GB');
  })
  Date: string;

  @IsOptional()
  @IsString()
  Sir_name: string = '';

  @IsOptional()
  @IsString()
  Party_name: string = '';

  @IsOptional()
  @IsString()
  Truck_number: string = '';

  @IsOptional()
  @IsString()
  Drop_location: string = '';

  @IsOptional()
  @IsString()
  Pickup_location: string = '';

  @IsOptional()
  @IsString()
  Fixed_rate: string = '';

  @IsOptional()
  @IsNumber()
  Advance_wage: number = 0;

  @IsOptional()
  @IsString()
  Load: string = '';

  @IsOptional()
  @IsString()
  Payment_location: string = '';

  @IsOptional()
  @IsString()
  Remarks: string = '';

  @IsOptional()
  @IsString()
  Unloading_point: string = '';
}
