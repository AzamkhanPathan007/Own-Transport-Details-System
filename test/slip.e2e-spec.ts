import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TestingModule, Test } from '@nestjs/testing';
import request from 'supertest';
import { join } from 'path';
import { AppModule } from '../src/modules/app.module';
import { CacheLogoService } from '../src/providers/cacheLogo.service';
import { memoStub } from './__stubs__/memo.stub';
import { slipStub } from './__stubs__/slip.stub';
import { renderFile } from 'ejs';
import { TEMPLATE_FILE_PATHS } from '../src/constants/common.constants';
import { renderServiceStub } from './__stubs__/renderService.stub';

describe('MemoModule (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
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

  //? Slip API Test cases
  it('/slip/ots (GET)', async () => {
    const slipMemoEjs = await renderFile(
      TEMPLATE_FILE_PATHS.OTS_SLIP,
      renderServiceStub,
    );

    const memoResponse = await request(app.getHttpServer())
      .get('/slip/ots')
      .expect(200)
      .expect(slipMemoEjs);

    expect(memoResponse.headers['content-type']).toBe(
      'text/html; charset=utf-8',
    );
  });

  it('/slip/vijay (GET)', async () => {
    const vijaySlipEjs = await renderFile(
      TEMPLATE_FILE_PATHS.VIJAY_SLIP,
      renderServiceStub,
    );

    const memoResponse = await request(app.getHttpServer())
      .get('/slip/vijay')
      .expect(200)
      .expect(vijaySlipEjs);

    expect(memoResponse.headers['content-type']).toBe(
      'text/html; charset=utf-8',
    );
  });

  it('/slip/ots (POST)', async () => {
    const otsSlipResponse = await request(app.getHttpServer())
      .post('/slip/ots')
      .send(slipStub)
      .expect(201);

    expect(otsSlipResponse.headers['content-type']).toBe('application/pdf');
    expect(otsSlipResponse.headers['content-disposition']).toContain(
      `attachment; filename=${memoStub.Truck_number}.pdf`,
    );

    const receivedBuffer = otsSlipResponse.body as Buffer;
    expect(receivedBuffer.length).toBeGreaterThan(0);
  });

  it('/slip/vijay (POST)', async () => {
    const vijaySlipResponse = await request(app.getHttpServer())
      .post('/slip/vijay')
      .send(slipStub)
      .expect(201);

    expect(vijaySlipResponse.headers['content-type']).toBe('application/pdf');
    expect(vijaySlipResponse.headers['content-disposition']).toContain(
      `attachment; filename=${memoStub.Truck_number}.pdf`,
    );

    const receivedBuffer = vijaySlipResponse.body as Buffer;
    expect(receivedBuffer.length).toBeGreaterThan(0);
  });
});
