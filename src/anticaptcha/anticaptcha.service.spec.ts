import { Test, TestingModule } from '@nestjs/testing';
import { AnticaptchaService } from './anticaptcha.service';

describe('AnticaptchaService', () => {
  let service: AnticaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnticaptchaService],
    }).compile();

    service = module.get<AnticaptchaService>(AnticaptchaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
