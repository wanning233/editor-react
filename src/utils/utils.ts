import { NameValueOption } from "./type";

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isFunction = (value: unknown): boolean => typeof value === 'function';

export function ensureNameValueOptions(arr: (string | NameValueOption)[]) {
    return arr.map((item) => {
      if (isString(item)) {
        return { value: item, name: item };
      }
      return item;
    });
  }
