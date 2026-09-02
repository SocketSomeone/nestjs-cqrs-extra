import { Global, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './cqrs.module-definition.js';
import { EventPublisher } from './event-publisher.js';
import { CommandBus } from './command-bus.js';
import { EventBus } from './event-bus.js';
import { QueryBus } from './query-bus.js';

const PROVIDERS = [CommandBus, EventBus, EventPublisher, QueryBus];

@Global()
@Module({
	providers: PROVIDERS,
	exports: PROVIDERS
})
export class CqrsModule extends ConfigurableModuleClass {}
