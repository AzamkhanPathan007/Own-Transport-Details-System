import { CreateSlipDto } from '../../src/modules/slip/dto/createSlip.dto';

export const slipStub: CreateSlipDto = {
	Drop_location: 'test city',
	Payment_location: 'test location',
	Pickup_location: 'test pickup',
	Remarks: 'my test remarks',
	Truck_number: 'KA_TESTE_3434',
	Advance_wage: 5428,
	Fixed_rate: '5 Ton',
	Party_name: 'test party',
	Sir_name: 'test sir',
	Unloading_point: 'test point',
	Load: 'Steel',
	Date: new Date().toLocaleDateString('en-GB'),
};
