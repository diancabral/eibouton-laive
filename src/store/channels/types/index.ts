import { ReactElement } from 'react'
import Oscillator from '../../../web-audio/Oscillator'

export type ChannelTrackType = 'midi' | 'audio' | 'master';

export type ChannelDevice = {
  component: ReactElement | null,
  node?: Oscillator | null
  config?: null
}

export type ChannelMIDI = {
  title?: string
  color?: string
  start: {
    bar: number
    beat: number
    sixteenth: number
  }
  length: number
}

export type ChannelMetadata = {
  /** Unique id */
  uuid?: string,
  /** Set channel to MIDI, Audio or Master output */
  type: ChannelTrackType
  /** Title of channel */
  title?: string
  /** Header background color */
  color?: string
  /** Audio device connected to channel */
  device: ChannelDevice
  /** MIDI metadata to send to an audio device and to the arrangement screen */
  midi?: ChannelMIDI[]
  /** Channel Volume */
  gain?: number
  /** Channel Panorama */
  pan?: number
  /** Arms channel to receive MIDI messages */
  arm?: boolean
  /** Activate and deactivate channel audio output */
  active?: boolean
  /** Solo channel to listen audio output regardless */
  solo?: boolean
}
