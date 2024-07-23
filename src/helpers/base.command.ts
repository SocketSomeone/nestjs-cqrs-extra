const RETURN_TYPE = Symbol('return');

export abstract class BaseCommand<R = any> {
	protected readonly [RETURN_TYPE]: R;
}
