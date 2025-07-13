import { render } from '@testing-library/react';
import { expect, describe, it, vi, afterEach, beforeEach } from 'vitest';

import { GROWL_CONTAINER_ID, GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';

describe('renderGrowl function', () => {

  beforeEach(() => {
    const growlContainer = document.createElement('div');
    growlContainer.id = GROWL_CONTAINER_ID;
    document.body.appendChild(growlContainer);
  });

  afterEach(() => {
    vi.resetAllMocks();
    document.getElementById(GROWL_CONTAINER_ID)?.remove();
  });
  
  it('should be defined', () => {
    expect(renderGrowl).toBeDefined();
  });

  it('should return a fragment if growl container element is not present in DOM', () => {
    document.getElementById(GROWL_CONTAINER_ID).remove();

    const mockedParams = {
      level: GROWL_LEVEL.INFO,
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    const result = renderGrowl(mockedParams);

    const { queryByTestId } = render(result);

    const growl = queryByTestId('growl');

    expect(growl).toBeNull();
  });

  it('should return a growl component', () => {
    const mockedParams = {
      level: GROWL_LEVEL.INFO,
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    const result = renderGrowl(mockedParams);

    const { getByTestId } = render(result);

    const growl = getByTestId('growl');

    expect(growl).toBeDefined();
  });

  it('should return fragment if level is nullish', () => {
    const mockedParams = {
      message: 'Info growl',
      onCloseGrowl: vi.fn(),
    };

    const result = renderGrowl(mockedParams);

    const { queryByTestId } = render(result);

    const growl = queryByTestId('growl');

    expect(growl).toBeNull();
  });

  it('should return fragment if message is nullish', () => {
    const mockedParams = {
      level: GROWL_LEVEL.INFO,
      onCloseGrowl: vi.fn(),
    };

    const result = renderGrowl(mockedParams);

    const { queryByTestId } = render(result);

    const growl = queryByTestId('growl');

    expect(growl).toBeNull();
  });

  it('should return fragment if onCloseGrowl is nullish', () => {
    const mockedParams = {
      level: GROWL_LEVEL.INFO,
      message: 'Info growl',
    };

    const result = renderGrowl(mockedParams);

    const { queryByTestId } = render(result);

    const growl = queryByTestId('growl');

    expect(growl).toBeNull();
  });

});
