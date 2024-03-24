/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { Env, FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

export const Home: FrameHandler<Env, '/', BlankInput> = async (c) => {
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
        <div tw='text-white text-[4rem] mt-[3rem] py-[8rem]'>Get Started</div>
      </div>
    ),

    intents: [
      <Button value='' action='/constellation'>
        Get Started
      </Button>,
    ],
  });
};
