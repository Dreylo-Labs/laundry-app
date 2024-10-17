import { Injectable } from '@nestjs/common';
import { IConfig } from '../../interfaces/config.interface';
import { APP_CONFIGURATION } from './configuration';
import * as Joi from 'joi'; 


const ConfigSchema = Joi.object<IConfig>({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DATABASE_URI: Joi.string().required(),
});


@Injectable()
export class ConfigService {
  private config: IConfig;

  constructor() {
    this.config = this.validate();
  }

  private validate() {
    const { error, value } = ConfigSchema.validate(APP_CONFIGURATION);

    const message = error && error.details.map((detail) => detail.message);

    if (message && message.length > 0) {
      throw new Error(`\n ${message.join('\n')}`);
    }

    return value;
  }

  get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.config[key];
  }
}
