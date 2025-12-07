import { Test, TestingModule } from '@nestjs/testing';
import { healthCheckStub } from '../../test/__stubs__/healthCheck.stub';
import { AppController } from './app.controller';

describe('AppController', () => {
	let appController: AppController;

	beforeAll(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('AppController', () => {
		it('should return ok status', () => {
			expect(appController.healthCheck()).toMatchObject(healthCheckStub);
		});

		it('should return undefined', () => {
			expect(appController.handleRoot()).toBeUndefined();
		});
	});
});
