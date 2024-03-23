/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { Env, FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button, TextInput } from 'frog';

export const runtime = 'edge';

export const Home: FrameHandler<Env, '/', BlankInput> = async (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText ?? buttonValue;

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
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
        <div tw='text-white text-[4rem] mt-[3rem] py-[8rem]'>
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),

    intents: [
      <TextInput placeholder='Enter custom fruit...' />,
      <Button value='apples'>Apples</Button>,
      <Button value='oranges'>Oranges</Button>,
      <Button value='bananas'>Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
};
