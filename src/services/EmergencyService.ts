// Emergency Detection and Alert Service
import { Linking, Alert } from 'react-native';
import { VitalsData, EmergencySettings, ThresholdAlert } from '../types';
import { ThresholdChecker } from './ThresholdChecker';

class EmergencyService {
  private lastAlertTime: number = 0;
  private alertCooldown: number = 300000; // 5 minutes in milliseconds
  private emergencySettings: EmergencySettings = {
    autoEmergencyEnabled: false,
    emergencyNumber: '',
    notifyContacts: false,
    criticalAlertSound: true,
  };

  setEmergencySettings(settings: EmergencySettings): void {
    this.emergencySettings = settings;
  }

  getEmergencySettings(): EmergencySettings {
    return this.emergencySettings;
  }

  private canTriggerAlert(): boolean {
    const now = Date.now();
    if (now - this.lastAlertTime < this.alertCooldown) {
      return false;
    }
    return true;
  }

  checkForEmergency(vitals: VitalsData): boolean {
    if (!this.emergencySettings.autoEmergencyEnabled) {
      return false;
    }

    const alerts = ThresholdChecker.checkVitals(vitals);
    const isCritical = ThresholdChecker.isCritical(alerts);

    if (isCritical && this.canTriggerAlert()) {
      this.triggerAutomaticEmergency(vitals, alerts);
      this.lastAlertTime = Date.now();
      return true;
    }

    return false;
  }

  private triggerAutomaticEmergency(
    vitals: VitalsData,
    alerts: ThresholdAlert[]
  ): void {
    const messages = ThresholdChecker.getAlertMessages(alerts);
    const emergencyNumber = this.emergencySettings.emergencyNumber;

    Alert.alert(
      '🚨 AUTOMATIC EMERGENCY ALERT',
      `CRITICAL condition detected:\n\n${messages.join('\n')}\n\nCurrent Vitals:\n` +
        `❤️ HR: ${vitals.heartRate} bpm\n` +
        `🫁 SpO2: ${vitals.spO2}%\n` +
        `🌡️ Temp: ${vitals.temperature}°C\n\n` +
        `Automatic emergency call will be initiated.`,
      [
        {
          text: 'Cancel (10s)',
          style: 'cancel',
          onPress: () => console.log('Emergency cancelled by user'),
        },
        {
          text: 'Call Now',
          style: 'destructive',
          onPress: () => {
            if (emergencyNumber) {
              this.makeEmergencyCall(emergencyNumber);
            } else {
              Alert.alert(
                'No Emergency Number',
                'Please configure emergency contact in Settings'
              );
            }
          },
        },
      ],
      { cancelable: false }
    );

    // Auto-call after 10 seconds if not cancelled
    setTimeout(() => {
      if (emergencyNumber && this.emergencySettings.autoEmergencyEnabled) {
        this.makeEmergencyCall(emergencyNumber);
      }
    }, 10000);
  }

  makeEmergencyCall(phoneNumber: string): void {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => {
      console.error('Error making emergency call:', err);
      Alert.alert('Error', 'Could not initiate emergency call');
    });
  }

  manualEmergencyCall(phoneNumber: string): void {
    if (!phoneNumber) {
      Alert.alert(
        'No Emergency Number',
        'Please set an emergency contact number in Settings'
      );
      return;
    }

    Alert.alert(
      '🚨 Emergency Call',
      `Call emergency contact?\n\n${phoneNumber}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          style: 'destructive',
          onPress: () => this.makeEmergencyCall(phoneNumber),
        },
      ]
    );
  }
}

export default new EmergencyService();