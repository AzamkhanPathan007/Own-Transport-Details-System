import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from '../../src/modules/memo/dto/createMemo.dto';

@Injectable()
export class HelperMethodService {
	calculateFields(body: CreateMemoDto) {
		const Calculated_collection =
			body.Height_charge + body.Height_freight + body.Total_collection;

		const Balance = Calculated_collection - body.Advance;

		const Grand_total =
			body.Commission +
			body.Tapal +
			body.Weight_wage +
			body.Guide_rupees +
			body.Other_expenses;

		return { Calculated_collection, Balance, Grand_total };
	}
}
