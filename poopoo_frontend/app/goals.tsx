import { useState } from "react";
import { router } from "expo-router";
import Goals from "../components/onboarding/goals";

export default function GoalsScreen() {
  const [goals, setGoals] = useState<string[]>([]);

  return (
    <Goals
      selected={goals}
      onChange={setGoals}
      onBack={() => router.back()}
      onNext={() => router.back()}
    />
  );
}
