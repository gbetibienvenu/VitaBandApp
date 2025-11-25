// About Project Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, APP_CONFIG } from '../utils/constants';

const AboutProjectScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏥</Text>
        <Text style={styles.headerTitle}>VitaBand Project</Text>
        <Text style={styles.headerSubtitle}>Healthcare Innovation Hackathon</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Project Overview</Text>
        <Text style={styles.text}>
          VitaBand is an innovative healthcare monitoring solution developed for the 
          [Hackathon Name] to address critical challenges in remote patient monitoring 
          and early disease detection.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 The Problem</Text>
        <Text style={styles.text}>
          Many patients, especially in remote areas, lack access to continuous health 
          monitoring. Critical health changes often go undetected until it's too late, 
          leading to preventable complications and emergency situations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Our Solution</Text>
        <Text style={styles.text}>
          VitaBand combines IoT sensor technology with AI-powered edge computing to 
          provide real-time health monitoring. Using a Raspberry Pi as the edge device, 
          we process vital signs locally and provide instant insights without requiring 
          constant cloud connectivity.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Technology Stack</Text>
        <View style={styles.techList}>
          <Text style={styles.techItem}>🔹 Raspberry Pi - Edge Computing</Text>
          <Text style={styles.techItem}>🔹 AI/ML Models - Real-time Analysis</Text>
          <Text style={styles.techItem}>🔹 IoT Sensors - Health Monitoring</Text>
          <Text style={styles.techItem}>🔹 MQTT Protocol - Data Transmission</Text>
          <Text style={styles.techItem}>🔹 React Native - Mobile Interface</Text>
          <Text style={styles.techItem}>🔹 TypeScript - Type-safe Development</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎓 Hackathon Details</Text>
        <Text style={styles.text}>
          This project was developed as part of the healthcare innovation challenge, 
          focusing on accessible and affordable health monitoring solutions for 
          underserved communities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Key Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>✅ Real-time vital signs monitoring</Text>
          <Text style={styles.featureItem}>✅ AI-powered health insights</Text>
          <Text style={styles.featureItem}>✅ Automatic emergency detection</Text>
          <Text style={styles.featureItem}>✅ Offline-capable edge computing</Text>
          <Text style={styles.featureItem}>✅ Privacy-focused local processing</Text>
          <Text style={styles.featureItem}>✅ Cost-effective hardware solution</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Impact</Text>
        <Text style={styles.text}>
          VitaBand aims to democratize healthcare monitoring by making professional-grade 
          health tracking accessible to everyone, regardless of location or economic status. 
          Our solution can potentially save lives through early detection and continuous 
          monitoring.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💚 Built with passion for better healthcare
        </Text>
        <Text style={styles.footerVersion}>Version {APP_CONFIG.version}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#e0f2fe',
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.gray[700],
  },
  techList: {
    marginTop: 8,
  },
  techItem: {
    fontSize: 15,
    lineHeight: 28,
    color: COLORS.gray[700],
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 15,
    lineHeight: 28,
    color: COLORS.gray[700],
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.gray[600],
    marginBottom: 8,
  },
  footerVersion: {
    fontSize: 12,
    color: COLORS.gray[400],
  },
});

export default AboutProjectScreen;