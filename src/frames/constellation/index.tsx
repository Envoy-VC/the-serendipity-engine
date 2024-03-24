/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';
import { getPersonalizedEngagementScores } from '~/services/openrank';

import { bulkGetFarcasterUsers } from '~/services/airstack';
import { calculatePosition, getRandom } from '~/lib/helpers';

import type { FarcasterSocial } from '~/types/airstack';

import type { FrameEnv } from '~/types';

export const Constellation: FrameHandler<
  FrameEnv,
  '/constellation',
  BlankInput
> = async (c) => {
  const fid = c.frameData?.fid ?? 1;

  // Get the personalized engagement scores for the user
  const res = await getPersonalizedEngagementScores({
    fids: [fid],
  });

  const ids = res?.result?.map((r) => String(r.fid)) ?? [];
  ids.push(String(fid));

  // Get all user profiles
  const users = (await bulkGetFarcasterUsers(ids)) ?? [];

  // get random user
  const randomNum = getRandom(0, users.length);
  const randomUser = users[randomNum]!;

  const { deriveState } = c;
  deriveState((prev) => {
    prev.degreeCount = 0;
    prev.randomFID = randomUser.userId;
    prev.pageToken = '';
    prev.randomAddress = randomUser.userAddress;
  });

  const userImage =
    users.filter((u) => u.userId === String(fid)).at(0)
      ?.profileImageContentValue?.image?.original ?? null;

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
      <Button value='random' action='/user-post'>
        Meet Someone New! ✨
      </Button>,
      <Button.Reset>⬅️ Back</Button.Reset>,
    ],
  });
};

interface UserProps extends FarcasterSocial {
  index: number;
}

const UserNode = ({ profileName, index }: UserProps) => {
  const { x, y } = calculatePosition(index);

  // random hex color array
  const colors = [
    '#ffffff',
    '#f8d7da',
    '#d4edda',
    '#cce5ff',
    '#d1ecf1',
    '#f8d7da',
    '#fff3cd',
  ];

  const randomColor = colors[getRandom(0, colors.length - 1)];

  return (
    <div
      tw='text-black text-xl absolute flex items-center justify-center rounded-2xl p-2'
      style={{
        top: `${y + 315}px`,
        left: `${x + 580}px`,
        backgroundColor: randomColor,
      }}
    >
      {profileName}
    </div>
  );
};
