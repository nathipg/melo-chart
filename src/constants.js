export const REQUEST_STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
});

export const SOCKET_CHANNEL = 'melo-chart-song-updates';

export const SOCKET_EVENT_NAME_MAPPER = Object.freeze({
  UPDATE_CHART_CHANGES_LOG: 'update-chart-changes-log',
  UPDATE_CHART_REQUEST_CHANGES: 'update-chart-request-changes',
  ADD_PITCH_ABOVE: 'add-pitch-above',
  ADD_PITCH_BELOW: 'add-pitch-below',
  ADD_NOTE_BEFORE: 'add-note-before',
  ADD_NOTE_AFTER: 'add-note-after',
  REMOVE_PITCH: 'remove-pitch',
  REMOVE_NOTE: 'remove-note',
  UPDATE_SONG_TITLE: 'update-song-title',
  UPDATE_NOTE_CHUNK_TEXT: 'update-note-chunk-text',
  UPDATE_NOTE_CHUNK_POSITION: 'update-note-chunk-position',
  UPDATE_CHART_GENERATE_BY_LYRICS: 'update-chart-generate-by-lyrics',
  UPDATE_CHART_TRIM: 'update-chart-trim',
  UPDATE_CHART_SHARED_WITH: 'update-chart-shared-with',
  UPDATE_CHART_ADD_MULTIPLE_PITCHES: 'update-chart-add-multiple-pitches',
  UPDATE_CHART_ADD_MULTIPLE_NOTES: 'update-chart-add-multiple-notes',
});
