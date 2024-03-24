export interface AirstackResponse<T> {
  data: T;
}

export interface FarcasterSocial {
  userId: string;
  userAddress: string;
  profileDisplayName: string;
  profileImage: string;
  profileName: string;
  profileTokenAddress: string;
  profileTokenUri: string;
  profileImageContentValue: {
    image: {
      original: string;
    } | null;
  };
}

export type FarcasterSocialResponse = AirstackResponse<{
  Socials: {
    Social: FarcasterSocial[];
  };
}>;

/**
 * {
  "data": {
    "Socials": {
      "Social": [
        {
          "dappName": "lens",
          "profileImage": "https://statics-polygon-lens.s3.eu-west-1.amazonaws.com/profile/nft-0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1_polygon_0xb2868701586Ffe90B33034F5ED11bA3d2A30C682_1865.png",
          "profileHandleNft": {
            "contentValue": {
              "image": {
                "original": "https://assets.airstack.xyz/image/nft/Hdn3FLPhuAvDjTS1kMvHJwDELUczmafXfGeIrbOceIyPiPRkyaP/E+02Q7nSiX/5QEgX4I1t/l8gI+L/4hlcD3V4m2iScKWey9Fg69bU7FlM+rz0FMuqAyMtPjhn5Q/4uWVLIYjkOYhn+CuKNVdgte5zjbz16X+6IT8rGm/73zw=/original_image"
              }
            }
          },
          "profileDisplayName": "Envoy_",
          "profileHandle": "@envoy1084",
          "profileImageContentValue": {
            "image": {
              "original": "https://assets.airstack.xyz/image/social/ii8HGCIn7rNSShejRNISvVAwBVPO3KTUaBkECQCNwbw=/original_image.png"
            }
          }
        },
        {
          "dappName": "farcaster",
          "profileImage": "https://i.imgur.com/9gZZAMw.jpg",
          "profileHandleNft": null,
          "profileDisplayName": "Vedant Chainani",
          "profileHandle": "envoy1084",
          "profileImageContentValue": {
            "image": {
              "original": "https://assets.airstack.xyz/image/social/dLhExoZhTJnosN8t1+VIrt5YQJ5+iqY1H18dzfzJmhk7esY9NtPItcD9KCe6xT5s/original_image.jpg"
            }
          }
        }
      ]
    },
    "XMTPs": {
      "XMTP": [
        {
          "isXMTPEnabled": true
        }
      ]
    }
  }
}
 */

export type LensSocial = {
  dappName: string;
  profileImage: string;
  profileHandleNft: {
    contentValue: {
      image: {
        original: string;
      };
    };
  } | null;
  profileDisplayName: string;
  profileHandle: string;
  profileImageContentValue: {
    image: {
      original: string;
    } | null;
  };
};

type XMTP = {
  isXMTPEnabled: boolean;
};

export type FarcasterUser = {
  dappName: string;
  profileImage: string;
  profileHandleNft: {
    contentValue: {
      image: {
        original: string;
      };
    };
  } | null;
  profileDisplayName: string;
  profileHandle: string;
  profileImageContentValue: {
    image: {
      original: string;
    } | null;
  };
};

type UserSocial = LensSocial | FarcasterUser;

export type UserSocialsResponse = AirstackResponse<{
  Socials: {
    Social: UserSocial[];
  };
  XMTPs: {
    XMTP: XMTP[] | null;
  };
}>;
