import { getDb } from './db';
import { Admin, Category, Project, Profile, Qualification, TechStack } from '@/types';

const COLLECTIONS = {
  ADMINS: 'admins',
  CATEGORIES: 'categories',
  PROJECTS: 'projects',
  PROFILE: 'profile',
  QUALIFICATIONS: 'qualifications',
  TECH_STACKS: 'tech_stacks',
} as const;

// Admin Model
export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const db = await getDb();
  return await db.collection<Admin>(COLLECTIONS.ADMINS).findOne({ username });
}

export async function createAdmin(admin: Admin): Promise<void> {
  const db = await getDb();
  await db.collection<Admin>(COLLECTIONS.ADMINS).insertOne(admin);
}

export async function adminExists(): Promise<boolean> {
  const db = await getDb();
  const count = await db.collection(COLLECTIONS.ADMINS).countDocuments();
  return count > 0;
}

// Category Model
export async function getAllCategories(): Promise<Category[]> {
  const db = await getDb();
  return await db.collection<Category>(COLLECTIONS.CATEGORIES).find({}).toArray();
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  return await db.collection<Category>(COLLECTIONS.CATEGORIES).findOne({ _id: new ObjectId(id) });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = await getDb();
  return await db.collection<Category>(COLLECTIONS.CATEGORIES).findOne({ slug });
}

export async function createCategory(category: Omit<Category, '_id'>): Promise<Category> {
  const db = await getDb();
  const result = await db.collection<Category>(COLLECTIONS.CATEGORIES).insertOne({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Category);
  return { ...category, _id: result.insertedId.toString() } as Category;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection<Category>(COLLECTIONS.CATEGORIES).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
}

export async function deleteCategory(id: string): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection(COLLECTIONS.CATEGORIES).deleteOne({ _id: new ObjectId(id) });
}

// Project Model
export async function getAllProjects(publishedOnly: boolean = false): Promise<Project[]> {
  const db = await getDb();
  const query = publishedOnly ? { isPublished: true } : {};
  return await db.collection<Project>(COLLECTIONS.PROJECTS)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getProjectsByCategory(categoryId: string, publishedOnly: boolean = true): Promise<Project[]> {
  const db = await getDb();
  const query: any = { category: categoryId };
  if (publishedOnly) {
    query.isPublished = true;
  }
  return await db.collection<Project>(COLLECTIONS.PROJECTS)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  return await db.collection<Project>(COLLECTIONS.PROJECTS).findOne({ _id: new ObjectId(id) });
}

export async function createProject(project: Omit<Project, '_id'>): Promise<Project> {
  const db = await getDb();
  const result = await db.collection<Project>(COLLECTIONS.PROJECTS).insertOne({
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Project);
  return { ...project, _id: result.insertedId.toString() } as Project;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection<Project>(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection(COLLECTIONS.PROJECTS).deleteOne({ _id: new ObjectId(id) });
}

export async function getProjectStats() {
  const db = await getDb();
  const total = await db.collection(COLLECTIONS.PROJECTS).countDocuments();
  const published = await db.collection(COLLECTIONS.PROJECTS).countDocuments({ isPublished: true });
  const unpublished = total - published;
  
  // Projects by category
  const projectsByCategory = await db.collection(COLLECTIONS.PROJECTS)
    .aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    .toArray();

  return {
    total,
    published,
    unpublished,
    byCategory: projectsByCategory,
  };
}

// Profile Model
export async function getProfile(): Promise<Profile | null> {
  const db = await getDb();
  return await db.collection<Profile>(COLLECTIONS.PROFILE).findOne({});
}

export async function updateProfile(updates: Partial<Profile>): Promise<void> {
  const db = await getDb();
  const existing = await db.collection<Profile>(COLLECTIONS.PROFILE).findOne({});
  
  if (existing) {
    await db.collection<Profile>(COLLECTIONS.PROFILE).updateOne(
      {},
      { $set: { ...updates, updatedAt: new Date() } }
    );
  } else {
    await db.collection<Profile>(COLLECTIONS.PROFILE).insertOne({
      ...updates,
      updatedAt: new Date(),
    } as Profile);
  }
}

// Qualification Model
export async function getAllQualifications(publishedOnly: boolean = false): Promise<Qualification[]> {
  const db = await getDb();
  const query = publishedOnly ? { isPublished: true } : {};
  return await db.collection<Qualification>(COLLECTIONS.QUALIFICATIONS)
    .find(query)
    .sort({ issueDate: -1 })
    .toArray();
}

export async function getQualificationById(id: string): Promise<Qualification | null> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  return await db.collection<Qualification>(COLLECTIONS.QUALIFICATIONS).findOne({ _id: new ObjectId(id) });
}

export async function createQualification(qualification: Omit<Qualification, '_id'>): Promise<Qualification> {
  const db = await getDb();
  const result = await db.collection<Qualification>(COLLECTIONS.QUALIFICATIONS).insertOne({
    ...qualification,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Qualification);
  return { ...qualification, _id: result.insertedId.toString() } as Qualification;
}

export async function updateQualification(id: string, updates: Partial<Qualification>): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection<Qualification>(COLLECTIONS.QUALIFICATIONS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
}

export async function deleteQualification(id: string): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection(COLLECTIONS.QUALIFICATIONS).deleteOne({ _id: new ObjectId(id) });
}

// Tech Stack Model
export async function getAllTechStacks(): Promise<TechStack[]> {
  const db = await getDb();
  return await db
    .collection<TechStack>(COLLECTIONS.TECH_STACKS)
    .find({})
    .sort({ order: 1, name: 1 })
    .toArray();
}

export async function getFeaturedTechStacks(): Promise<TechStack[]> {
  const db = await getDb();
  return await db
    .collection<TechStack>(COLLECTIONS.TECH_STACKS)
    .find({ isFeatured: true })
    .sort({ order: 1, name: 1 })
    .toArray();
}

export async function getTechStackById(id: string): Promise<TechStack | null> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  return await db.collection<TechStack>(COLLECTIONS.TECH_STACKS).findOne({ _id: new ObjectId(id) });
}

export async function createTechStack(stack: Omit<TechStack, '_id'>): Promise<TechStack> {
  const db = await getDb();
  const result = await db.collection<TechStack>(COLLECTIONS.TECH_STACKS).insertOne({
    ...stack,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as TechStack);

  return { ...stack, _id: result.insertedId.toString() } as TechStack;
}

export async function updateTechStack(id: string, updates: Partial<TechStack>): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection<TechStack>(COLLECTIONS.TECH_STACKS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
}

export async function deleteTechStack(id: string): Promise<void> {
  const db = await getDb();
  const { ObjectId } = await import('mongodb');
  await db.collection(COLLECTIONS.TECH_STACKS).deleteOne({ _id: new ObjectId(id) });
}
