import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { generateAvatarUrl } from 'lib/avatar';
import { prisma } from 'lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const hashed = await hash(password, 12);

    const avatarUrl = name ? generateAvatarUrl(name) : null;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        image: avatarUrl,
      },
    });

    return new NextResponse(
      JSON.stringify({
        user: {
          email: user.email,
          name: user.name,
          image: user.image,
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
