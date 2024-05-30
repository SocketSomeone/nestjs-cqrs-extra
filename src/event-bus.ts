import { Injectable } from '@nestjs/common';
import { CqrsAdapter } from './adapters';
import type { BaseEvent } from './helpers';

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
