import { addOpenFrameTags } from '@/app/middlewares/open-frames';
import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
});

// Middleware to Support Open Frames Specification
app.use(async (c, next) => {
  await next();
  const isFrame = c.res.headers.get('content-type')?.includes('html') ?? false;
  if (isFrame) {
    let html = await c.res.text();
    const newHtml = await addOpenFrameTags(html);
    console.log(newHtml);
    c.res = new Response(newHtml, {
      headers: {
        'content-type': 'text/html',
      },
    });
  }
});

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder='Enter custom fruit...' />,
      <Button value='apples'>Apples</Button>,
      <Button value='oranges'>Oranges</Button>,
      <Button value='bananas'>Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
