import type { Observable } from 'rxjs';

export type TypedHandlerDescriptor<T> = (
	target: object,
	propertyKey: string | symbol,
	descriptor: TypedPropertyDescriptor<(...args: any[]) => T>
) => TypedPropertyDescriptor<(...args: any[]) => T> | void;

export type TypedHandlerDecorator<T> = TypedHandlerDescriptor<Observable<T>> &
	TypedHandlerDescriptor<Promise<T>> &
	TypedHandlerDescriptor<T>;
