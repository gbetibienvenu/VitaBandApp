// Enhanced Threshold Checker Service
import { VitalsData, ThresholdAlert, HealthInsight } from '../types';
import { THRESHOLDS } from '../utils/constants';

export class ThresholdChecker {
  static checkVitals(vitals: VitalsData): ThresholdAlert[] {
    const alerts: ThresholdAlert[] = [];

    // Heart Rate checks
    if (vitals.heartRate > THRESHOLDS.heartRate.critical.max) {
      alerts.push({
        type: 'critical',
        message: '🚨 Critical: Extremely high heart rate detected',
        parameter: 'heartRate',
        value: vitals.heartRate,
      });
    } else if (vitals.heartRate > THRESHOLDS.heartRate.max) {
      alerts.push({
        type: 'warning',
        message: '⚠️ High heart rate detected',
        parameter: 'heartRate',
        value: vitals.heartRate,
      });
    } else if (
      vitals.heartRate < THRESHOLDS.heartRate.critical.min &&
      vitals.heartRate > 0
    ) {
      alerts.push({
        type: 'critical',
        message: '🚨 Critical: Extremely low heart rate detected',
        parameter: 'heartRate',
        value: vitals.heartRate,
      });
    } else if (vitals.heartRate < THRESHOLDS.heartRate.min && vitals.heartRate > 0) {
      alerts.push({
        type: 'warning',
        message: '⚠️ Low heart rate detected',
        parameter: 'heartRate',
        value: vitals.heartRate,
      });
    }

    // SpO2 checks
    if (vitals.spO2 < THRESHOLDS.spO2.critical && vitals.spO2 > 0) {
      alerts.push({
        type: 'critical',
        message: '🚨 Critical: Severe oxygen deprivation',
        parameter: 'spO2',
        value: vitals.spO2,
      });
    } else if (vitals.spO2 < THRESHOLDS.spO2.min && vitals.spO2 > 0) {
      alerts.push({
        type: 'critical',
        message: '🚨 Critical: Low oxygen levels detected',
        parameter: 'spO2',
        value: vitals.spO2,
      });
    } else if (vitals.spO2 < THRESHOLDS.spO2.warning && vitals.spO2 > 0) {
      alerts.push({
        type: 'warning',
        message: '⚠️ Low oxygen saturation',
        parameter: 'spO2',
        value: vitals.spO2,
      });
    }

    // Temperature checks
    if (vitals.temperature > THRESHOLDS.temperature.highFever) {
      alerts.push({
        type: 'critical',
        message: '🚨 Critical: Very high fever detected',
        parameter: 'temperature',
        value: vitals.temperature,
      });
    } else if (vitals.temperature > THRESHOLDS.temperature.fever) {
      alerts.push({
        type: 'warning',
        message: '🌡️ High temperature - possible fever',
        parameter: 'temperature',
        value: vitals.temperature,
      });
    } else if (vitals.temperature > THRESHOLDS.temperature.normal) {
      alerts.push({
        type: 'warning',
        message: '⚠️ Elevated temperature',
        parameter: 'temperature',
        value: vitals.temperature,
      });
    }

    return alerts;
  }

  static isCritical(alerts: ThresholdAlert[]): boolean {
    return alerts.some((alert) => alert.type === 'critical');
  }

  static getAlertMessages(alerts: ThresholdAlert[]): string[] {
    return alerts.map((alert) => alert.message);
  }

  static generateHealthInsights(
    vitals: VitalsData,
    alerts: ThresholdAlert[]
  ): HealthInsight[] {
    const insights: HealthInsight[] = [];

    if (alerts.length > 0) {
      alerts.forEach((alert) => {
        insights.push({
          id: Date.now() + Math.random(),
          type: alert.type === 'critical' ? 'critical' : 'warning',
          title: alert.parameter.toUpperCase(),
          message: alert.message,
          time: new Date().toLocaleTimeString(),
          icon: this.getIconForParameter(alert.parameter),
        });
      });
    } else {
      // All normal - generate positive insight
      insights.push({
        id: Date.now(),
        type: 'success',
        title: 'All Systems Normal',
        message: 'Your vital signs are within healthy ranges. Keep up the great work!',
        time: new Date().toLocaleTimeString(),
        icon: '✅',
      });
    }

    // Add specific insights
    if (vitals.motion > 100) {
      insights.push({
        id: Date.now() + 1,
        type: 'info',
        title: 'Active Lifestyle',
        message: `You're staying active with ${vitals.motion} steps! Remember to stay hydrated.`,
        time: new Date().toLocaleTimeString(),
        icon: '🏃',
      });
    }

    return insights;
  }

  private static getIconForParameter(parameter: string): string {
    switch (parameter) {
      case 'heartRate':
        return '❤️';
      case 'spO2':
        return '🫁';
      case 'temperature':
        return '🌡️';
      default:
        return '⚠️';
    }
  }
}