import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useFoodExpiry } from "../../components/calendar/useFoodExpiry";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface MonthCalendarProps {
  year: number;
  month: number;
  calendarData: Record<string, { name: string; color: string }[]>;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
}

function MonthCalendar({ year, month, calendarData, showLeftArrow, showRightArrow }: MonthCalendarProps) {
  const date = new Date(year, month, 1);
  const monthName = date.toLocaleString("default", { month: "long" });
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDay = isCurrentMonth ? today.getDate() : null;

  return (
    <View style={styles.monthContainer}>
      {/* Header */}
        <View style={styles.header}>
        <Text style={styles.monthText}>
            {monthName} <Text style={styles.yearText}>{year}</Text>
        </Text>
        </View>

      {/* Day labels */}
      <View style={styles.dayLabels}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const dateKey = getDateKey(day);
          const items = calendarData[dateKey] || [];
          const isToday = day === currentDay;

          return (
            <View key={day} style={styles.dayCell}>
              <View style={[styles.dayNumber, isToday && styles.todayCircle]}>
                <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
              </View>
              {items.map((item, i) => (
                <View key={i} style={[styles.eventBubble, { backgroundColor: item.color }]}>
                  <Text style={styles.eventText} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function Calendar() {
  const { calendarData, loading } = useFoodExpiry();

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#84BFFA" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* March 2026 - no left arrow */}
      <MonthCalendar
        year={2026}
        month={2}
        calendarData={calendarData}
        showLeftArrow={false}
        showRightArrow={true}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* April 2026 - no right arrow */}
      <MonthCalendar
        year={2026}
        month={3}
        calendarData={calendarData}
        showLeftArrow={true}
        showRightArrow={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  monthContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  yearText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#999",
  },
  navButtons: {
    flexDirection: "row",
    gap: 12,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 28,
    color: "#000",
  },
  dayLabels: {
    flexDirection: "row",
    marginBottom: 12,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    minHeight: 70,
    padding: 4,
    marginBottom: 8,
  },
  dayNumber: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dayText: {
    fontSize: 14,
    color: "#000",
  },
  todayCircle: {
    backgroundColor: "#000",
    borderRadius: 12,
  },
  todayText: {
    color: "#fff",
    fontWeight: "600",
  },
  eventBubble: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 2,
  },
  eventText: {
    fontSize: 9,
    fontWeight: "500",
    color: "#000",
  },
  divider: {
    height: 40,
  },
});