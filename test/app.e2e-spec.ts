import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
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

  //? Health Check Test case
  it('/ (GET)', async () => {
    const healthCheckResponse = await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('OK!');

    expect(healthCheckResponse.headers['content-type']).toBe(
      'text/plain; charset=utf-8',
    );
  });
});
