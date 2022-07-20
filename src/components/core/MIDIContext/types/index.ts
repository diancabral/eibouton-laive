export type MIDIControllerType = {
  id?: string
  name?: string
  manufacturer?: string
}

export type MIDIMessageType = {
  key?: number | null
  octave?: number | null
  frequency?: number | null
  note?: string | null
  velocity?: number | null
  display?: string | null
}

export type MIDIProviderType = {
  messages?: MIDIMessageType[] | null
  controllers?: MIDIControllerType[] | null
  received?: number
}
