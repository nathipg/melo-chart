import {
  onEditChunkKeyDownArrowDown,
  onEditChunkKeyDownArrowUp,
  onEditChunkKeyDownEnter,
  onEditChunkKeyDownEscape,
  onEditChunkKeyDownTab,
} from './functions';

export const EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER = Object.freeze({
  'Enter': onEditChunkKeyDownEnter,
  'Tab': onEditChunkKeyDownTab,
  'ArrowUp': onEditChunkKeyDownArrowUp,
  'ArrowDown': onEditChunkKeyDownArrowDown,
  'Escape': onEditChunkKeyDownEscape,
});
