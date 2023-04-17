import { prisma } from 'lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;
  const restaurant = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return new NextResponse(JSON.stringify(restaurant), { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;
  const json = await request.json();

  const updated = await prisma.user.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: json.name || null,
      email: json.email || null,
      password: json.password || null,
    },
  });

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;
  const json = await request.json();

  const updated = await prisma.user.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;

  const deleted = await prisma.user.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return new NextResponse(JSON.stringify(deleted), { status: 200 });
}
