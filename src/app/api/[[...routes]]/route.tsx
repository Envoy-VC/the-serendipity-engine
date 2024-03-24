/** @jsxImportSource frog/jsx */
import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

export const runtime = 'nodejs';
import fs from 'fs/promises';

// Middlewares
import { openFramesMiddleware } from '~/middlewares/open-frames';

// Frames
import { Home } from '~/frames';
import { Constellation } from '~/frames';
import { UserPost } from '~/frames';
import { Connect } from '~/frames';

// State
import type { State } from '~/types';

const app = new Frog<{ State: State }>({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    degreeCount: 0,
    pageToken: '',
  },
  async imageOptions() {
    const fontData = await fs.readFile('public/Primus_SemiBold.otf');
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
app.frame('/user-post', UserPost);
app.frame('/connect', Connect);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
