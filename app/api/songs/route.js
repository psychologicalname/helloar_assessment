import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const addSong = await prisma.songs.create({

    })

    const song = await prisma.songs.findFirst({

    })

    return Response.json(song)
}


export async function GET(request) {

    const allSongs = await prisma.songs.findMany({

    });

    return Response.json(allSongs)
}