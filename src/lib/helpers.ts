import { Skills } from "@prisma/client";

export const resolveSkillEnum = (skill: Skills) => {
  switch (skill) {
    case Skills.COLLABORATION:
      return "Collaboration";
    case Skills.COMMUNICATION:
      return "Communication";
    case Skills.CREATINGOVERVIEW:
      return "Creating overview";
    case Skills.CRITICALJUDGEMENT:
      return "Critical judgement";
    case Skills.FLEXIBILITY:
      return "Flexibility";
    case Skills.KNOWLEDGEDEVELOPMENT:
      return "Knowledge development";
    case Skills.PLANNING:
      return "Planning";
    case Skills.PROACTIVITY:
      return "Proactivity";
    case Skills.QUALITYPRODUCT:
      return "Quality product";
    case Skills.REFLECTING:
      return "Reflecting";
    default:
      return "Unknown";
  }
};
