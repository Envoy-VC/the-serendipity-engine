interface PersonalizedEngagementScoresProps {
  fids: number[];
  k?: number;
  limit?: number;
}

interface PersonalizedEngagementScoresResponse {
  result: {
    address: string;
    fname: string;
    username: string;
    fid: number;
    score: number;
  }[];
}

export const getPersonalizedEngagementScores = async ({
  fids,
  k = 2,
  limit = 40,
}: PersonalizedEngagementScoresProps) => {
  try {
    const res = (await fetch(
      `https://graph.cast.k3l.io/scores/personalized/engagement/fids?k=${k}&limit=${limit}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fids),
      }
    ).then((res) => res.json())) as PersonalizedEngagementScoresResponse;

    return res;
  } catch (error) {}
};
