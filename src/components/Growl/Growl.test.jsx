import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GROWL_LEVEL, GROWL_TIMEOUT, TEST_IDS } from './constants';
import { Growl } from './Growl';

const onCloseGrowlMocked = vi.fn();

describe('Growl component', () => {

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('should be defined', () => {
    expect(Growl).toBeDefined();
  });

  it('should return a growl component', () => {
    const component = (
      <Growl
        level={GROWL_LEVEL.INFO}
        message="Some growl message"
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    const { getByTestId } = render(component);

    const growl = getByTestId(TEST_IDS.GROWL);

    expect(growl).toBeDefined();
  });

  it('should return fragment if level is nullish', () => {
    const component = (
      <Growl
        message="Some growl message"
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    const { queryByTestId } = render(component);

    const growl = queryByTestId(TEST_IDS.GROWL);

    expect(growl).toBeNull();
  });

  it('should return fragment if message is nullish', () => {
    const component = (
      <Growl
        level={GROWL_LEVEL.INFO}
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    const { queryByTestId } = render(component);

    const growl = queryByTestId(TEST_IDS.GROWL);

    expect(growl).toBeNull();
  });

  it('should return fragment if onCloseGrowl is nullish', () => {
    const component = (
      <Growl
        level={GROWL_LEVEL.INFO}
        message="Some growl message"
      />
    );

    const { queryByTestId } = render(component);

    const growl = queryByTestId(TEST_IDS.GROWL);

    expect(growl).toBeNull();
  });

  it('should call onCloseGrowl after timeout when growl is not fixed', () => {
    vi.useFakeTimers();

    const component = (
      <Growl
        level={GROWL_LEVEL.ERROR}
        message="Some growl message"
        fixed={false}
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    render(component);

    act(() => {
      vi.advanceTimersByTime(GROWL_TIMEOUT);

      expect(onCloseGrowlMocked).toHaveBeenCalledOnce();
    });
  });

  it('should NOT call onCloseGrowl after timeout when growl is fixed', () => {
    vi.useFakeTimers();

    const component = (
      <Growl
        level={GROWL_LEVEL.ERROR}
        message="Some growl message"
        fixed={true}
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    render(component);

    act(() => {
      vi.advanceTimersByTime(GROWL_TIMEOUT);

      expect(onCloseGrowlMocked).not.toHaveBeenCalled();
    });
  });

  it('should call onCloseGrowl when user clicks in close button', () => {
    const component = (
      <Growl
        level={GROWL_LEVEL.ERROR}
        message="Some growl message"
        fixed={true}
        onCloseGrowl={onCloseGrowlMocked}
      />
    );

    const { getByTestId } = render(component);

    const growlCloseBtn = getByTestId(TEST_IDS.GROWL_CLOSE_BTN);

    fireEvent.click(growlCloseBtn);

    expect(onCloseGrowlMocked).toHaveBeenCalledOnce();
  });

});
