import { ChatCompletionRequestMessage } from 'openai';
import { ChatGPT } from '../lib/chatGPT';
import { prisma } from '../lib/prisma';

export async function getDataByAmbiguousDbQuery(chatMessage: string) {
  const prompt: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: `You are an expert in DB and Prisma.

      schema.prisma
      /// 授業
      model Course {
        id         Int         @id @default(autoincrement())
        name       String
        timing     Timing
        teachers   Teacher[]   @relation("course_to_teacher")
        classrooms ClassRoom[] @relation("course_to_class_room")
        periods    Period[]    @relation("course_to_period")
        dayOfWeeks DayOfWeek   @map("day_of_week")
        createdAt  DateTime    @default(now()) @map("created_at") @db.DateTime(0)
        updatedAt  DateTime    @updatedAt @map("updated_at") @db.DateTime(0)

        @@map("courses")
      }

      /// 教員
      model Teacher {
        id        Int      @id @default(autoincrement())
        name      String
        courses   Course[] @relation("course_to_teacher")
        createdAt DateTime @default(now()) @map("created_at") @db.DateTime(0)
        updatedAt DateTime @updatedAt @map("updated_at") @db.DateTime(0)

        @@map("teachers")
      }

      /// 教室
      model ClassRoom {
        id           Int      @id @default(autoincrement())
        buildingName String   @map("building_name")
        roomName     String   @map("room_name")
        courses      Course[] @relation("course_to_class_room")
        createdAt    DateTime @default(now()) @map("created_at") @db.DateTime(0)
        updatedAt    DateTime @updatedAt @map("updated_at") @db.DateTime(0)

        @@map("class_rooms")
      }

      /// 時限
      model Period {
        id        Int      @id @default(autoincrement())
        period    Int
        courses   Course[] @relation("course_to_period")
        createdAt DateTime @default(now()) @map("created_at") @db.DateTime(0)
        updatedAt DateTime @updatedAt @map("updated_at") @db.DateTime(0)

        @@map("periods")
      }

      enum Timing {
        // 前半科目
        first_half
        // 後半科目
        second_half
        // 通期科目
        full_term
      }

      enum DayOfWeek {
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }

      Such a schema is defined.
      Determine the user's purpose and think about what query will retrieve the expected data.`
    },
    {
      role: 'user',
      content: chatMessage
    },
    {
      role: 'system',
      content: `Output should always be limited to the contents of the where.`
    }
  ];

  const response = await ChatGPT.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    messages: prompt,
    function_call: 'auto',
    functions: [
      {
        name: 'generateDbQuery',
        description: 'Generate a query to retrieve the expected data.',
        parameters: {
          type: 'object',
          properties: {
            where: {
              type: 'string',
              description: 'Query to retrieve the expected data.'
            }
          },
          required: ['where']
        }
      }
    ]
  });

  const query: any = JSON.parse(response.data.choices[0].message?.function_call?.arguments || '');

  try {
    const courses = await prisma.course.findMany({
      where: { name: query.where.name },
      include: {
        teachers: true,
        classrooms: true,
        periods: true
      }
    });

    return courses;
  } catch (error) {
    console.error(error);
    return [];
  }
}
