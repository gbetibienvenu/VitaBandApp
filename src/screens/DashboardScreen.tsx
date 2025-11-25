// Dashboard Screen - Insights First, Graph Dominant Layout
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { VitalsData, DeviceStatus, HealthInsight, HealthHistory } from '../types';
import { COLORS, THRESHOLDS } from '../utils/constants';
import HealthGraph from '../components/HealthGraph';
import CompactVitalCard from '../components/CompactVitalCard';
import InsightCard from '../components/InsightCard';

interface DashboardScreenProps {
  vitals: VitalsData;
  deviceStatus: DeviceStatus;
  healthHistory: HealthHistory;
  insights: HealthInsight[];
  onRefresh: () => void;
  refreshing: boolean;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  vitals,
  deviceStatus,
  healthHistory,
  insights,
  onRefresh,
  refreshing,
}) => {
  const getVitalStatus = (
    value: number,
    min: number,
    max: number
  ): 'normal' | 'warning' | 'critical' => {
    if (value === 0) return 'normal';
    if (value < min * 0.8 || value > max * 1.2) return 'critical';
    if (value < min || value > max) return 'warning';
    return 'normal';
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Device Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>
            {deviceStatus.connected ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.statusText}>
            {deviceStatus.connected ? 'Live' : 'Offline'}
          </Text>
        </View>
        <View style={styles.statusDivider} />
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>🔋</Text>
          <Text style={styles.statusText}>{deviceStatus.battery}%</Text>
        </View>
        <View style={styles.statusDivider} />
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>⏱️</Text>
          <Text style={styles.statusText}>{deviceStatus.uptime}</Text>
        </View>
      </View>

      {/* INSIGHTS SECTION - FIRST */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Health Insights</Text>
        {insights.length > 0 ? (
          insights.slice(0, 3).map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))
        ) : (
          <View style={styles.emptyInsight}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyText}>
              Analyzing your health data...
            </Text>
          </View>
        )}
      </View>

      {/* GRAPHS SECTION - DOMINANT SPACE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Health Trends</Text>

        {/* Heart Rate Graph */}
        <HealthGraph
          title="Heart Rate"
          data={healthHistory.heartRate}
          color={COLORS.heart}
          unit="bpm"
          icon="❤️"
          thresholdMin={THRESHOLDS.heartRate.min}
          thresholdMax={THRESHOLDS.heartRate.max}
        />

        {/* Temperature Graph */}
        <HealthGraph
          title="Body Temperature"
          data={healthHistory.temperature}
          color={COLORS.temperature}
          unit="°C"
          icon="🌡️"
          thresholdMin={36.0}
          thresholdMax={THRESHOLDS.temperature.normal}
        />

        {/* SpO2 Graph */}
        <HealthGraph
          title="Blood Oxygen"
          data={healthHistory.spO2}
          color={COLORS.oxygen}
          unit="%"
          icon="🫁"
          thresholdMin={THRESHOLDS.spO2.min}
          thresholdMax={100}
        />
      </View>

      {/* COMPACT VITAL STATS - SUPPORTING INFO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Current Readings</Text>
        <View style={styles.compactGrid}>
          <CompactVitalCard
            icon="❤️"
            value={vitals.heartRate}
            label="Heart Rate"
            unit="bpm"
            color={COLORS.heart}
            status={getVitalStatus(
              vitals.heartRate,
              THRESHOLDS.heartRate.min,
              THRESHOLDS.heartRate.max
            )}
          />
          <CompactVitalCard
            icon="🫁"
            value={vitals.spO2}
            label="SpO2"
            unit="%"
            color={COLORS.oxygen}
            status={getVitalStatus(vitals.spO2, THRESHOLDS.spO2.min, 100)}
          />
        </View>
        <View style={styles.compactGrid}>
          <CompactVitalCard
            icon="🌡️"
            value={vitals.temperature.toFixed(1)}
            label="Temperature"
            unit="°C"
            color={COLORS.temperature}
            status={getVitalStatus(
              vitals.temperature,
              36.0,
              THRESHOLDS.temperature.normal
            )}
          />
          <CompactVitalCard
            icon="🏃"
            value={vitals.motion}
            label="Activity"
            unit="steps"
            color={COLORS.motion}
            status="normal"
          />
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          Automatic emergency detection is{' '}
          <Text style={styles.infoBold}>enabled</Text>. Configure in Settings.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray[700],
  },
  statusDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.gray[200],
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 15,
    marginTop: 10,
  },
  emptyInsight: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray[500],
  },
  compactGrid: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray[700],
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
    color: COLORS.info,
  },
});

export default DashboardScreen;