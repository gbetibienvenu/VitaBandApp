// Compact Vital Card - For supporting stats
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface CompactVitalCardProps {
  icon: string;
  value: number | string;
  label: string;
  unit: string;
  color: string;
  status?: 'normal' | 'warning' | 'critical';
}

const CompactVitalCard: React.FC<CompactVitalCardProps> = ({
  icon,
  value,
  label,
  unit,
  color,
  status = 'normal',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return COLORS.danger;
      case 'warning':
        return COLORS.warning;
      default:
        return color;
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getStatusColor() }]}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.content}>
        <Text style={[styles.value, { color: getStatusColor() }]}>
          {value}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.gray[500],
  },
  label: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },
});

export default CompactVitalCard;