import { MIDI_GLOBAL_TUNNING, MIDI_NOTES_NAMES } from '../consts';

//

export const getFrequencyByNoteKey = (key: number) => MIDI_GLOBAL_TUNNING * (2 ** ((key - 69) / 12));

export const getNotesMIDIKeys = MIDI_NOTES_NAMES.map((note, index) => ({
  [note]: [...Array(12).keys()].map(val => index + (12 * val))
}));

export const getNoteInfo = (key: number) => {
  const note = getNotesMIDIKeys.find(val => Object.keys(val).some(noteKey => val[noteKey].includes(key)));
  if (!note) return false;
  const octave = note[Object.keys(note)[0]].findIndex(val => val === key) - 1;
  return {
    frequency: getFrequencyByNoteKey(key),
    note: Object.keys(note)[0],
    octave
  };
};

//

export const clearMIDINotes = (current: any) => ({
  ...current,
  midi: {
    ...current.midi,
    input: {
      notesOn: [],
      notesOff: 0
    }
  },
  mixer: {
    ...current.mixer,
    arm: false,
  }
});
