<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
    A module for that provides additional features for the <a href="https://nestjs.com/" target="_blank">NestJS</a> CQRS module.
</p>

<p align="center">
    <a href='https://img.shields.io/npm/v/nestjs-cqrs-extra'><img src="https://img.shields.io/npm/v/nestjs-cqrs-extra" alt="NPM Version" /></a>
    <a href='https://img.shields.io/npm/l/nestjs-cqrs-extra'><img src="https://img.shields.io/npm/l/nestjs-cqrs-extra" alt="NPM License" /></a>
    <a href='https://img.shields.io/npm/dm/nestjs-cqrs-extra'><img src="https://img.shields.io/npm/dm/nestjs-cqrs-extra" alt="NPM Downloads" /></a>
    <a href='https://img.shields.io/github/last-commit/SocketSomeone/nestjs-cqrs-extra'><img src="https://img.shields.io/github/last-commit/SocketSomeone/nestjs-cqrs-extra" alt="Last commit" /></a>
</p>

## About

Nest CQRS Extra is a module that provides additional features for the [NestJS CQRS module](https://docs.nestjs.com/recipes/cqrs). It
provides a way to create a command bus and query bus that can be used to send commands and queries to the appropriate handlers. It also
provides a way to create a command and query handler that can be used to handle commands and queries.

**Features**
- **Typings** - Provides typings for commands, queries, and events. (Request & Response)
- **Message Broker** - Provides a way to send commands and queries to the appropriate handlers in microservices.
- **Saga** - Provides a way to create sagas that can be used to handle events.


## Installation

```bash
$ npm install nestjs-cqrs-extra @nestjs/microservices nats
```

## Usage

### Import the module

```typescript
import { Module } from '@nestjs/common';
import { CqrsModule } from 'nestjs-cqrs-extra';

@Module({
    imports: [
        CqrsModule.forRoot({
            options: { servers: ['nats://localhost:4222'] }
        })
    ]
})
export class AppModule {}
```

You can change adapter to `redis` or `mqtt` by changing the `adapter` option.

### Create a command

```typescript
import { BaseCommand } from 'nestjs-cqrs-extra';

export class CreateUserCommand extends BaseCommand<number> {
    constructor(public readonly name: string) {
        super();
    }
}
```

### Create a command handler

```typescript
import { CommandHandler } from 'nestjs-cqrs-extra';
import { CreateUserCommand } from './create-user.command';
import { Controller } from '@nestjs/common';

@Controller()
export class UserCommandsController {
	@CommandHandler(CreateUserCommand)
	public createUser(command: CreateUserCommand): string {
		return `User ${command.name} created`;
	}
}
```

### Send a command

```typescript
import { CommandBus } from 'nestjs-cqrs-extra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus) {}

    async createUser(name: string): Promise<number> {
        return this.commandBus.execute(new CreateUserCommand(name));
    }
}
```

## Stay in touch

* Author - [Alexey Filippov](https://t.me/socketsomeone)
* Twitter - [@SocketSomeone](https://twitter.com/SocketSomeone)

## License

[MIT](https://github.com/SocketSomeone/nestjs-cqrs-extra/blob/master/LICENSE) © [Alexey Filippov](https://github.com/SocketSomeone)
