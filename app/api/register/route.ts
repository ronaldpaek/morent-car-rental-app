import { prisma } from 'lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const hashed = await hash(password, 12);
    console.log('test test test')

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return new NextResponse(
      JSON.stringify({
        user: {
          email: user.email,
          name: user.name,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
