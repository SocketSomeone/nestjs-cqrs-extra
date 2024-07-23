const RETURN_TYPE = Symbol('return');

export abstract class BaseQuery<R = any> {
	protected readonly [RETURN_TYPE]: R;
}
