import { waitUntil } from '@vercel/functions';
 
async function getBlog() {
  const res = await fetch('https://example.com/');
  return res.json();
}

export async function GET(request: Request) {
    waitUntil(getBlog().then((json) => console.log({ json })));
    return new Response(`Hello from ${request.url}, I'm a Vercel Function!`);
}