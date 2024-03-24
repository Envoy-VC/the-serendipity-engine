/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { Env, FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';
import { getPersonalizedEngagementScores } from '~/services/openrank';

import { bulkGetFarcasterUsers } from '~/services/airstack';
import { calculatePosition } from '~/lib/helpers';

import type { FarcasterSocial } from '~/types/airstack';

export const Constellation: FrameHandler<
  Env,
  '/constellation',
  BlankInput
> = async (c) => {
  const frameData = c.frameData;
  const fid = frameData?.fid ?? 0;

  // Get the personalized engagement scores for the user
  const res = await getPersonalizedEngagementScores({
    fids: [fid],
  });

  const ids = res?.result?.map((r) => String(r.fid)) ?? [];

  // Get all user profiles
  const users = (await bulkGetFarcasterUsers(ids)) ?? [];

  const userImage =
    (await bulkGetFarcasterUsers([String(fid)]))?.at(0)
      ?.profileImageContentValue.image?.original ?? null;

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          display: 'flex',
          fontFamily: '"Primus"',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {userImage ? (
          <div tw='absolute flex items-center justify-center rounded-full bg-yellow-500'>
            <img
              src={userImage}
              alt='Avatar'
              tw='h-[200px] w-[200px] rounded-full'
              style={{
                objectFit: 'cover',
              }}
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div tw='absolute flex items-center justify-center rounded-full bg-gray-500 w-[200px] h-[200px]'></div>
        )}
        {users.map((user, index) => {
          return <UserNode index={index} {...user} />;
        })}
      </div>
    ),

    intents: [
      <Button value='random'>Meet Someone New! ✨</Button>,
      <Button.Reset>⬅️ Back</Button.Reset>,
    ],
  });
};

interface UserProps extends FarcasterSocial {
  index: number;
}

const UserNode = ({ profileImageContentValue, index }: UserProps) => {
  const { x, y } = calculatePosition(index);

  const imageUrl = profileImageContentValue.image
    ? profileImageContentValue.image.original
    : null;

  if (imageUrl) {
    return (
      <div
        tw='absolute flex items-center justify-center rounded-full'
        style={{
          top: `${y + 295}px`,
          left: `${x + 580}px`,
        }}
      >
        <img
          src={imageUrl}
          alt='Avatar'
          tw='h-[85px] w-[85px] rounded-full'
          style={{
            objectFit: 'cover',
          }}
          width={85}
          height={85}
        />
      </div>
    );
  } else {
    return (
      <div
        tw='absolute flex items-center justify-center rounded-full bg-gray-500 w-[85px] h-[85px]
        '
        style={{
          top: `${y + 315}px`,
          left: `${x + 580}px`,
        }}
      ></div>
    );
  }
};
