import validator from "validator";

export const sanitizeInput = (input, max = 200) => {
  if (typeof input !== "string") return null;

  const trimmed = input.trim();

  const withoutTags = trimmed.replace(/<\/?[^>]+(>|$)/g, "");

  const clean = validator.stripLow(validator.escape(withoutTags));

  if (!validator.isLength(clean, { min: 1, max })) {
    return null;
  }

  return clean;
};
