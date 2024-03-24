/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

import type { FrameEnv } from '~/types';
import { getRandomCastsByUser } from '~/services/pinata';

export const UserPost: FrameHandler<
  FrameEnv,
  '/user-post',
  BlankInput
> = async (c) => {
  const { deriveState, buttonValue } = c;
  const previousState = c.previousState;

  const res = await getRandomCastsByUser({
    fid: previousState.randomFID!,
    pageToken: previousState.pageToken,
  });

  const state = deriveState((prev) => {
    if (buttonValue === 'more') prev.degreeCount++;
    if (res?.next_page_token) prev.pageToken = res.next_page_token;
    if (res?.next_page_token === null) prev.degreeCount = 5;
  });

  const cast = res?.cast;

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
        <div tw='flex flex-row items-start p-12' style={{ gap: '1.5rem' }}>
          <img
            src={cast?.author.pfp_url ?? ''}
            alt='author'
            tw='w-[8rem] h-[8rem] rounded-full'
            style={{
              objectFit: 'cover',
            }}
          />
          <div
            tw='flex flex-col h-full justify-start h-full'
            style={{
              gap: '1rem',
            }}
          >
            <div tw='flex flex-row items-center'>
              <div tw='text-[2rem] flex'>{cast?.author?.display_name}</div>
              <div tw='text-[1.6rem] text-neutral-300 flex'>
                (@{cast?.author?.username})
              </div>
            </div>

            <div tw='flex text-[1.5rem] text-neutral-100'>
              {cast?.author?.follower_count} Followers
            </div>
          </div>
        </div>
        <div tw='flex py-[2rem] w-full max-w-[1024px] mx-auto text-center'>
          <div
            tw='flex items-center justify-center text-center text-[2rem] w-full'
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {cast?.content}
          </div>
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
      state.degreeCount < 5 && (
        <Button value='more' action='/user-post'>
          See more posts 👀
        </Button>
      ),
    ],
  });
};
