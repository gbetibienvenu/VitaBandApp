// Insights Screen - Historical AI Insights
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InsightItem } from '../types';
import { COLORS } from '../utils/constants';

interface InsightsScreenProps {
  insights: InsightItem[];
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ insights }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📝 All Insights History</Text>
      <Text style={styles.subtitle}>
        Complete log of AI-powered health recommendations
      </Text>

      {insights.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💭</Text>
          <Text style={styles.emptyTitle}>No Insights Yet</Text>
          <Text style={styles.emptyText}>
            Your VitaBand will generate personalized insights as it monitors your
            health throughout the day.
          </Text>
        </View>
      ) : (
        insights.map((insight) => (
          <View key={insight.id} style={styles.insightCard}>
            <Text style={styles.insightTime}>{insight.time}</Text>
            <Text style={styles.insightText}>{insight.text}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.gray[500],
    textAlign: 'center',
    lineHeight: 22,
  },
  insightCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightTime: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginBottom: 8,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray[700],
  },
});

export default InsightsScreen;