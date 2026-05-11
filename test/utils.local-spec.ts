import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Module, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CqrsAdapter, CqrsModule, NatsAdapter } from '../src';

export const createApplication = async (command: Type<any>) => {
	@Module({
		imports: [
			CqrsModule.forRoot({
				adapter: NatsAdapter,
				options: {
					options: {
						url: 'nats://localhost:4222'
					}
				}
			})
		],
		controllers: [command]
	})
	class AppModule {}

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		options: {
			url: 'nats://localhost:4222'
		},
		transport: Transport.NATS
	});

	return app.listen();
};
