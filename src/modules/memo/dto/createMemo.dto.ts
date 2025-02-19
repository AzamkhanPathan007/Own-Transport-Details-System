import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMemoDto {
  @IsOptional()
  @IsNumber()
  Memo_number: number = Math.floor(Math.random() * 10000);

  @IsOptional()
  @IsString()
  Truck_number: string = '';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime())
      ? new Date().toLocaleDateString('en-GB')
      : date.toLocaleDateString('en-GB');
  })
  Inserted_date: string;

  @IsOptional()
  @IsString()
  Pickup_location: string = '';

  @IsOptional()
  @IsString()
  Owner_address: string = '';

  @IsOptional()
  @IsString()
  Owner_name: string = '';

  @IsOptional()
  @IsNumber()
  Owner_number: number = 0;

  @IsOptional()
  @IsString()
  Driver_name: string = '';

  @IsOptional()
  @IsString()
  Drop_location: string = '';

  @IsOptional()
  @IsString()
  Consignor: string = '';

  @IsOptional()
  @IsString()
  Consignee: string = '';

  @IsString()
  @IsOptional()
  Particulars: string = '';

  @IsOptional()
  @IsString()
  Weight: string = '';

  @IsOptional()
  @IsNumber()
  Total_collection: number = 0;

  @IsOptional()
  @IsNumber()
  Height_freight: number = 0;

  @IsOptional()
  @IsNumber()
  Height_charge: number = 0;

  @IsOptional()
  @IsNumber()
  Workout: number = 0;

  @IsOptional()
  @IsNumber()
  Advance: number = 0;

  @IsOptional()
  @IsString()
  Payment_location: string = '';

  @IsOptional()
  @IsString()
  Remarks: string = '';

  @IsOptional()
  @IsNumber()
  Commission: number = 0;

  @IsOptional()
  @IsNumber()
  Tapal: number = 0;

  @IsOptional()
  @IsNumber()
  Weight_wage: number = 0;

  @IsOptional()
  @IsNumber()
  Guide_rupees: number = 0;

  @IsOptional()
  @IsNumber()
  Other_expenses: number = 0;
}
