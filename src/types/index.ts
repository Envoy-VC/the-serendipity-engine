import type { Env as Env_hono } from 'hono';

export interface State {
  degreeCount: number;
  randomFID: string | null;
  randomAddress: string | null;
  pageToken: string;
}

export type FrameEnv = Env_hono & {
  State: State;
};
