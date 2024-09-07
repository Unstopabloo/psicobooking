import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `psicobooking_${name}`);

export const users = createTable(
  "user",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    role: text("role", { enum: ["patient", "psychologist", "admin"] }).notNull(),
    avatar: text("avatar"),
    specialty: text("specialty"),
    phone: int("phone"),
    nationality: text("nationality"),
    gender: text("gender", { enum: ["male", "female", "other"] }),
    birthDay: int("birth_day", { mode: "timestamp" }),
    occupation: text("occupation"),
    country: text("country"),
    state: text("state"),
    city: text("city"),
    street: text("street"),
    numHouse: text("num_house"),
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    emailIndex: uniqueIndex("email_idx").on(table.email),
    roleIndex: index("role_idx").on(table.role),
  })
);

export const clinics = createTable(
  "clinic",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    address: text("address").notNull(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export const availability = createTable(
  "availability",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    clinicId: int("clinic_id")
      .notNull()
      .references(() => clinics.id),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    dayOfWeek: int("day_of_week").notNull(),
    hourFrom: text("hour_from").notNull(),
    hourTo: text("hour_to").notNull(),
  },
  (table) => ({
    psychologistIndex: index("psychologist_idx").on(
      table.psychologistId,
      table.dayOfWeek
    ),
  })
);

export const appointments = createTable(
  "appointment",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    sessionType: text("session_type").notNull(),
    informedConsent: int("informed_consent", { mode: "boolean" }),
    state: text("state", {
      enum: ["scheduled", "completed", "cancelled"],
    }).notNull(),
    dateFrom: int("date_from", { mode: "timestamp" }).notNull(),
    dateTo: int("date_to", { mode: "timestamp" }),
  },
  (table) => ({
    psychologistIndex: index("psychologist_idx").on(
      table.psychologistId,
      table.dateFrom
    ),
    patientIndex: index("patient_idx").on(table.patientId, table.dateFrom),
  })
);

export const treatmentSheet = createTable(
  "treatment_sheet",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    actualState: text("actual_state").notNull(),
    dateFrom: int("date_from", { mode: "timestamp" }).notNull(),
    dateEnd: int("date_end", { mode: "timestamp" }).notNull(),
    endMotive: text("end_motive").notNull(),
    reasonMotive: text("reason_motive").notNull(),
    diagnosticGuidance: int("diagnostic_guidance").notNull(),
  },
  (table) => ({
    patientIndex: index("patient_idx").on(table.patientId),
  })
);

export const clinicHistory = createTable(
  "clinic_history",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    title: text("title"),
    content: text("content").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    patientIndex: index("patient_idx").on(table.patientId, table.createdAt),
  })
);

export const payments = createTable(
  "payment",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    appointmentId: int("appointment_id").references(() => appointments.id),
    communicationMode: text("communication_mode").notNull(),
    sessionType: text("session_type").notNull(),
    price: text("price").notNull(),
    bonus: text("bonus"),
    creationDate: int("creation_date", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    paymentDate: int("payment_date", { mode: "timestamp" }),
  },
  (table) => ({
    psychologistIndex: index("psychologist_idx").on(
      table.psychologistId,
      table.creationDate
    ),
    patientIndex: index("patient_idx").on(table.patientId, table.creationDate),
  })
);

export const benefits = createTable("benefit", {
  id: int("id").primaryKey({ autoIncrement: true }),
  levelName: text("level_name").notNull(),
  minMonths: int("min_months").notNull(),
  maxMonths: int("max_months"),
  benefitDescription: text("benefit_description").notNull(),
  discountPercentage: int("discount_percentage"),
  imageUrl: text("image_url"),
});

export const psychologistBenefits = createTable(
  "psychologist_benefit",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    benefitId: int("benefit_id")
      .notNull()
      .references(() => benefits.id),
  },
  (table) => ({
    psychologistBenefitIndex: index("psychologist_benefit_idx").on(
      table.psychologistId,
      table.benefitId
    ),
  })
);

export const audios = createTable(
  "audio",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    appointmentId: int("appointment_id")
      .notNull()
      .references(() => appointments.id),
    audio: text("audio"),
    title: text("title"),
    transcription: text("transcription"),
  },
  (table) => ({
    patientIndex: index("patient_idx").on(table.patientId),
  })
);

export const notes = createTable(
  "note",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    createdAt: int("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`
    ),
  },
  (table) => ({
    patientIndex: index("patient_idx").on(table.patientId, table.createdAt),
  })
);

export const activities = createTable(
  "activity",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    patientId: int("patient_id")
      .notNull()
      .references(() => users.id),
    document: text("document"),
    title: text("title").notNull(),
    description: text("description"),
    status: text("status", {
      enum: ["pending", "in_progress", "completed"],
    }),
    dateFrom: int("date_from", { mode: "timestamp" }).notNull(),
    dateTo: int("date_to", { mode: "timestamp" }),
  },
  (table) => ({
    psychologistIndex: index("psychologist_idx").on(
      table.psychologistId,
      table.dateFrom
    ),
    patientIndex: index("patient_idx").on(table.patientId, table.dateFrom),
  })
);

export const commentActivities = createTable(
  "comment_activity",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    activityId: int("activity_id")
      .notNull()
      .references(() => activities.id),
    userId: int("user_id")
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    publishedAt: int("published_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`
    ),
  },
  (table) => ({
    activityIndex: index("activity_idx").on(table.activityId, table.publishedAt),
  })
);

export const posts = createTable(
  "post",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    psychologistId: int("psychologist_id")
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    image: text("image"),
    likes: int("likes").notNull().default(0),
    publishedAt: int("published_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    psychologistIndex: index("psychologist_idx").on(
      table.psychologistId,
      table.publishedAt
    ),
  })
);

export const comments = createTable(
  "comment",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    postId: int("post_id")
      .notNull()
      .references(() => posts.id),
    userId: int("user_id")
      .notNull(),
    replyTo: int("replyTo"),
    content: text("content").notNull(),
    likes: int("likes").notNull().default(0),
    publishedAt: int("published_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    postIndex: index("post_idx").on(table.postId, table.publishedAt),
    userIndex: index("user_idx").on(table.userId, table.publishedAt),
    replyToIndex: index("parent_comment_idx").on(table.replyTo),
  })
);

export const commentsRelations = relations(comments, ({ one }) => ({
  replyTo: one(comments, {
    fields: [comments.replyTo],
    references: [comments.id],
  }),
}))