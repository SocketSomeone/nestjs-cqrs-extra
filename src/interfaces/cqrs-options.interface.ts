import { CqrsAdapter, NatsAdapter } from '../adapters';
import { NatsOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { Type } from '@nestjs/common';

interface CustomCqrsOptions<T extends CqrsAdapter = CqrsAdapter> {
	adapter?: Type<T>;
	options?: any;
}

interface NatsCqrsOptions extends CustomCqrsOptions<NatsAdapter> {
	adapter?: Type<NatsAdapter>;
	options?: NatsOptions['options'];
}

export type CqrsOptions = CustomCqrsOptions | NatsCqrsOptions;
