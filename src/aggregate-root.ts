import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import type { BaseEvent } from './helpers';

const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();

export abstract class AggregateRoot<EventBase extends BaseEvent = BaseEvent> {
	public [IS_AUTO_COMMIT_ENABLED] = false;
	private [INTERNAL_EVENTS]: EventBase[] = [];

	public set autoCommit(value: boolean) {
		this[IS_AUTO_COMMIT_ENABLED] = value;
	}

	public get autoCommit(): boolean {
		return this[IS_AUTO_COMMIT_ENABLED];
	}

	public publish<T extends EventBase = EventBase>(event: T): void {
		throw new RuntimeException(
			"Don't forget to call `mergeObjectContext()` or `mergeClassContext()`?"
		);
	}

	public publishAll<T extends EventBase = EventBase>(events: T[]): void {
		throw new RuntimeException(
			"Don't forget to call `mergeObjectContext()` or `mergeClassContext()`?"
		);
	}

	public commit(): void {
		this.publishAll(this[INTERNAL_EVENTS]);
		this[INTERNAL_EVENTS].length = 0;
	}

	public uncommit(): void {
		this[INTERNAL_EVENTS].length = 0;
	}

	public getUncommittedEvents(): EventBase[] {
		return this[INTERNAL_EVENTS];
	}

	public loadFromHistory<T extends EventBase = EventBase>(events: T[]): void {
		events.forEach(event => this.apply(event));
	}

	protected apply<T extends EventBase = EventBase>(event: T, isFromHistory = false): void {
		if (!isFromHistory && !this.autoCommit) {
			this[INTERNAL_EVENTS].push(event);
		}

		this.autoCommit && this.publish(event);
	}
}
