import { ScrollView, View, StyleSheet } from "react-native";
import ScreenFrame from "./ScreenFrame";
import NextPill from "./NextPill";
import OptionPill from "./OptionPill";

interface Props {
  selected: string[];
  onChange: (next: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const GOALS = [
  "Eat healthier",
  "Explore new recipes",
  "Reduce food waste",
  "Save money",
  "Improve my cooking",
  "Eat more fruits",
  "Eat more vegetables",
  "Reduce sugars", 
  "Eat more protein",
  "Cook more at home",
];

export default function Goals({ selected, onChange, onNext, onBack }: Props) {
  function toggle(label: string) {
    if (selected.includes(label)) onChange(selected.filter((x) => x !== label));
    else onChange([...selected, label]);
  }

  return (
    <ScreenFrame title="What are your goals?" onBack={onBack} bottom={<NextPill onPress={onNext} />}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.list}>
        {GOALS.map((g) => (
          <OptionPill
            key={g}
            label={g}
            selected={selected.includes(g)}
            onPress={() => toggle(g)}
          />
        ))}
        <View style={{ height: 8 }} />
      </ScrollView>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 20,
    paddingTop: 6,
    paddingBottom: 20,
  },
});
