import type { Observable } from 'rxjs';

import { Injectable } from '@nestjs/common';

import type { ExtractGenericTypeFromCommand } from './interfaces/index.js';
import type { BaseCommand } from './helpers/index.js';

import { CqrsAdapter } from './adapters/index.js';

@Injectable()
export class CommandBus {
	public constructor(private readonly adapter: CqrsAdapter) {}

	public execute<T extends BaseCommand, R = ExtractGenericTypeFromCommand<T>>(
		command: T
	): Observable<R> {
		return this.adapter.send<T, R>(command.constructor.name, command);
	}
}
