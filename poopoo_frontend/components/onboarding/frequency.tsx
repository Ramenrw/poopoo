import { ScrollView, View, StyleSheet } from "react-native";
import ScreenFrame from "./ScreenFrame";
import NextPill from "./NextPill";
import OptionPill from "./OptionPill";

interface Props {
  selected: string | null;
  onChange: (next: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS = [
  "Never",
  "Once a month",
  "2–3 times a month",
  "4 or more times a month",
];

export default function Frequency({ selected, onChange, onNext, onBack }: Props) {
  return (
    <ScreenFrame
      title={"How often do you go\ngrocery shopping?"}
      onBack={onBack}
      bottom={<NextPill onPress={onNext} disabled={!selected} />}
    >
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.list}>
        {OPTIONS.map((o) => (
          <OptionPill
            key={o}
            label={o}
            selected={selected === o}
            onPress={() => onChange(o)}
          />
        ))}
        <View style={{ height: 8 }} />
      </ScrollView>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
    paddingTop: 6,
    paddingBottom: 20,
  },
});
