import type { BaseCommand, BaseQuery, BaseEvent } from '../helpers';
import type { Observable } from 'rxjs';

export type CommandOrQuery = BaseCommand | BaseQuery;

export abstract class CqrsAdapter {
	public abstract send<T extends CommandOrQuery, R>(name: string, cmdOrQuery: T): Observable<R>;

	public abstract publish(name: string, event: BaseEvent): void;
}
