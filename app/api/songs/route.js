import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const addSong = await prisma.songs.create({
        data: {
            name: body.name,
            link: body.link,
            source: body.source,
            thumbnail: body.thumbnail,
        }
    })

    return Response.json(addSong)
}


export async function GET(request) {

    const allSongs = await prisma.songs.findMany({
        orderBy: {
            id: 'desc'
        },
        select: {
            id: true,
            name: true,
            link: true,
            source: true,
            thumbnail: true,
            added_on: true,
        }
    });

    return Response.json(allSongs)
}

export async function DELETE(request) {

    const body = await request.json();
    const allSongs = await prisma.songs.delete({
        where: {
            id: body.id
        }
    });

    return Response.json(allSongs)
}