type MerusOscillator = {
  active?: boolean;
  wave?: string;
  octave?: number;
  fine?: number;
  volume?: number;
} & MerusEnvelope;

type MerusEnvelope = {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
};

export type MerusConfig = {
  env1?: MerusEnvelope;
  env2?: MerusEnvelope;
  env3?: MerusEnvelope;
  osc1?: MerusOscillator;
  osc2?: MerusOscillator;
  matrix?: unknown;
  portamento?: number;
  volume?: number;
};
