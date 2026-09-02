import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { CqrsOptions } from './interfaces/cqrs-options.interface.js';

import { CqrsAdapter, NatsAdapter } from './adapters/index.js';

export const {
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN: CQRS_MODULE_OPTIONS,
	OPTIONS_TYPE,
	ASYNC_OPTIONS_TYPE
} = new ConfigurableModuleBuilder<CqrsOptions>()
	.setClassMethodName('forRoot')
	.setFactoryMethodName('createCqrsOptions')
	.setExtras<CqrsOptions>(
		{
			adapter: undefined
		},
		(options, extras) => {
			return {
				global: true,
				module: options.module,
				imports: options.imports,
				controllers: options.controllers,
				providers: [
					...(options.providers ?? []),
					{ provide: CqrsAdapter, useClass: extras.adapter ?? NatsAdapter }
				],
				exports: options.exports
			};
		}
	)
	.build();
