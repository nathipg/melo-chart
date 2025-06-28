import {
  onEditChunkKeyDownArrowDown,
  onEditChunkKeyDownArrowLeft,
  onEditChunkKeyDownArrowRight,
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
  'ArrowLeft': onEditChunkKeyDownArrowLeft,
  'ArrowRight': onEditChunkKeyDownArrowRight,
  'Escape': onEditChunkKeyDownEscape,
});
