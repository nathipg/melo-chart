import { expect, describe, it, vi, afterEach } from 'vitest';

import { GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';
import { renderSuccessGrowl } from './render-success-growl.function';

vi.mock('./render-growl.function', () => {
  return {
    renderGrowl: vi.fn(),
  };
});

describe('renderSuccessGrowl function', () => {

  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should be defined', () => {
    expect(renderSuccessGrowl).toBeDefined();
  });

  it('should call renderGrowl with SUCCESS level', () => {
    const mockedParams = {
      message: 'Success growl',
      onCloseGrowl: vi.fn(),
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with fixed equals to false if none was received', () => {
    const mockedParams = {
      message: 'Success growl',
      onCloseGrowl: vi.fn(),
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to false when false is passed', () => {
    const mockedParams = {
      message: 'Success growl',
      onCloseGrowl: vi.fn(),
      fixed: false,
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to true when true is passed', () => {
    const mockedParams = {
      message: 'Success growl',
      onCloseGrowl: vi.fn(),
      fixed: true,
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received message value', () => {
    const mockedParams = {
      message: 'Some success message',
      onCloseGrowl: vi.fn(),
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received onCloseGrowl value', () => {
    const mockedParams = {
      message: 'Success growl',
      onCloseGrowl: vi.fn(),
    };

    renderSuccessGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.SUCCESS,
      fixed: false,
      ...mockedParams,
    });
  });

});
