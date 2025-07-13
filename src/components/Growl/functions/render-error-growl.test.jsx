import { expect, describe, it, vi, afterEach } from 'vitest';

import { GROWL_LEVEL } from '../constants';

import { renderErrorGrowl } from './render-error-growl.function';
import { renderGrowl } from './render-growl.function';

vi.mock('./render-growl.function', () => {
  return {
    renderGrowl: vi.fn(),
  };
});

describe('renderErrorGrowl function', () => {

  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should be defined', () => {
    expect(renderErrorGrowl).toBeDefined();
  });

  it('should call renderGrowl with ERROR level', () => {
    const mockedParams = {
      message: 'Error growl',
      onCloseGrowl: vi.fn(),
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with fixed equals to true if none was received', () => {
    const mockedParams = {
      message: 'Error growl',
      onCloseGrowl: vi.fn(),
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to false when false is passed', () => {
    const mockedParams = {
      message: 'Error growl',
      onCloseGrowl: vi.fn(),
      fixed: false,
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to true when true is passed', () => {
    const mockedParams = {
      message: 'Error growl',
      onCloseGrowl: vi.fn(),
      fixed: true,
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received message value', () => {
    const mockedParams = {
      message: 'Some error message',
      onCloseGrowl: vi.fn(),
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received onCloseGrowl value', () => {
    const mockedParams = {
      message: 'Error growl',
      onCloseGrowl: vi.fn(),
    };

    renderErrorGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.ERROR,
      fixed: true,
      ...mockedParams,
    });
  });

});
