import { Module, DynamicModule } from '@nestjs/common';
import { AntiCaptchaService } from './anticaptcha.service';
import { AntiCaptchaOptions } from './anticaptcha.interfaces';

@Module({
  providers: [AntiCaptchaService],
  exports: [AntiCaptchaService],
})
export class AntiCaptchaModule {
  static register(options: AntiCaptchaOptions): DynamicModule {
    return {
      module: AntiCaptchaModule,
      providers: [
        {
          provide: 'ANTICAPTCHA_OPTIONS',
          useValue: options,
        },
        AntiCaptchaService,
      ],
      exports: [AntiCaptchaService],
    };
  }
}