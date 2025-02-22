import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { healthCheckStub } from '../../test/__stubs__/healthCheck.stub';

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
