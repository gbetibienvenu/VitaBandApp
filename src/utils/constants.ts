// Application Constants - Enhanced

export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#dc2626',
  info: '#3b82f6',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  heart: '#ef4444',
  oxygen: '#3b82f6',
  temperature: '#f59e0b',
  motion: '#10b981',
};

export const THRESHOLDS = {
  heartRate: {
    min: 50,
    max: 120,
    critical: { min: 40, max: 130 },
  },
  spO2: {
    min: 90,
    warning: 94,
    critical: 85,
  },
  temperature: {
    normal: 37.5,
    fever: 38,
    highFever: 39,
  },
};

export const MQTT_TOPICS = {
  vitals: 'vitaband/vitals',
  explanation: 'vitaband/explanation',
  deviceStatus: 'vitaband/device/status',
};

export const APP_CONFIG = {
  name: 'VitaBand',
  version: '2.0.0',
  tagline: 'Your Personal Health Guardian',
};

export const HISTORY_LENGTH = 20; // Number of data points to keep in history