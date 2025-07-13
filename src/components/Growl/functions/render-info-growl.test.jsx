import { expect, describe, it, vi, afterEach } from 'vitest';

import { GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';
import { renderInfoGrowl } from './render-info-growl.function';

vi.mock('./render-growl.function', () => {
  return {
    renderGrowl: vi.fn(),
  };
});

describe('renderInfoGrowl function', () => {

  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should be defined', () => {
    expect(renderInfoGrowl).toBeDefined();
  });

  it('should call renderGrowl with INFO level', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with fixed equals to false if none was received', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to false when false is passed', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
      fixed: false,
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to true when true is passed', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
      fixed: true,
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received message value', () => {
    const mockedParams = {
      message: 'Some info message',
      onCloseGrowl: vi.fn(),
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      fixed: false,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received onCloseGrowl value', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    renderInfoGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.INFO,
      fixed: false,
      ...mockedParams,
    });
  });

});
