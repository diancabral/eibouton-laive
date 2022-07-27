export type MIDIControllerType = {
  id?: string
  name?: string
  manufacturer?: string
}

export type MIDINoteType = {
  key?: number | null
  octave?: number | null
  frequency?: number | null
  note?: string | null
  velocity?: number | null
  display?: string | null
}

export type MIDIInputType = {
  notesOn: MIDINoteType[];
  notesOff: number;
};
