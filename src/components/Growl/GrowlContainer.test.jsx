import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TEST_IDS } from './constants';
import { GrowlContainer } from './GrowlContainer';

describe('GrowlContainer component', () => {

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(GrowlContainer).toBeDefined();
  });

  it('should return a growl container component', () => {
    const component = (
      <GrowlContainer></GrowlContainer>
    );

    const { getByTestId } = render(component);

    const growl = getByTestId(TEST_IDS.GROWL_CONTAINER);

    expect(growl).toBeDefined();
  });

  it('should render children when passed', () => {
    const TEXT_MOCKED = 'Some test here';
    const component = (
      <GrowlContainer>
        <span>{TEXT_MOCKED}</span>
      </GrowlContainer>
    );

    const { getByText } = render(component);

    const growl = getByText(TEXT_MOCKED);

    expect(growl).toBeDefined();
  });

});
