/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

import type { FrameEnv } from '~/types';

export const Connect: FrameHandler<FrameEnv, '/connect', BlankInput> = async (
  c
) => {
  const { deriveState, buttonValue } = c;
  const previousState = c.previousState;

  return c.res({
    image: (
      <div
        style={{
          background: 'black',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          width: '100%',
          color: 'white',
        }}
      >
        connect page
      </div>
    ),

    intents: [
      <Button value='refresh' action='/constellation'>
        Next Profile 🔄
      </Button>,
    ],
  });
};
