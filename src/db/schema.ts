import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToOrganizations: many(usersToOrganizationsTable),
}));

export const organizationsTable = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const organizationsTableRelations = relations(
  organizationsTable,
  ({ many }) => ({
    professionals: many(professionalsTable),
    clients: many(clientsTable),
    appointments: many(appointmentsTable),
    usersToOrganizations: many(usersToOrganizationsTable),
  }),
);

export const usersToOrganizationsTable = pgTable("users_to_organizations", {
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToOrganizationsTableRelations = relations(
  usersToOrganizationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToOrganizationsTable.userId],
      references: [usersTable.id],
    }),
    organization: one(organizationsTable, {
      fields: [usersToOrganizationsTable.organizationId],
      references: [organizationsTable.id],
    }),
  }),
);

export const professionalsTable = pgTable("professionals", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  name: text("name").notNull(),
  avatarImage: text("avatar_image_url"),
  specialty: text("specialties").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 0 - Sunday
  availableFromWeekDay: integer("available_from_week_Day").notNull(), // 1
  availableToWeekDay: integer("available_To_week_Day").notNull(), // 5
  availableFromTime: time("available_from_hour").notNull(), // 9
  availableToTime: time("available_to_hour").notNull(), // 17
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const professionalsTableRelations = relations(
  professionalsTable,
  ({ many, one }) => ({
    organization: one(organizationsTable, {
      fields: [professionalsTable.organizationId],
      references: [organizationsTable.id],
    }),
    appointments: many(appointmentsTable),
  }),
);

export const clientsSexEnum = pgEnum("clients_sex", [
  "male",
  "female",
  "other",
]);

export const clientsTable = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
  sex: clientsSexEnum("sex").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const clientsTableRelations = relations(
  clientsTable,
  ({ many, one }) => ({
    organization: one(organizationsTable, {
      fields: [clientsTable.organizationId],
      references: [organizationsTable.id],
    }),
    appointments: many(appointmentsTable),
  }),
);

export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => clientsTable.id)
    .notNull(),
  professionalId: uuid("professional_id")
    .references(() => professionalsTable.id)
    .notNull(),
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    client: one(clientsTable, {
      fields: [appointmentsTable.clientId],
      references: [clientsTable.id],
    }),
    professional: one(professionalsTable, {
      fields: [appointmentsTable.professionalId],
      references: [professionalsTable.id],
    }),
    organization: one(organizationsTable, {
      fields: [appointmentsTable.organizationId],
      references: [organizationsTable.id],
    }),
  }),
);
