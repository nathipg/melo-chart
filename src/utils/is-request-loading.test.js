import { expect, describe, it, expectTypeOf } from 'vitest';

import { REQUEST_STATUS } from '../constants';

import { isRequestLoading } from './is-request-loading.function';

describe('isRequestLoading function', () => {

  it('should be defined', () => {
    expect(isRequestLoading).toBeDefined();
  });

  it('should handle nullish arguments', () => {
    const value = isRequestLoading();

    expectTypeOf(value).toBeBoolean();
    expect(value).toBeFalsy();
  });

  it('should return true if request status is LOADING', () => {
    const value = isRequestLoading(REQUEST_STATUS.LOADING);

    expectTypeOf(value).toBeBoolean();
    expect(value).toBeTruthy();
  });

  it('should return false if request status is not LOADING', () => {
    const value1 = isRequestLoading(REQUEST_STATUS.FAILED);
    const value2 = isRequestLoading(REQUEST_STATUS.IDLE);
    const value3 = isRequestLoading(REQUEST_STATUS.SUCCEEDED);

    expectTypeOf(value1).toBeBoolean();
    expect(value1).toBeFalsy();

    expectTypeOf(value2).toBeBoolean();
    expect(value2).toBeFalsy();

    expectTypeOf(value3).toBeBoolean();
    expect(value3).toBeFalsy();
  });

});
