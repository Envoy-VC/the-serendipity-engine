export type CastType = {
  fid: number;
  author: {
    fid: number;
    display_name: string;
    bio: string;
    pfp_url: string;
    username: string;
    following_count: number;
    follower_count: number;
  };
  content: string;
  timestamp: string;
  embeds: [{ url: string }];
};

export type CastResponse = {
  data: {
    casts: CastType[];
    next_page_token: string;
  };
};
