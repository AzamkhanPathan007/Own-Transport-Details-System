import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TestingModule, Test } from '@nestjs/testing';
import { renderFile } from 'ejs';
import request from 'supertest';
import { join } from 'path';
import { TEMPLATE_FILE_PATHS } from '../src/constants/common.constants';
import { AppModule } from '../src/modules/app.module';
import { CacheLogoService } from '../src/providers/cacheLogo.service';
import { memoStub } from './__stubs__/memo.stub';
import { renderServiceStub } from './__stubs__/renderService.stub';
import { slipStub } from './__stubs__/slip.stub';

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
  it('/vijay/memo (GET)', async () => {
    const vijayMemoEjs = await renderFile(
      TEMPLATE_FILE_PATHS.VIJAY_MEMO,
      renderServiceStub,
    );

    return request(app.getHttpServer())
      .get('/memo/vijay')
      .expect(200)
      .expect(vijayMemoEjs);
  });

  it('/vijay/memo (POST)', async () => {
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
  });

  it('/vijay/slip (POST)', async () => {
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
});
