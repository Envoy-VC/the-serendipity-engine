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
