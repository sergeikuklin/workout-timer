// Default workout values
export const DEFAULT_WORKOUT = {
  title: '',
  workTime: '00:30',
  restTime: '00:10',
  exercises: 8,
  sets: 3,
  breakTime: '01:00',
} as const;

// Audio cue timing (in seconds)
export const AUDIO_CUE_TIMING = {
  SECOND_SOUND_START: 3,
  SECOND_SOUND_END: 2,
  LAST_SECOND: 1,
  COMPLETE: 0,
} as const;
