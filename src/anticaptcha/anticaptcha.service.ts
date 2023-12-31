// anticaptcha.service.ts
import { Injectable, Inject } from '@nestjs/common';
import {
  AntiCaptcha,
  AntiCaptchaError,
  INoCaptchaTaskProxyless,
  INoCaptchaTaskProxylessResult,
  QueueTypes,
  TaskTypes,
  ErrorCodes
} from 'anticaptcha';
import { AntiCaptchaOptions, AntiCaptchaResponse } from './anticaptcha.interfaces';

@Injectable()
export class AntiCaptchaService {
  private antiCaptchaAPI: AntiCaptcha;

  constructor(@Inject('ANTICAPTCHA_OPTIONS') private readonly options: AntiCaptchaOptions) {
    this.antiCaptchaAPI = new AntiCaptcha(options.clientKey);
  }

  async solveCaptcha(websiteKey: string, websiteURL: string): Promise<string> {
    try {
      if (!(await this.antiCaptchaAPI.isBalanceGreaterThan(10))) {
        console.warn("Take care, you're running low on money !");
      }

      const taskId = await this.antiCaptchaAPI.createTask<INoCaptchaTaskProxyless>({
        type: TaskTypes.NOCAPTCHA_PROXYLESS,
        websiteKey,
        websiteURL,
      });

      const response = await this.antiCaptchaAPI.getTaskResult<AntiCaptchaResponse>(taskId);

      return response.solution.gRecaptchaResponse;
    } catch (e) {
      if (e instanceof AntiCaptchaError && e.code === ErrorCodes.ERROR_IP_BLOCKED) {
        // Handle IP blocked error
        console.error('AntiCaptcha Error: IP Blocked');
        throw e;
      }

      // Handle other AntiCaptcha errors
      console.error('AntiCaptcha Error:', e.message);
      throw e;
    }
  }
}
