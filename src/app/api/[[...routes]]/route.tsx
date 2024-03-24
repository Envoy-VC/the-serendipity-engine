/** @jsxImportSource frog/jsx */
import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

// Middlewares
import { openFramesMiddleware } from '~/middlewares/open-frames';

// Frames
import { Home } from '~/frames';
import { Constellation } from '~/frames';

export const runtime = 'edge';

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  async imageOptions() {
    const fontData = await fetch(
      new URL('../../../assets/Primus_SemiBold.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    return {
      fonts: [
        {
          name: 'Primus',
          data: fontData,
          style: 'normal',
        },
      ],
    };
  },
});

app.use(openFramesMiddleware);

app.frame('/', Home);
app.frame('/constellation', Constellation);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
