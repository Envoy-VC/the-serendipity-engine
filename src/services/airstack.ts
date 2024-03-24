import { env } from '~/env';

import type {
  FarcasterSocialResponse,
  UserSocialsResponse,
} from '~/types/airstack';

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

    return res.data.Socials.Social;
  } catch (error) {}
};

const GET_USER_SOCIALS = `
  query GetUserSocials($address: Address!, $id: Identity!) {
    Socials(
      input: {
        filter: {
          userAssociatedAddresses: { _eq: $address }
          dappName: { _in: [lens, farcaster] }
        }
        blockchain: ethereum
      }
    ) {
      Social {
        dappName
        profileImage
        profileHandleNft {
          contentValue {
            image {
              original
            }
          }
        }
        profileDisplayName
        profileHandle
        profileImageContentValue {
          image {
            original
          }
        }
      }
    }
    XMTPs(input: { blockchain: ALL, filter: { owner: { _eq: $id } } }) {
      XMTP {
        isXMTPEnabled
      }
    }
  }
`;

export const getUserSocials = async (address: string) => {
  try {
    const res = (await fetch(AIRSTACK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AIRSTACK_API_KEY,
      },
      body: JSON.stringify({
        query: GET_USER_SOCIALS,
        variables: { address, id: address },
      }),
    }).then((res) => res.json())) as UserSocialsResponse;

    const socials = res.data.Socials.Social;
    const xmtp = res.data.XMTPs?.XMTP?.at(0) ?? null;

    const lensSocials =
      socials.filter((social) => social.dappName === 'lens').at(0) ?? null;
    const farcasterSocials =
      socials.filter((social) => social.dappName === 'farcaster').at(0) ?? null;

    return {
      lens: lensSocials,
      farcaster: farcasterSocials,
      xmtp,
    };
  } catch (error) {}
};
