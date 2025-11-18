import { cleanup, render, within } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';

import { TEST_IDS } from '../constants';

import { renderSongs } from '.';

vi.mock('react-router-dom');

const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

const songMissingIdMocked = { title: 'test', notes: [] };
const songMissingTitleMocked = { id: 1, notes: [] };

const songsMocked = [
  { id: 1, title: 'Song 1' },
  { id: 2, title: 'Song 2' },
  { id: 3, title: 'Song 3' },
];

describe('renderSongs function', () => {

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('should be defined', () => {
    expect(renderSongs).toBeDefined();
  });

  it('should handle nullish values', () => {
    const component = renderSongs();

    const { getByTestId } = render(component);

    const emptyLi = getByTestId(TEST_IDS.EMPTY_LIST_MESSAGE);

    expect(emptyLi).toBeDefined();
  });

  it('should render a li with empty message when list is empty', () => {
    const component = renderSongs();

    const { getByTestId } = render(component);

    const emptyLi = getByTestId(TEST_IDS.EMPTY_LIST_MESSAGE);

    const { getByText } = within(emptyLi);

    expect(emptyLi).toBeDefined();
    expect(getByText('No songs here. What about adding one?')).toBeDefined();
  });

  it('should display a warning if song is missing id', () => {
    const component = renderSongs([ songMissingIdMocked ]);

    const { queryByTestId } = render(component);

    const song = queryByTestId(TEST_IDS.SONG);
    
    expect(song).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledOnce();
  });

  it('should display a warning if song is missing title', () => {
    const component = renderSongs([ songMissingTitleMocked ]);

    const { queryByTestId } = render(component);

    const song = queryByTestId(TEST_IDS.SONG);
    
    expect(song).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledOnce();
  });

  it.todo('should render all songs received', () => {
    const component = renderSongs(songsMocked);

    const { getAllByTestId } = render(component);

    const songs = getAllByTestId(TEST_IDS.SONG);

    expect(songs).toHaveLength(3);
  });

  it.todo('should render links to song\'s chart page', () => {
    
  });

});
