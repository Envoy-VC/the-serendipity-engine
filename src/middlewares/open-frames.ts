/** @jsxImportSource frog/jsx */
import type { MiddlewareHandler } from 'hono';
import type { Env } from 'frog';

import { addOpenFrameTags } from '~/lib/helpers';

export const openFramesMiddleware: MiddlewareHandler<Env, never> = async (
  ctx,
  next
) => {
  await next();
  const isFrame =
    ctx.res.headers.get('content-type')?.includes('html') ?? false;
  if (isFrame) {
    const html = await ctx.res.text();
    const newHtml = await addOpenFrameTags(html);
    ctx.res = new Response(newHtml, {
      headers: {
        'content-type': 'text/html',
      },
    });
  }
};
