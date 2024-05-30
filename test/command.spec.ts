import { BaseCommand, CommandBus, CommandHandler } from '../src';
import { createApplication } from './utils.spec';
import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { delay, of } from 'rxjs';

export class TestCommand extends BaseCommand<string> {
	public constructor(public readonly payload?: string) {
		super();
	}
}

@Controller()
export class CommandSpec implements OnApplicationBootstrap {
	public constructor(private readonly commandBus: CommandBus) {}

	@CommandHandler(TestCommand)
	public testCommand(command: TestCommand): string {
		return `Hello from command: ${command.payload}!`;
	}

	public onApplicationBootstrap() {
		of(1)
			.pipe(delay(1000))
			.subscribe(() => {
				this.commandBus.execute(new TestCommand('NATS adapter')).subscribe(console.log);
			});
	}
}

createApplication(CommandSpec);
