/** @jsxImportSource frog/jsx */

import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(`http://localhost:3000/api`);
  return {
    other: frameTags,
  };
}

export default function Page() {
  return <main></main>;
}
