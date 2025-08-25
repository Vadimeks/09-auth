// app /lib/ api / [...path] / route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  const url = new URL(`https://notehub-api.goit.study/api/${path.join('/')}`);
  const cookie = request.headers.get('cookie') || '';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
      credentials: 'include',
    });

    const data = await response.json();
    const setCookie = response.headers.get('set-cookie');

    const nextResponse = NextResponse.json(data, { status: response.status });
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error('Proxy GET error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  const url = new URL(`https://notehub-api.goit.study/api/${path.join('/')}`);
  const cookie = request.headers.get('cookie') || '';
  const body = await request.json();
  console.log('Proxy POST:', url.toString());
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    const setCookie = response.headers.get('set-cookie');

    const nextResponse = NextResponse.json(data, { status: response.status });
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error('Proxy POST error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  const url = new URL(`https://notehub-api.goit.study/api/${path.join('/')}`);
  const cookie = request.headers.get('cookie') || '';
  console.log('Proxy DELETE:', url.toString());
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Cookie: cookie,
      },
      credentials: 'include',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy DELETE error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}
