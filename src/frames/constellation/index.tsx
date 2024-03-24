/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { Env, FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';
import { getPersonalizedEngagementScores } from '~/services/openrank';

import { bulkGetFarcasterUsers } from '~/services/airstack';
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

    intents: [<Button.Reset>Reset</Button.Reset>],
  });
};

interface UserProps extends FarcasterSocial {
  index: number;
}

const calculatePosition = (index: number) => {
  let position = 0;
  let elementPositionInRing = 0;
  if (index < 8) {
    position = 1;
    elementPositionInRing = index - 1;
  } else if (index >= 8 && index < 20) {
    position = 2;
    elementPositionInRing = index - 9;
  } else if (index >= 20 && index < 36) {
    position = 3;
    elementPositionInRing = index - 21;
  } else if (index >= 36 && index < 56) {
    position = 4;
    elementPositionInRing = index - 37;
  }

  const ringSize = 8 + 4 * (position - 1); // eg - 8, 12, 16, 20, 24
  const angle = (elementPositionInRing / ringSize) * (2 * Math.PI);

  const rx = 80 + position * 170;
  const ry = 60 + position * 80;

  const rotate = (position - 1) * 13;
  const x = Math.cos(angle + rotate) * rx;
  const y = Math.sin(angle + rotate) * ry;

  return { x, y };
};

const UserNode = ({ profileImageContentValue, index, userId }: UserProps) => {
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
          top: `${y + 295}px`,
          left: `${x + 580}px`,
        }}
      ></div>
    );
  }
};
