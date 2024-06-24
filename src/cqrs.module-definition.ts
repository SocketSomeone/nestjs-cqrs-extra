import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CqrsOptions } from './interfaces/cqrs-options.interface';
import { CqrsAdapter, NatsAdapter } from './adapters';

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
			adapter: NatsAdapter
		},
		(options, extras) => {
			return {
				global: true,
				module: options.module,
				imports: options.imports,
				controllers: options.controllers,
				providers: [
					...options.providers,
					{ provide: CqrsAdapter, useClass: extras.adapter ?? NatsAdapter }
				],
				exports: options.exports
			};
		}
	)
	.build();
