// Vital Card Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface VitalCardProps {
  icon: string;
  value: number | string;
  label: string;
  unit: string;
  color: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ icon, value, label, unit, color }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 5,
  },
  icon: {
    fontSize: 36,
    marginBottom: 12,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: COLORS.gray[500],
    fontWeight: '600',
  },
  unit: {
    fontSize: 11,
    color: COLORS.gray[400],
    marginTop: 2,
  },
});
export default VitalCard;