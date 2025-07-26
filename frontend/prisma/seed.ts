import  prisma  from '../app/lib/prisma';


async function main() {
  const applications = [
    {
      company: 'OpenAI',
      title: 'Frontend Developer',
    },
    {
      company: 'Google',
      title: 'Software Engineer',
    },
    {
      company: 'Netflix',
      title: 'Backend Engineer',
    },
  ];

  for (const app of applications) {
    await prisma.application.create({
      data: app,
    });
  }
}

main()
  .then(() => {
    console.log('Seed data inserted successfully.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
