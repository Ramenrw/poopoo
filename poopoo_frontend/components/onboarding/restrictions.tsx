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

const OPTIONS = [
  "Lactose-free",
  "Vegetarian",
  "Halal",
  "Vegan",
  "Gluten-free",
  "Kosher",
  "Food allergies",
  "Keto", 
  "Celiac", 
  "Pescatarian", 
  "Paleo",
];

export default function Restrictions({ selected, onChange, onNext, onBack }: Props) {
  function toggle(label: string) {
    if (selected.includes(label)) onChange(selected.filter((x) => x !== label));
    else onChange([...selected, label]);
  }

  return (
    <ScreenFrame
      title={"Do you have any\nfood restrictions?"}
      subtitle={"Select all that apply"}
      onBack={onBack}
      bottom={<NextPill onPress={onNext} />}
    >
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.list}>
        {OPTIONS.map((o) => (
          <OptionPill
            key={o}
            label={o}
            selected={selected.includes(o)}
            onPress={() => toggle(o)}
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
