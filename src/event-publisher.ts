import type { Type } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { AggregateRoot } from './aggregate-root';
import { EventBus } from './event-bus';
import type { BaseEvent } from './helpers';

@Injectable()
export class EventPublisher {
	public constructor(private readonly eventBus: EventBus) {}

	public mergeClassContext<T extends Type<AggregateRoot>>(metatype: T): T {
		const eventBus = this.eventBus;
		return class extends metatype {
			public publish<T extends BaseEvent = BaseEvent>(event: T): void {
				eventBus.publish(event);
			}

			public publishAll<T extends BaseEvent = BaseEvent>(events: T[]): void {
				eventBus.publishAll(events);
			}
		};
	}

	public mergeObjectContext<T extends AggregateRoot>(object: T): T {
		const eventBus = this.eventBus;

		Object.defineProperties(object, {
			publish: {
				value: function <T extends BaseEvent = BaseEvent>(event: T): void {
					eventBus.publish(event);
				}
			},
			publishAll: {
				value: function <T extends BaseEvent = BaseEvent>(events: T[]): void {
					eventBus.publishAll(events);
				}
			}
		});

		return object;
	}
}
