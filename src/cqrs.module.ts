import { Global, Module } from '@nestjs/common';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ConfigurableModuleClass } from './cqrs.module-definition';

const PROVIDERS = [CommandBus, EventBus, EventPublisher, QueryBus];

@Global()
@Module({
	providers: PROVIDERS,
	exports: PROVIDERS
})
export class CqrsModule extends ConfigurableModuleClass {}
