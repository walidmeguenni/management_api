import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: "owner@example.com" },
    update: {},
    create: {
      username: "john_doe",
      email: "john_doe@example.com",
      password: "$2b$10$1va1tHDKQFkAVLioM0VbIOHxEVmEzMmYbSHR/AULFBl8kGm5p6RSO",
      role: Role.OWNER,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      username: "jane_smith",
      email: "jane_smith@example.com",
      password: "$2b$10$1va1tHDKQFkAVLioM0VbIOHxEVmEzMmYbSHR/AULFBl8kGm5p6RSO",
      role: Role.USER,
    },
  });

  console.log({ owner, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
