import type { Observable } from 'rxjs';

import { Injectable } from '@nestjs/common';

import type { ExtractGenericTypeFromQuery } from './interfaces';
import type { BaseQuery } from './helpers';

import { CqrsAdapter } from './adapters';

@Injectable()
export class QueryBus {
	public constructor(private readonly adapter: CqrsAdapter) {}

	public execute<T extends BaseQuery, R = ExtractGenericTypeFromQuery<T>>(
		query: T
	): Observable<R> {
		return this.adapter.send<T, R>(query.constructor.name, query);
	}
}
