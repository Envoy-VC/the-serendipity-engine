import { env } from '~/env';

import type { FarcasterSocialResponse } from '~/types/airstack';

const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
const AIRSTACK_API_KEY = env.AIRSTACK_API_KEY;

const BULK_GET_USERS = `
  query BulkGetUsers($fids: [Identity!]!) {
    Socials(
      input: {
        filter: { dappName: { _eq: farcaster }, identity: { _in: $fids } }
        blockchain: ethereum
      }
    ) {
      Social {
        userId
        userAddress
        profileImageContentValue {
          image {
            original
          }
        }
      }
    }
  }
`;

export const bulkGetFarcasterUsers = async (ids: string[]) => {
  try {
    const fids: string[] = [];
    ids.forEach((id) => {
      fids.push(`fc_fid:${id}`);
    });
    const res = (await fetch(AIRSTACK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AIRSTACK_API_KEY,
      },
      body: JSON.stringify({ query: BULK_GET_USERS, variables: { fids } }),
    }).then((res) => res.json())) as FarcasterSocialResponse;

    //console.log(res.data.Socials.Social);
    return res.data.Socials.Social;
  } catch (error) {}
};
