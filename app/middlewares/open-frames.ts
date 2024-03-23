import { load } from 'cheerio';

const mapping: Record<string, string> = {
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
    const openFramesProperty = mapping[farcasterProperty];
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
