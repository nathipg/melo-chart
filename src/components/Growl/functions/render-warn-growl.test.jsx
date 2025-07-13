import { expect, describe, it, vi, afterEach } from 'vitest';

import { GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';
import { renderWarnGrowl } from './render-warn-growl.function';

vi.mock('./render-growl.function', () => {
  return {
    renderGrowl: vi.fn(),
  };
});

describe('renderWarnGrowl function', () => {

  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should be defined', () => {
    expect(renderWarnGrowl).toBeDefined();
  });

  it('should call renderGrowl with WARN level', () => {
    const mockedParams = {
      message: 'Warn growl',
      onCloseGrowl: vi.fn(),
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with fixed equals to true if none was received', () => {
    const mockedParams = {
      message: 'Warn growl',
      onCloseGrowl: vi.fn(),
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to false when false is passed', () => {
    const mockedParams = {
      message: 'Warn growl',
      onCloseGrowl: vi.fn(),
      fixed: false,
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the fixed equals to true when true is passed', () => {
    const mockedParams = {
      message: 'Warn growl',
      onCloseGrowl: vi.fn(),
      fixed: true,
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received message value', () => {
    const mockedParams = {
      message: 'Some warn message',
      onCloseGrowl: vi.fn(),
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      fixed: true,
      ...mockedParams,
    });
  });

  it('should call renderGrowl with the received onCloseGrowl value', () => {
    const mockedParams = {
      message: 'Warn growl',
      onCloseGrowl: vi.fn(),
      fixed: true,
    };

    renderWarnGrowl(mockedParams);

    expect(vi.mocked(renderGrowl)).toHaveBeenCalledOnce();
    expect(vi.mocked(renderGrowl)).toHaveBeenCalledWith({
      level: GROWL_LEVEL.WARN,
      ...mockedParams,
    });
  });

});
