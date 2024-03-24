/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '~/env';

import type { FrameContext } from 'frog';
import type { BlankInput } from 'hono/types';

import { getRandom } from '~/lib/helpers';
import type { FrameEnv } from '~/types';
import type { CastResponse } from '~/types/pinata';

interface SendAnalyticsProps {
  custom_id: string;
  context: FrameContext<FrameEnv, string, BlankInput>;
}

export const sendAnalytics = async ({
  custom_id,
  context,
}: SendAnalyticsProps) => {
  try {
    const data: Record<string, any> = {
      trustedData: {
        messageBytes: context.verified ? context.frameData?.messageHash : '',
      },
      untrustedData: {
        buttonIndex: context.buttonIndex,
        buttonValue: context.buttonValue,
        castId: context.frameData?.castId,
        fid: context.frameData?.fid,
        inputText: context.frameData?.inputText ?? '',
        messageHash: context.frameData?.messageHash,
        network: context.frameData?.network,
        timestamp: context.frameData?.timestamp,
        url: context.frameData?.url,
      },
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        custom_id,
        data,
        frame_id: 'the-serendipity-frame-test',
      }),
    };

    await fetch(
      'https://api.pinata.cloud/farcaster/frames/interactions',
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

interface GetRandomCastsParams {
  fid: string;
  pageToken?: string;
}

export const getRandomCastsByUser = async ({
  fid,
  pageToken = '',
}: GetRandomCastsParams) => {
  try {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${env.PINATA_JWT}` },
    };

    const res = (await fetch(
      `https://api.pinata.cloud/v3/farcaster/casts?fid=${fid}&pageToken
=${pageToken}&pageSize=10`,
      options
    ).then((response) => response.json())) as CastResponse;

    const { casts, next_page_token } = res.data;
    const randomCast = casts.at(getRandom(0, casts.length - 1))!;

    return {
      cast: randomCast,
      next_page_token,
    };
  } catch (error) {
    console.error(error);
  }
};
