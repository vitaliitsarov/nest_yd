// anticaptcha.interfaces.ts
export interface AntiCaptchaOptions {
    clientKey: string;
}
  
export interface AntiCaptchaResponse {
    solution: {
        gRecaptchaResponse: string;
        // Include other fields as needed
    };
}