import type { Env as Env_hono } from 'hono';

export interface State {
  degreeCount: number;
  randomUserAddress: string | null;
}

export type FrameEnv = Env_hono & {
  State: State;
};