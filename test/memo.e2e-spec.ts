import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TestingModule, Test } from '@nestjs/testing';
import { join } from 'node:path';
import { AppModule } from '../src/modules/app.module';
import { CacheLogoService } from '../src/providers/cacheLogo.service';
import { renderFile } from 'ejs';
import request from 'supertest';
import { TEMPLATE_FILE_PATHS } from '../src/constants/common.constants';
import { memoStub } from './__stubs__/memo.stub';
import { renderServiceStub } from './__stubs__/renderService.stub';

describe('MemoModule (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: join('.env.test'),
        }),
      ],
      providers: [
        CacheLogoService,
        {
          provide: APP_PIPE,
          useFactory: () =>
            new ValidationPipe({
              transform: true,
              whitelist: true,
              forbidNonWhitelisted: true,
              transformOptions: {
                enableImplicitConversion: true,
              },
            }),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    app.useStaticAssets(join('public'));

    app.setBaseViewsDir(join('views'));

    app.setViewEngine('ejs');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  //? Memo API Test cases
  it('/memo/ots (GET)', async () => {
    const otsMemoEjs = await renderFile(
      TEMPLATE_FILE_PATHS.OTS_MEMO,
      renderServiceStub,
    );

    const memoResponse = await request(app.getHttpServer())
      .get('/memo/ots')
      .expect(200)
      .expect(otsMemoEjs);

    expect(memoResponse.headers['content-type']).toBe(
      'text/html; charset=utf-8',
    );
  });

  it('/memo/vijay (GET)', async () => {
    const vijayMemoEjs = await renderFile(
      TEMPLATE_FILE_PATHS.VIJAY_MEMO,
      renderServiceStub,
    );

    const memoResponse = await request(app.getHttpServer())
      .get('/memo/vijay')
      .expect(200)
      .expect(vijayMemoEjs);

    expect(memoResponse.headers['content-type']).toBe(
      'text/html; charset=utf-8',
    );
  });

  it('/memo/ots (POST)', async () => {
    const otsMemoResponse = await request(app.getHttpServer())
      .post('/memo/ots')
      .send(memoStub)
      .expect(201);

    expect(otsMemoResponse.headers['content-type']).toBe('application/pdf');
    expect(otsMemoResponse.headers['content-disposition']).toContain(
      `attachment; filename=${memoStub.Truck_number}.pdf`,
    );

    const receivedBuffer = otsMemoResponse.body as Buffer;
    expect(receivedBuffer.length).toBeGreaterThan(0);
  }, 10000);

  it('/memo/vijay (POST)', async () => {
    const vijayMemoResponse = await request(app.getHttpServer())
      .post('/memo/vijay')
      .send(memoStub)
      .expect(201);

    expect(vijayMemoResponse.headers['content-type']).toBe('application/pdf');
    expect(vijayMemoResponse.headers['content-disposition']).toContain(
      `attachment; filename=${memoStub.Truck_number}.pdf`,
    );

    const receivedBuffer = vijayMemoResponse.body as Buffer;
    expect(receivedBuffer.length).toBeGreaterThan(0);
  }, 10000);
});
