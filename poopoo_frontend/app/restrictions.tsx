import { useState } from "react";
import { router } from "expo-router";
import Restrictions from "../components/onboarding/restrictions";

export default function RestrictionsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Restrictions
      selected={selected}
      onChange={setSelected}
      onBack={() => router.back()}
      onNext={() => router.back()}
    />
  );
}
