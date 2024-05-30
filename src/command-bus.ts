import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { CqrsAdapter } from './adapters';
import type { BaseCommand } from './helpers';
import type { ExtractGenericTypeFromCommand } from './interfaces';

@Injectable()
export class CommandBus {
	public constructor(private readonly adapter: CqrsAdapter) {}

	public execute<T extends BaseCommand, R = ExtractGenericTypeFromCommand<T>>(
		command: T
	): Observable<R> {
		return this.adapter.send<T, R>(command.constructor.name, command);
	}
}
