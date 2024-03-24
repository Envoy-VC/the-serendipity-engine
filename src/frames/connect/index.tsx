/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import type { FrameHandler } from 'frog';
import type { BlankInput } from 'hono/types';

import { Button } from 'frog';

import type { FrameEnv } from '~/types';

import { getUserSocials } from '~/services/airstack';
import type { FarcasterUser, LensSocial } from '~/types/airstack';

export const Connect: FrameHandler<FrameEnv, '/connect', BlankInput> = async (
  c
) => {
  const res = await getUserSocials(c.previousState.randomAddress ?? '');
  const lens = res?.lens ?? null;
  const farcaster = res?.farcaster ?? null;
  const xmtp = res?.xmtp ?? null;

  console.log(farcaster);

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
          padding: '4rem',
        }}
      >
        <div tw='flex flex-col' style={{ gap: '1rem' }}>
          {lens ? <LensProfile {...lens} /> : <></>}
          {farcaster ? <FarcasterProfile {...farcaster} /> : <></>}
        </div>
      </div>
    ),

    intents: [
      lens && (
        <Button.Redirect
          location={`https://www.lensfrens.xyz/${lens.profileHandle.slice(1)}`}
        >
          🌱 Lens
        </Button.Redirect>
      ),
      farcaster && (
        <Button.Redirect
          location={`https://warpcast.com/${farcaster.profileHandle}`}
        >
          ⛩️ Farcaster
        </Button.Redirect>
      ),
      xmtp && (
        <Button.Redirect location='https://xmtp.chat/'>
          💬 Message
        </Button.Redirect>
      ),
      <Button value='refresh' action='/constellation'>
        Next Profile 🔄
      </Button>,
    ],
  });
};

const LensProfile = ({
  profileHandleNft,
  profileDisplayName,
  profileHandle,
  profileImage,
}: LensSocial) => {
  const imageUrl =
    profileHandleNft?.contentValue?.image?.original ?? profileImage ?? null;
  return (
    <div
      tw='flex w-full border border-neutral-400 rounded-2xl px-4 flex-row py-8'
      style={{
        gap: '1.5rem',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='Avatar'
          tw='h-[128px] w-[128px] rounded-full'
          style={{
            objectFit: 'cover',
          }}
          width={128}
          height={128}
        />
      ) : (
        <div tw='flex items-center justify-center rounded-full bg-gray-500 w-[128px] h-[128px]'></div>
      )}
      <div
        tw='flex flex-col'
        style={{
          gap: '1rem',
        }}
      >
        <div tw='flex text-5xl'>🌱 {profileDisplayName}</div>
        <div tw='flex text-4xl text-neutral-400'>{profileHandle}</div>
      </div>
    </div>
  );
};

const FarcasterProfile = ({
  profileImageContentValue,
  profileDisplayName,
  profileHandle,
}: FarcasterUser) => {
  const imageUrl = profileImageContentValue.image?.original ?? null;
  return (
    <div
      tw='flex w-full border border-neutral-400 rounded-2xl px-4 flex-row py-8'
      style={{
        gap: '1.5rem',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='Avatar'
          tw='h-[128px] w-[128px] rounded-full'
          style={{
            objectFit: 'cover',
          }}
          width={128}
          height={128}
        />
      ) : (
        <div tw='flex items-center justify-center rounded-full bg-gray-500 w-[128px] h-[128px]'></div>
      )}
      <div
        tw='flex flex-col'
        style={{
          gap: '1rem',
        }}
      >
        <div tw='flex text-5xl'>⛩️ {profileDisplayName}</div>
        <div tw='flex text-4xl text-neutral-400'>@{profileHandle}</div>
      </div>
    </div>
  );
};
