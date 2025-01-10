import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Seed the database with 5 users and 20 posts for each user
async function main() {
  await prisma.user.deleteMany();

  // Create users
  await prisma.user.createMany({
    data: [...Array(5).keys()].map((i) => ({
      username: `user${i + 1}`,
      password: hashPassword(`passworduser${i + 1}`),
      name: `User ${i + 1}`,
    })),
  });

  // Create 20 posts for each user
  const users = await prisma.user.findMany();

  await prisma.post.createMany({
    data: users.reduce((acc, user) => {
      return [
        ...acc,
        ...[...Array(20).keys()].map((i) => ({
          title: `Post ${i + 1} by ${user.name}`,
          content: `This is post ${i + 1} created by ${user.name}`,
          authorId: user.id,
        })),
      ];
    }, [] as Prisma.PostCreateManyInput[]),
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
