/**
 * {
  "data": {
    "casts": [
      {
        "author": {
          "bio": "Writer. Building @pinatacloud. Tinkering with a Farcaster native alternative to GoodReads: https://readcast.xyz \\ https://polluterofminds.com",
          "custody_address": "0x7f9a6992a54dc2f23f1105921715bd61811e5b71",
          "display_name": "Justin Hunter",
          "fid": 4823,
          "follower_count": 13623,
          "following_count": 844,
          "pfp_url": "https://i.seadn.io/gae/lhGgt7yK1JiBVYz_HBxcAmYLRtP03aw5xKX4FgmFT9Ai7kLD5egzlLvb0lkuRNl28shtjr07DC8IHzLUkTqlWUMndUzC9R5_MSxH3g?w=500&auto=format",
          "recovery_address": "0x00000000fcb080a4d6c39a9354da9eb9bc104cd7",
          "uid": 4823,
          "username": "polluterofminds",
          "verifications": [
            "0x1612c6dff0eb5811108b709a30d8150495ce9cc5",
            "0xcdcdc174901b12e87cc82471a2a2bd6181c89392"
          ]
        },
        "content": "Noooooooooo",
        "embeds": [],
        "fid": 4823,
        "hash": "0x9733fce86e174d1b2d8ba614c7cc0e2ba5372a97",
        "mentioned_profiles": [],
        "parent_author": {
          "bio": "@supercast",
          "custody_address": "0x0b28a373fc8d92669aefb420499e74ce2dd5d356",
          "display_name": "​woj — q/dau",
          "fid": 680,
          "follower_count": 62160,
          "following_count": 777,
          "pfp_url": "https://peach-changing-limpet-80.mypinata.cloud/ipfs/QmZenqRfBERmodRVUHhLaYvYVsRasihVcMY2gqUP2tX7t2?filename=profile_picture.png",
          "recovery_address": "0x00000000fcb080a4d6c39a9354da9eb9bc104cd7",
          "uid": 680,
          "username": "woj.eth",
          "verifications": [
            "0x1aa3096e2bbacae10c316e7282947f635d461e3c",
            "0xf417ace7b13c0ef4fcb5548390a450a4b75d3eb3"
          ]
        },
        "parent_hash": "0x0ab851ba8524eedf9e164b55f6eeec751f74b539",
        "parent_url": null,
        "reactions": {},
        "replies": {
          "count": 1
        },
        "root_parent_url": "https://warpcast.com/~/channel/frames",
        "short_hash": "0x9733fce8",
        "thread_hash": "0x317904d560a9acf1d25888322dd8c49afd78eb1f",
        "timestamp": "2024-03-08T21:12:34Z"
      }
    ],
    "next_page_token": "eyJvZmZzZXQiOiIwIn0"
  }
}
 */

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
