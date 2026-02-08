import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import ScreenFrame from "./ScreenFrame";
import NextPill from "./NextPill";
import { COLORS, FONTS } from "./styles";

type Mode = "login" | "signup";

interface Props {
  onBack: () => void;
  onDone: () => void; // proceed to Goals
}

export default function Auth({ onBack, onDone }: Props) {
  const [mode, setMode] = useState<Mode>("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"username" | "email" | "password" | null>(null);

  const titleTop = mode === "login" ? "Welcome Back" : "Welcome";
  const titleBig = mode === "login" ? "Login" : "Sign Up";
  const primaryLabel = mode === "login" ? "Login" : "Next";

  const canSubmit =
    mode === "login"
      ? email.trim().length > 0 && password.trim().length > 0
      : username.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0;

  return (
    <ScreenFrame
      title={titleTop}
      onBack={onBack}
      bottom={
        <View style={{ marginBottom: 37 }}>
            <NextPill label={primaryLabel} disabled={!canSubmit} onPress={onDone} />
        </View>
        }
    >
      <View style={styles.center}>
        <Text style={styles.big}>{titleBig}</Text>

        <View style={styles.form}>
          {mode === "signup" ? (
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor={COLORS.subtext}
                style={[
                    styles.input,
                    focused === "username" && styles.inputFocused,
                ]}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                autoCapitalize="none"
                />
          ) : null}

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={COLORS.subtext}
                style={[
                    styles.input,
                    focused === "email" && styles.inputFocused,
                ]}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                autoCapitalize="none"
                keyboardType="email-address"
            />


          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={COLORS.subtext}
            style={[
                styles.input, 
                focused === "password" && styles.inputFocused,
            ]}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            secureTextEntry
          />
        </View>

        {/* Bottom swap section */}
        <View style={styles.switchBlock}>
          <Text style={styles.switchText}>
            {mode === "login" ? "Don’t have an account?" : "Already have an account?"}
          </Text>

          <Pressable
            onPress={() => setMode(mode === "login" ? "signup" : "login")}
            style={styles.outlineBtn}
          >
            <Text style={styles.outlineBtnText}>
              {mode === "login" ? "Sign Up" : "Login"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    gap: 40,
  },
  big: {
    fontFamily: FONTS.title,
    fontSize: 28,
    color: COLORS.text,
    textAlign: "center",
  },
  form: {
    width: "100%",
    gap: 14,
    paddingHorizontal: 8,
  },
  input: {
    width: "100%",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  switchBlock: {
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  switchText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,
  },
  outlineBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.bg,
    marginTop: 8,
  },
  outlineBtnText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
});
