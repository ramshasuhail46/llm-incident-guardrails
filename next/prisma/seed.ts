import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  // 1. Create Organization
  const org = await prisma.organization.upsert({
    where: { name: "Acme Corp" },
    update: {},
    create: {
      name: "Acme Corp",
      slug: "acme-corp",
    },
  });

  // 2. Create User
  await prisma.user.upsert({
    where: { email: "admin@acmecorp.com" },
    update: {},
    create: {
      email: "admin@acmecorp.com",
      role: "ADMIN",
      organizationId: org.id,
    },
  });

  // 3. Create Projects
  const projectNames = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
  const projects = [];

  for (const name of projectNames) {
    const project = await prisma.project.upsert({
      where: { organizationId_name: { organizationId: org.id, name } },
      update: {},
      create: {
        name,
        slug: name.toLowerCase(),
        organizationId: org.id,
        apiKey: `key-${name.toLowerCase()}-${Math.random().toString(36).substring(7)}`,
      },
    });
    projects.push(project);
  }

  // 4. Create Incidents
  const severities = ["CRITICAL", "WARNING", "INFO"];
  const statuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];
  const issues = [
    "API Gateway Timeout",
    "Database latency increase",
    "Auth service healthy",
    "S3 bucket access error",
    "Frontend build failure",
    "Memory Leak",
    "CPU Usage Spike",
    "DNS Resolution Error"
  ];

  for (let i = 0; i < 50; i++) {
    const project = projects[Math.floor(Math.random() * projects.length)];
    const issue = issues[Math.floor(Math.random() * issues.length)];

    await prisma.incident.create({
      data: {
        projectId: project.id,
        incidentId: `INC-${1000 + i}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        isRead: Math.random() > 0.5,
        rawSignals: {
          error: issue,
          source: "monitoring-system",
          metrics: { cpu: Math.random() * 100, memory: Math.random() * 100 }
        },
        aiDiagnosis: {
          issue: issue,
          root_cause: "Unknown but likely due to resource exhaustion",
          recommended_action: "Restart service and check logs"
        },
        confidenceScore: parseFloat((Math.random() * (0.99 - 0.7) + 0.7).toFixed(2)),
        suggestedAction: "Check the relevant dashboard",
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
      }
    });
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
