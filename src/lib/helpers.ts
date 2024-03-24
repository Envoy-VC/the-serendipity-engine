import { load } from 'cheerio';

export const openFramesMapping: Record<string, string> = {
  'fc:frame': 'of:version',
  'fc:frame:image': 'of:image',
  'fc:frame:image:aspect_ratio': 'of:image:aspect_ratio',
  'fc:frame:state': 'of:state',
  'fc;frame:post_url': 'of:post_url',
  'fc:frame:button:1': 'of:button:1',
  'fc:frame:button:1:action': 'of:button:1:action',
  'fc:frame:button:1.target': 'of:button:1:target',
  'fc:frame:button:2': 'of:button:2',
  'fc:frame:button:2:action': 'of:button:2:action',
  'fc:frame:button:2.target': 'of:button:2:target',
  'fc:frame:button:3': 'of:button:3',
  'fc:frame:button:3:action': 'of:button:3:action',
  'fc:frame:button:3.target': 'of:button:3:target',
  'fc:frame:button:4': 'of:button:4',
  'fc:frame:button:4:action': 'of:button:4:action',
  'fc:frame:button:4.target': 'of:button:4:target',
  'fc:frame:input:text': 'of:input:text',
};

export const addOpenFrameTags = async (html: string) => {
  const $ = load(html);

  // Iterate over meta tags with properties starting with "fc:frame"
  $('meta[property^="fc:frame"]').each((index, element) => {
    const farcasterProperty = $(element).attr('property') ?? '';
    const farcasterContent = $(element).attr('content');

    // Check if there's a corresponding Open Frames property
    const openFramesProperty = openFramesMapping[farcasterProperty];
    if (openFramesProperty) {
      // Create a new meta tag with the corresponding Open Frames property
      const newMetaTag = $('<meta>')
        .attr('property', openFramesProperty)
        .attr('content', farcasterContent);

      // Append the new meta tag to the head
      $('head').append(newMetaTag);
    }
  });

  // Add Protocol Identifiers Tags to the head
  const protocolTag = $('<meta>')
    .attr('property', 'of:accepts:xmtp')
    .attr('content', '2024-02-01');
  $('head').append(protocolTag);

  // Return the modified HTML string
  return $.html();
};

export const calculatePosition = (index: number) => {
  let position = 0;
  let elementPositionInRing = 0;
  if (index < 8) {
    position = 1;
    elementPositionInRing = index - 1;
  } else if (index >= 8 && index < 20) {
    position = 2;
    elementPositionInRing = index - 9;
  } else if (index >= 20 && index < 36) {
    position = 3;
    elementPositionInRing = index - 21;
  } else if (index >= 36 && index < 56) {
    position = 4;
    elementPositionInRing = index - 37;
  }

  const ringSize = 8 + 4 * (position - 1); // eg - 8, 12, 16, 20, 24, 32
  const angle = (elementPositionInRing / ringSize) * (2 * Math.PI);

  // Place elements in a ellipse
  const rx = 120 + position * 170;
  const ry = 120 + position * 80;

  const rotate = (position - 1) * 13;
  const x = Math.cos(angle + rotate) * rx;
  const y = Math.sin(angle + rotate) * ry;

  return { x, y };
};
