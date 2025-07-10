import FamilyBackground from "./model";
import { familyBackgroundSchema, FamilyBackgroundType } from "./validation";

const addFamilyBackgroundService = async (body: FamilyBackgroundType) => {
  if (!body || !familyBackgroundSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const familyBackground = await FamilyBackground.create(body);
  if (!familyBackground) {
    const error: any = new Error("failed to save family background");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  return familyBackground;
};

const getFamilyBackgroundService = async (id: string) => {
  const familyBackground = await FamilyBackground.findOne({ userId: id });
  if (!familyBackground) {
    const error: any = new Error("No Family Background found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  return familyBackground;
};

const updateFamilyBackgroundService = async (body: FamilyBackgroundType) => {
  if (!body || !familyBackgroundSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const updatedFamilyBackground = await FamilyBackground.findOneAndUpdate(
    { userId: body.userId },
    body
  );

  if (!updatedFamilyBackground) {
    const error: any = new Error("Family background not found!");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  return updatedFamilyBackground;
};

export default {
  addFamilyBackgroundService,
  getFamilyBackgroundService,
  updateFamilyBackgroundService,
};
