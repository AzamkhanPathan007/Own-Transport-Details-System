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

  //? Memo API Test cases
  it('/ots/memo (GET)', async () => {
    const otsMemoEjs = await renderFile(
      TEMPLATE_FILE_PATHS.OTS_MEMO,
      renderServiceStub,
    );

    return request(app.getHttpServer())
      .get('/memo/ots')
      .expect(200)
      .expect(otsMemoEjs);
  });

  it('/ots/memo (POST)', async () => {
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
  });

  it('/ots/slip (POST)', async () => {
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
