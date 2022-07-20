export const getFrequencyPitchMIDI = (note: number) => (2 ** ((note - 69) / 12)) * 440;
