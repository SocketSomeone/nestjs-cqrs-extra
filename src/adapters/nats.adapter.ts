import type { Observable } from 'rxjs';

import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import type { CqrsOptions } from '../interfaces/cqrs-options.interface.js';
import type { CommandOrQuery } from './cqrs.adapter.js';
import type { BaseEvent } from '../helpers/index.js';

import { CQRS_MODULE_OPTIONS } from '../cqrs.module-definition.js';
import { CqrsAdapter } from './cqrs.adapter.js';

@Injectable()
export class NatsAdapter extends CqrsAdapter implements OnApplicationBootstrap {
	@Inject(CQRS_MODULE_OPTIONS)
	private readonly moduleOptions: CqrsOptions;

	private client: ClientProxy;

	public onApplicationBootstrap() {
		this.client = ClientProxyFactory.create({
			transport: Transport.NATS,
			options: this.moduleOptions.options
		});

		return this.client.connect();
	}

	public send<T extends CommandOrQuery, R>(name: string, commandOrQuery: T): Observable<R> {
		return this.client.send(name, commandOrQuery);
	}

	public publish(name: string, event: BaseEvent): void {
		this.client.emit(name, event);
	}
}
