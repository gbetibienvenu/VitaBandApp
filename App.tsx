// App.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  VitalsData,
  DeviceStatus,
  InsightItem,
  HealthInsight,
  TeamMember,
  TabName,
  EmergencySettings,
  HealthHistory,
} from './src/types';

import { MQTT_TOPICS, HISTORY_LENGTH } from './src/utils/constants';
import { ThresholdChecker } from './src/services/ThresholdChecker';
import MQTTService from './src/services/MQTTService';
import EmergencyService from './src/services/EmergencyService';
import { globalStyles } from './src/styles/globalStyles';

// Components
import SplashScreen from './src/components/SplashScreen';
import Header from './src/components/Header';
import TabNavigation from './src/components/TabNavigation';

// Screens
import InsightsScreen from './src/screens/InsightsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TeamScreen from './src/screens/TeamScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutProjectScreen from './src/screens/AboutProjectScreen';

// -----------------------------------------------------

// Modal Styles
const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '92%',
    maxHeight: '85%',
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#0ea5e9',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  closeButton: {
    fontSize: 30,
    color: '#fff',
    paddingHorizontal: 8,
  },
  content: { padding: 16 },
});

// -----------------------------------------------------

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabName>('insights');
  const [refreshing, setRefreshing] = useState(false);

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // -----------------------------------------------------

  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: 0,
    spO2: 0,
    temperature: 0,
    motion: 0,
  });

  const [healthHistory, setHealthHistory] = useState<HealthHistory>({
    heartRate: [65, 68, 70, 72, 71, 69, 73, 75],
    temperature: [36.5, 36.6, 36.7, 36.5, 36.6, 36.8, 36.7, 36.6],
    spO2: [98, 97, 98, 99, 98, 97, 98, 98],
    timestamps: [],
  });

  const [healthInsights, setHealthInsights] = useState<HealthInsight[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);

  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    connected: false,
    battery: 0,
    uptime: '0m',
  });

  // -----------------------------------------------------
  // Settings
  const [emergencySettings, setEmergencySettings] = useState<EmergencySettings>({
    autoEmergencyEnabled: false,
    emergencyNumber: '',
    notifyContacts: false,
    criticalAlertSound: true,
  });

  const [brokerAddress, setBrokerAddress] = useState('');

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Olaoye',
      role: 'Hardware & Software Engineer',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
      social: {
        github: 'gbetibienvenu',
        linkedin: 'johndoe',
        twitter: '@BienvenuGbeti'
      },
    },
    {
      id: 2,
      name: 'Bienvenu Gbeti',
      role: 'Elect-Elect & Software Engr',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
      social: {
        github: 'gbetibienvenu',
        linkedin: '@BienvenuGbeti',
        twitter: '@BienvenuGbeti'
      },
    },
    {
      id: 3,
      name: 'Esther',
      role: 'AI/ML Specialist & Mech Engr',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
      social: {
        github: 'gbetibienvenu',
        linkedin: '@BienvenuGbeti',
        twitter: '@BienvenuGbeti'
      },
    },
  ]);

  // -----------------------------------------------------
  // Load settings on startup
  useEffect(() => {
    loadSettings();
  }, []);

  // MQTT Connection after splash
  useEffect(() => {
    if (!showSplash && brokerAddress) {
      connectToDevice();
    }
  }, [showSplash, brokerAddress]);

  // Update emergency service settings
  useEffect(() => {
    EmergencyService.setEmergencySettings(emergencySettings);
  }, [emergencySettings]);

  // -----------------------------------------------------
  const loadSettings = async () => {
    try {
      const savedEmergency = await AsyncStorage.getItem('emergencySettings');
      const savedBroker = await AsyncStorage.getItem('brokerAddress');

      if (savedEmergency) {
        setEmergencySettings(JSON.parse(savedEmergency));
      }
      if (savedBroker) setBrokerAddress(savedBroker);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        'emergencySettings',
        JSON.stringify(emergencySettings)
      );
      await AsyncStorage.setItem('brokerAddress', brokerAddress);
      Alert.alert('✅ Success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('❌ Error', 'Failed to save settings');
    }
  };

  // -----------------------------------------------------

  const connectToDevice = () => {
    MQTTService.connect(brokerAddress, {
      onSuccess: () => {
        setDeviceStatus((prev) => ({ ...prev, connected: true }));
        console.log('✅ Connected to VitaBand device');

        // Subscribe to vitals
        MQTTService.subscribe(MQTT_TOPICS.vitals, (message: string) => {
          try {
            const data: VitalsData = JSON.parse(message);
            handleVitalsUpdate(data);
          } catch (error) {
            console.error('Error parsing vitals:', error);
          }
        });

        // Subscribe to AI explanations
        MQTTService.subscribe(MQTT_TOPICS.explanation, (message: string) => {
          setInsights((prev) => [
            {
              id: Date.now(),
              text: message,
              time: new Date().toLocaleTimeString(),
            },
            ...prev.slice(0, 19),
          ]);
        });

        // Subscribe to device status
        MQTTService.subscribe(MQTT_TOPICS.deviceStatus, (message: string) => {
          try {
            const status: Partial<DeviceStatus> = JSON.parse(message);
            setDeviceStatus({ ...status, connected: true } as DeviceStatus);
          } catch (error) {
            console.error('Error parsing device status:', error);
          }
        });
      },
      onFailure: (error: Error) => {
        console.error('❌ MQTT Connection failed:', error);
        Alert.alert(
          'Connection Failed',
          'Could not connect to VitaBand device. Check broker address in Settings.'
        );
      },
    });
  };

  // -----------------------------------------------------

  const handleVitalsUpdate = (data: VitalsData) => {
    setVitals(data);

    // Update health history
    setHealthHistory((prev) => ({
      heartRate: [...prev.heartRate.slice(-HISTORY_LENGTH + 1), data.heartRate],
      temperature: [
        ...prev.temperature.slice(-HISTORY_LENGTH + 1),
        data.temperature,
      ],
      spO2: [...prev.spO2.slice(-HISTORY_LENGTH + 1), data.spO2],
      timestamps: [
        ...prev.timestamps.slice(-HISTORY_LENGTH + 1),
        new Date().toISOString(),
      ],
    }));

    // Check thresholds and generate insights
    const alerts = ThresholdChecker.checkVitals(data);
    const newInsights = ThresholdChecker.generateHealthInsights(data, alerts);
    setHealthInsights(newInsights);

    // Automatic emergency detection
    if (emergencySettings.autoEmergencyEnabled) {
      EmergencyService.checkForEmergency(data);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('✅ Refreshed', 'Latest health data loaded');
    }, 1500);
  };

  const handleReconnect = () => {
    if (brokerAddress) {
      MQTTService.disconnect();
      setTimeout(() => connectToDevice(), 500);
      Alert.alert('🔄 Reconnecting', 'Attempting to reconnect to device...');
    } else {
      Alert.alert('❌ Error', 'Please enter MQTT broker address first');
    }
  };

  const handleTestEmergency = () => {
    Alert.alert(
      '🧪 Test Emergency Alert',
      'This will simulate an emergency alert. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Test',
          onPress: () => {
            EmergencyService.manualEmergencyCall(
              emergencySettings.emergencyNumber
            );
          },
        },
      ]
    );
  };

  // -----------------------------------------------------

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />

      <Header title="VitaBand" />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'dashboard' && (
        <DashboardScreen
          vitals={vitals}
          deviceStatus={deviceStatus}
          healthHistory={healthHistory}
          insights={healthInsights}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      )}

      {activeTab === 'insights' && <InsightsScreen insights={insights} />}

      {activeTab === 'settings' && (
        <SettingsScreen
          emergencySettings={emergencySettings}
          brokerAddress={brokerAddress}
          onEmergencySettingsChange={(u) =>
            setEmergencySettings(prev => ({ ...prev, ...u }))
          }
          onBrokerAddressChange={setBrokerAddress}
          onSave={saveSettings}
          onReconnect={handleReconnect}
          onTestEmergency={handleTestEmergency}
          onViewTeam={() => setShowTeamModal(true)}
          onViewProject={() => setShowProjectModal(true)}
        />
      )}

      {/* TEAM MODAL */}
      {showTeamModal && (
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <View style={modalStyles.header}>
              <Text style={modalStyles.title}>Team</Text>
              <TouchableOpacity onPress={() => setShowTeamModal(false)}>
                <Text style={modalStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={modalStyles.content}>
              <TeamScreen teamMembers={teamMembers} />
            </ScrollView>
          </View>
        </View>
      )}

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <View style={modalStyles.header}>
              <Text style={modalStyles.title}>About Project</Text>
              <TouchableOpacity onPress={() => setShowProjectModal(false)}>
                <Text style={modalStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={modalStyles.content}>
              <AboutProjectScreen />
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}