/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

import type { FrameEnv } from '~/types';

export const UserPost: FrameHandler<
  FrameEnv,
  '/user-post',
  BlankInput
> = async (c) => {
  const { deriveState, buttonValue } = c;
  const state = deriveState((prev) => {
    if (buttonValue === 'more') prev.degreeCount++;
  });
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          fontFamily: '"Primus"',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div tw='flex text-white text-[2rem] py-[2rem]'>
          {state.randomUserAddress}
        </div>
        <div tw='flex text-white text-[2rem] mx-[1rem]'>
          Post Count: {String(state.degreeCount)}
        </div>
      </div>
    ),

    intents: [
      <Button value='connect' action='/connect'>
        Connect 🤝
      </Button>,
      <Button value='refresh' action='/constellation'>
        Next Profile 🔄
      </Button>,

      state.degreeCount < 6 && (
        <Button value='more' action='/user-post'>
          See more posts 👀
        </Button>
      ),
    ],
  });
};
