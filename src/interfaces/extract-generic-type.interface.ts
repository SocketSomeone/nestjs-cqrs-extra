import type { BaseCommand, BaseQuery } from '../helpers/index.js';

export type ExtractGenericTypeFromCommand<T extends BaseCommand> =
	T extends BaseCommand<infer U> ? U : any;

export type ExtractGenericTypeFromQuery<T extends BaseQuery> =
	T extends BaseQuery<infer U> ? U : any;
