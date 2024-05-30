import { applyDecorators, Type } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { BaseCommand } from '../helpers';
import type { ExtractGenericTypeFromCommand, TypedHandlerDecorator } from '../interfaces';

/**
 * Decorator that marks a class as a Nest command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * @param command command *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#commands
 */
export function CommandHandler<T extends BaseCommand = BaseCommand>(
	command: Type<T>
): TypedHandlerDecorator<ExtractGenericTypeFromCommand<T>> {
	return applyDecorators(MessagePattern(command.name));
}
