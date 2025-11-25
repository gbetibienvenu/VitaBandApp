// Settings Screen - With Automatic Emergency Detection
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { EmergencySettings } from '../types';
import { COLORS, THRESHOLDS, APP_CONFIG } from '../utils/constants';


interface SettingsScreenProps {
  emergencySettings: EmergencySettings;
  brokerAddress: string;
  onEmergencySettingsChange: (settings: Partial<EmergencySettings>) => void;
  onBrokerAddressChange: (value: string) => void;
  onSave: () => void;
  onReconnect: () => void;
  onTestEmergency: () => void;
  onViewTeam: () => void;        // ← ADD THIS
  onViewProject: () => void;     // ← ADD THIS
}
// interface SettingsScreenProps {
//   emergencySettings: EmergencySettings;
//   brokerAddress: string;
//   onEmergencySettingsChange: (settings: Partial<EmergencySettings>) => void;
//   onBrokerAddressChange: (value: string) => void;
//   onSave: () => void;
//   onReconnect: () => void;
//   onTestEmergency: () => void;
// }

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  emergencySettings,
  brokerAddress,
  onEmergencySettingsChange,
  onBrokerAddressChange,
  onSave,
  onReconnect,
  onTestEmergency,
  onViewTeam,      // ← ADD THIS
  onViewProject,   // ← ADD THIS
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      {/* EMERGENCY SETTINGS - PRIORITY */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚨 Emergency Settings</Text>
          <Text style={styles.sectionSubtitle}>
            Configure automatic emergency detection and alerts
          </Text>
        </View>

        {/* Auto Emergency Toggle */}
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>
                🤖 Automatic Emergency Detection
              </Text>
              <Text style={styles.settingDescription}>
                Automatically detect critical health conditions and trigger emergency
                alerts
              </Text>
            </View>
            <Switch
              value={emergencySettings.autoEmergencyEnabled}
              onValueChange={(value) =>
                onEmergencySettingsChange({ autoEmergencyEnabled: value })
              }
              trackColor={{ false: COLORS.gray[300], true: COLORS.success }}
              thumbColor={
                emergencySettings.autoEmergencyEnabled
                  ? COLORS.white
                  : COLORS.gray[100]
              }
            />
          </View>

          {emergencySettings.autoEmergencyEnabled && (
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚡</Text>
              <Text style={styles.warningText}>
                System will automatically call emergency contact when critical vitals
                are detected. You will have 10 seconds to cancel.
              </Text>
            </View>
          )}
        </View>

        {/* Emergency Contact Number */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>📞 Emergency Contact Number</Text>
          <Text style={styles.settingDescription}>
            Primary contact for emergency situations
          </Text>
          <TextInput
            style={styles.input}
            value={emergencySettings.emergencyNumber}
            onChangeText={(value) =>
              onEmergencySettingsChange({ emergencyNumber: value })
            }
            placeholder="+1234567890"
            keyboardType="phone-pad"
          />
          {!emergencySettings.emergencyNumber &&
            emergencySettings.autoEmergencyEnabled && (
              <Text style={styles.errorText}>
                ⚠️ Emergency number required for auto-detection
              </Text>
            )}
        </View>

        {/* Additional Emergency Options */}
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>🔔 Critical Alert Sound</Text>
              <Text style={styles.settingDescription}>
                Play loud sound during emergencies
              </Text>
            </View>
            <Switch
              value={emergencySettings.criticalAlertSound}
              onValueChange={(value) =>
                onEmergencySettingsChange({ criticalAlertSound: value })
              }
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
            />
          </View>
        </View>

        {/* Test Emergency */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={onTestEmergency}
        >
          <Text style={styles.testButtonText}>🧪 Test Emergency Alert</Text>
        </TouchableOpacity>
      </View>

      {/* DEVICE SETTINGS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📡 Device Connection</Text>
          <Text style={styles.sectionSubtitle}>
            Configure connection to your VitaBand device
          </Text>
        </View>

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>🔌 MQTT Broker Address</Text>
          <Text style={styles.settingDescription}>
            IP address and port of your Raspberry Pi
          </Text>
          <TextInput
            style={styles.input}
            value={brokerAddress}
            onChangeText={onBrokerAddressChange}
            placeholder="192.168.1.100:1883"
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.reconnectButton} onPress={onReconnect}>
          <Text style={styles.reconnectText}>🔄 Reconnect to Device</Text>
        </TouchableOpacity>
      </View>

      {/* HEALTH THRESHOLDS INFO */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📏 Health Thresholds</Text>
          <Text style={styles.sectionSubtitle}>
            Automatic alert trigger values
          </Text>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.thresholdList}>
            <View style={styles.thresholdItem}>
              <Text style={styles.thresholdLabel}>❤️ Heart Rate</Text>
              <View style={styles.thresholdValues}>
                <View style={styles.thresholdBadge}>
                  <Text style={styles.thresholdValue}>
                    {THRESHOLDS.heartRate.min}-{THRESHOLDS.heartRate.max} bpm
                  </Text>
                  <Text style={styles.thresholdType}>Normal</Text>
                </View>
                <View style={[styles.thresholdBadge, styles.criticalBadge]}>
                  <Text style={styles.thresholdValue}>
                    {'<'}
                    {THRESHOLDS.heartRate.critical.min} or {'>'}
                    {THRESHOLDS.heartRate.critical.max} bpm
                  </Text>
                  <Text style={styles.thresholdType}>Critical</Text>
                </View>
              </View>
            </View>

            <View style={styles.thresholdDivider} />

            <View style={styles.thresholdItem}>
              <Text style={styles.thresholdLabel}>🫁 Blood Oxygen (SpO2)</Text>
              <View style={styles.thresholdValues}>
                <View style={styles.thresholdBadge}>
                  <Text style={styles.thresholdValue}>
                    {'>'}
                    {THRESHOLDS.spO2.warning}%
                  </Text>
                  <Text style={styles.thresholdType}>Normal</Text>
                </View>
                <View style={[styles.thresholdBadge, styles.criticalBadge]}>
                  <Text style={styles.thresholdValue}>
                    {'<'}
                    {THRESHOLDS.spO2.critical}%
                  </Text>
                  <Text style={styles.thresholdType}>Critical</Text>
                </View>
              </View>
            </View>

            <View style={styles.thresholdDivider} />

            <View style={styles.thresholdItem}>
              <Text style={styles.thresholdLabel}>🌡️ Temperature</Text>
              <View style={styles.thresholdValues}>
                <View style={styles.thresholdBadge}>
                  <Text style={styles.thresholdValue}>
                    {'<'}
                    {THRESHOLDS.temperature.normal}°C
                  </Text>
                  <Text style={styles.thresholdType}>Normal</Text>
                </View>
                <View style={[styles.thresholdBadge, styles.criticalBadge]}>
                  <Text style={styles.thresholdValue}>
                    {'>'}
                    {THRESHOLDS.temperature.highFever}°C
                  </Text>
                  <Text style={styles.thresholdType}>Critical</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>💾 Save All Settings</Text>
      </TouchableOpacity>

      {/* ABOUT SECTION */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About VitaBand</Text>
        <Text style={styles.aboutText}>
          Version {APP_CONFIG.version}
          {'\n'}© 2025 VitaBand Team
          {'\n\n'}
          {APP_CONFIG.tagline}
        </Text>
      </View>

        {/* MORE INFO SECTION - ADD THIS ENTIRE BLOCK */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ℹ️ More Information</Text>
          <Text style={styles.sectionSubtitle}>
            Learn more about VitaBand
          </Text>
        </View>

          {/* About Team Button */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onViewTeam}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>👥</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>About Our Team</Text>
            <Text style={styles.menuSubtitle}>Meet the people behind VitaBand</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

          {/* About Project Button */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onViewProject}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🏥</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>About the Project</Text>
            <Text style={styles.menuSubtitle}>Hackathon goals and technology</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.gray[500],
  },
  settingCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: COLORS.gray[500],
    lineHeight: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: COLORS.gray[50],
    color: COLORS.gray[800],
    marginTop: 10,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fff7ed',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  warningIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#92400e',
    lineHeight: 18,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 8,
  },
  testButton: {
    backgroundColor: COLORS.gray[100],
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray[300],
    borderStyle: 'dashed',
  },
  testButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray[700],
  },
  reconnectButton: {
    backgroundColor: COLORS.secondary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  reconnectText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  thresholdList: {
    paddingVertical: 5,
  },
  thresholdItem: {
    paddingVertical: 15,
  },
  thresholdLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: 12,
  },
  thresholdValues: {
    flexDirection: 'row',
    gap: 10,
  },
  thresholdBadge: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  criticalBadge: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },
  thresholdValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: 4,
  },
  thresholdType: {
    fontSize: 11,
    color: COLORS.gray[500],
    textTransform: 'uppercase',
  },
  thresholdDivider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 13,
    color: COLORS.gray[600],
    lineHeight: 20,
  },

   // ADD ALL THESE STYLES:
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
   menuIcon: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 4,
  },

   menuSubtitle: {
    fontSize: 13,
    color: COLORS.gray[500],
  },
  menuArrow: {
    fontSize: 28,
    color: COLORS.gray[400],
    fontWeight: '300',
  },
});

export default SettingsScreen;