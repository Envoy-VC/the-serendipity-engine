/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { Env, FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

export const Home: FrameHandler<Env, '/', BlankInput> = async (c) => {
  return c.res({
    ogImage:
      'https://storage.googleapis.com/ethglobal-api-production/projects/msp47/images/image.png?bustcache=1711289866278',
    title: 'The Serendipity Engine',
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
        <div tw='text-white text-[4rem] py-[2rem]'>The Serendipity Engine</div>
        <div tw='text-white text-[2rem] mx-[1rem]'>
          Turn chance encounters into meaningful connections. Let serendipity
          guide you through the Farcasterverse.
        </div>
      </div>
    ),

    intents: [
      <Button value='' action='/constellation'>
        Explore Your Farcasterverse 🔮
      </Button>,
    ],
  });
};
