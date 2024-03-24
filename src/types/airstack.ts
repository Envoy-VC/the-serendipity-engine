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
