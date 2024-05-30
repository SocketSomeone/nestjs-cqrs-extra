import type { Type } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import type { BaseEvent } from '../helpers';

/**
 * Decorator that marks a class as a Nest event handler. An event handler
 * handles events executed by your application code.
 *
 * @param event one event *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#events
 */
export function EventHandler<T extends BaseEvent>(event: Type<T>): MethodDecorator {
	return EventPattern(event.name);
}
