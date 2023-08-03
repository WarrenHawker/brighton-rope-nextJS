import { prismaClient } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@/utils/functions';

//get all teacher bios, excludes email field
export const GET = async (request: NextRequest) => {
  //try fetching teacher bios from database
  try {
    const teachersData = await prismaClient.teachers.findMany({
      where: { public: true },
    });
    if (teachersData) {
      const teachers = teachersData.map((teacher) => {
        return {
          id: teacher.id,
          name: teacher.name,
          pronouns: teacher.pronouns,
          description: teacher.description,
          imageUrl: teacher.imageUrl,
          position: teacher.position,
        };
      });
      return NextResponse.json({ teachers }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'No teacher bios found' },
        { status: 404 }
      );
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
