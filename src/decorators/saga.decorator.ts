import type { Type } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import type { BaseEvent } from '../helpers';

/**
 * Decorator that marks a class as a Nest saga. Sagas may listen and react to 1..N events.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#sagas
 */
export function Saga<T extends BaseEvent>(...events: Type<BaseEvent>[]): MethodDecorator {
	return EventPattern(events.map(event => event.name));
}
