import type { Type } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

import type { ExtractGenericTypeFromQuery, TypedHandlerDecorator } from '../interfaces';
import type { BaseQuery } from '../helpers';

/**
 * Decorator that marks a class as a Nest query handler. A query handler
 * handles queries executed by your application code.
 *
 * @param query query *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#queries
 */
export function QueryHandler<T extends BaseQuery = BaseQuery>(
	query: Type<T>
): TypedHandlerDecorator<ExtractGenericTypeFromQuery<T>> {
	return MessagePattern(query.name);
}
