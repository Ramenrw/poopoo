import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Loading from "../../../components/onboarding/loading";
import Organize from "../../../components/onboarding/organize";
import Save from "../../../components/onboarding/save";
import Health from "../../../components/onboarding/health";

import Goals from "../../../components/onboarding/goals";
import Cuisines from "../../../components/onboarding/cuisines";
import Frequency from "../../../components/onboarding/frequency";
import Restrictions from "../../../components/onboarding/restrictions";
import Welcome from "../../../components/onboarding/welcome";
import Auth from "components/onboarding/auth";

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  // persistent selections
  const [goals, setGoals] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [restrictions, setRestrictions] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      {/* 0: Loading */}
      {step === 0 && <Loading onDone={() => setStep(1)} />}

      {/* 1–3: the 3 intro pages */}
      {step === 1 && <Organize onNext={() => setStep(2)} />}
      {step === 2 && <Save onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <Health onBack={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <Auth onBack={() => setStep(3)} onDone={() => setStep(5)} />}

     {step === 5 && (
            <Goals
                selected={goals}
                onChange={setGoals}
                onBack={() => setStep(4)}
                onNext={() => setStep(6)}
            />
        )}


      {step === 6 && (
        <Cuisines
          selected={cuisines}
          onChange={setCuisines}
          onBack={() => setStep(5)}
          onNext={() => setStep(7)}
          minSelect={4}
        />
      )}

      {step === 7 && (
        <Frequency
          selected={frequency}
          onChange={setFrequency}
          onBack={() => setStep(6)}
          onNext={() => setStep(8)}
        />
      )}

      {step === 8 && (
        <Restrictions
          selected={restrictions}
          onChange={setRestrictions}
          onBack={() => setStep(7)}
          onNext={() => setStep(9)}
        />
      )}

      {step === 9 && (
        <Welcome
          onFinish={() => {
            // later: router.replace("/(tabs)")
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
