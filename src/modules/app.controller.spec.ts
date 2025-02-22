import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('AppController', () => {
    it('should return "OK!"', () => {
      const spy = jest.spyOn(appService, 'checkHealth');
      expect(appController.healthCheck()).toBe('OK!');
      expect(spy).toHaveBeenCalled();
    });

    it('should return undefined', () => {
      expect(appController.handleRoot()).toBeUndefined();
    });
  });
});
