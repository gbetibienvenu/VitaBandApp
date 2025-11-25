// Health Graph Component - Reusable for multiple metrics
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../utils/constants';

const screenWidth = Dimensions.get('window').width;

interface HealthGraphProps {
  title: string;
  data: number[];
  color: string;
  unit: string;
  icon: string;
  thresholdMin?: number;
  thresholdMax?: number;
}

const HealthGraph: React.FC<HealthGraphProps> = ({
  title,
  data,
  color,
  unit,
  icon,
  thresholdMin,
  thresholdMax,
}) => {
  const validData = data.length > 0 ? data : [0];
  const currentValue = validData[validData.length - 1];
  const previousValue = validData.length > 1 ? validData[validData.length - 2] : currentValue;
  const trend = currentValue > previousValue ? '📈' : currentValue < previousValue ? '📉' : '➡️';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={[styles.currentValue, { color }]}>
            {currentValue.toFixed(1)}
          </Text>
          <Text style={styles.unit}>{unit}</Text>
          <Text style={styles.trend}>{trend}</Text>
        </View>
      </View>

      <LineChart
        data={{
          labels: validData.map((_, i) => (i % 5 === 0 ? `${i + 1}` : '')),
          datasets: [
            {
              data: validData,
              color: (opacity = 1) => color,
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth - 60}
        height={200}
        chartConfig={{
          backgroundColor: COLORS.white,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.gray[50],
          decimalPlaces: 1,
          color: (opacity = 1) => `${color}${Math.round(opacity * 255).toString(16)}`,
          labelColor: (opacity = 1) => COLORS.gray[600],
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: COLORS.gray[200],
            strokeWidth: 1,
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
      />

      {(thresholdMin || thresholdMax) && (
        <View style={styles.thresholdInfo}>
          <Text style={styles.thresholdText}>
            Normal Range: {thresholdMin}-{thresholdMax} {unit}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
  unit: {
    fontSize: 14,
    color: COLORS.gray[500],
    marginRight: 8,
  },
  trend: {
    fontSize: 20,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 10,
  },
  thresholdInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  thresholdText: {
    fontSize: 12,
    color: COLORS.gray[500],
    textAlign: 'center',
  },
});

export default HealthGraph;