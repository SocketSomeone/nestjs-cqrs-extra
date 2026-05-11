import { Global, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './cqrs.module-definition';
import { EventPublisher } from './event-publisher';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { QueryBus } from './query-bus';

const PROVIDERS = [CommandBus, EventBus, EventPublisher, QueryBus];

@Global()
@Module({
	providers: PROVIDERS,
	exports: PROVIDERS
})
export class CqrsModule extends ConfigurableModuleClass {}
