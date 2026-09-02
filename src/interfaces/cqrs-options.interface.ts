import type { NatsOptions } from '@nestjs/microservices';
import type { Type } from '@nestjs/common';

import type { CqrsAdapter, NatsAdapter } from '../adapters/index.js';

interface CustomCqrsOptions<T extends CqrsAdapter = CqrsAdapter> {
	adapter?: Type<T>;
	options?: any;
}

interface NatsCqrsOptions extends CustomCqrsOptions<NatsAdapter> {
	adapter?: Type<NatsAdapter>;
	options?: NatsOptions['options'];
}

export type CqrsOptions = CustomCqrsOptions | NatsCqrsOptions;
