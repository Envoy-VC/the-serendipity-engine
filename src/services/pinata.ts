/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '~/env';

import { getRandom } from '~/lib/helpers';
import type { CastResponse } from '~/types/pinata';

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
