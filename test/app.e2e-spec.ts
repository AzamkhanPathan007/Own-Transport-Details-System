import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { healthCheckStub } from './__stubs__/healthCheck.stub';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: join('.env.test'),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  //? Health Check Test case
  it('/health (GET)', async () => {
    const healthCheckResponse = await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect(healthCheckStub);

    expect(healthCheckResponse.headers['content-type']).toBe(
      'application/json; charset=utf-8',
    );
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(302);

    expect(response.headers.location).toBe('/memo/ots');
  });
});
