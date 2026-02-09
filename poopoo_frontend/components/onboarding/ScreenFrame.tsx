import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, UI } from "./styles";

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children: ReactNode;
  bottom?: ReactNode;
}

export default function ScreenFrame({ title, subtitle, onBack, children, bottom }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.content}>{children}</View>

      {bottom ? <View style={styles.bottom}>{bottom}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: UI.topPadding,
  },
  topRow: {
    paddingHorizontal: UI.screenPaddingX,
    height: 78,
    justifyContent: "center",
  },
  back: { width: 58, height: 58, justifyContent: "center" },
  backPlaceholder: { width: 58, height: 58  },
  backText: { fontSize: 55, lineHeight: 55, color: COLORS.text, fontFamily: FONTS.body },

  header: {
    paddingHorizontal: UI.screenPaddingX,
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: SIZES.title,
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: SIZES.body,
    color: COLORS.subtext,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: UI.screenPaddingX,
    paddingTop: 18,
  },
  bottom: {
    paddingHorizontal: UI.screenPaddingX,
    paddingBottom: 28,
    marginTop: 60,
    alignItems: "center",
  },
});
