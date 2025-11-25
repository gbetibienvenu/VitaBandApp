// Enhanced Type Definitions for VitaBand v2.0

export interface VitalsData {
  heartRate: number;
  spO2: number;
  temperature: number;
  motion: number;
  timestamp?: string;
}

export interface DeviceStatus {
  connected: boolean;
  battery: number;
  uptime: string;
}

export interface HealthInsight {
  id: number;
  type: 'success' | 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  time: string;
  icon: string;
}

export interface InsightItem {
  id: number;
  text: string;
  time: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string | null;
  social: SocialLinks;
}

export interface EmergencySettings {
  autoEmergencyEnabled: boolean;
  emergencyNumber: string;
  notifyContacts: boolean;
  criticalAlertSound: boolean;
}

export interface HealthHistory {
  heartRate: number[];
  temperature: number[];
  spO2: number[];
  timestamps: string[];
}

export interface ThresholdAlert {
  type: 'warning' | 'critical';
  message: string;
  parameter: string;
  value: number;
}

export type TabName = 'dashboard' | 'insights' | 'settings';