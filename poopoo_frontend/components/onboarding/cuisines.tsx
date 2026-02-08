import { View, Text, Pressable, Image, StyleSheet, ScrollView } from "react-native";
import ScreenFrame from "./ScreenFrame";
import NextPill from "./NextPill";
import { COLORS, FONTS, SIZES } from "./styles";

type CuisineKey = "Italian" | "Chinese" | "Indian" | "Korean" | "Japanese" | "Mexican" | "Thai" | "French";

const CUISINES: { key: CuisineKey; image: any }[] = [
  { key: "Italian", image: require("../../assets/images/cuisine-italian.png") },
  { key: "Chinese", image: require("../../assets/images/cuisine-chinese.png") },
  { key: "Indian", image: require("../../assets/images/cuisine-indian.png") },
  { key: "Korean", image: require("../../assets/images/cuisine-korean.png") },
  { key: "Japanese", image: require("../../assets/images/cuisine-japanese.png") },
  { key: "Mexican", image: require("../../assets/images/cuisine-mexican.png") },
  { key: "Thai", image: require("../../assets/images/cuisine-thai.png") },
  { key: "French", image: require("../../assets/images/cuisine-french.png") },
];

interface Props {
  selected: CuisineKey[];
  onChange: (next: CuisineKey[]) => void;
  onNext: () => void;
  onBack: () => void;
  minSelect?: number; // screenshot says 4
}

export default function Cuisines({ selected, onChange, onNext, onBack, minSelect = 4 }: Props) {
  function toggle(key: CuisineKey) {
    if (selected.includes(key)) onChange(selected.filter((x) => x !== key));
    else onChange([...selected, key]);
  }

  const canNext = selected.length >= minSelect;

  return (
    <ScreenFrame
      title={"What are your favourite\ncuisines"}
      subtitle={`Select at least ${minSelect}`}
      onBack={onBack}
      bottom={<NextPill onPress={onNext} disabled={!canNext} />}
    >
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.grid}>
        {CUISINES.map((c) => {
          const active = selected.includes(c.key);
          return (
            <Pressable
              key={c.key}
              onPress={() => toggle(c.key)}
              style={[styles.card, active && styles.cardActive]}
            >
              <Image source={c.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.cardLabel}>{c.key}</Text>
            </Pressable>
          );
        })}
        <View style={{ height: 8 }} />
      </ScrollView>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardLabel: {
    fontFamily: FONTS.body,
    fontSize: SIZES.body,
    color: COLORS.text,
    textAlign: "center",
  },
});
