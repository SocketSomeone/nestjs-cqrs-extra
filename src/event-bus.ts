import { Injectable } from '@nestjs/common';

import type { BaseEvent } from './helpers/index.js';

import { CqrsAdapter } from './adapters/index.js';

@Injectable()
export class EventBus {
	public constructor(private readonly adapter: CqrsAdapter) {}

	public publish<T extends BaseEvent>(event: T): void {
		this.adapter.publish(event.constructor.name, event);
	}

	public publishAll<T extends BaseEvent>(events: T[]): void {
		events.forEach(event => this.publish(event));
	}
}
