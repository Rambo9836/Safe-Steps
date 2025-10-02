// app/index.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  Vibration,
  AccessibilityInfo,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [obstacleDetected, setObstacleDetected] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationIntensity, setVibrationIntensity] = useState('medium');
  const [distance, setDistance] = useState(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const alertAnim = useRef(new Animated.Value(1)).current;
  const connectionPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Connection pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(connectionPulse, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(connectionPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (obstacleDetected) {
      // Alert animation when obstacle detected
      Animated.loop(
        Animated.sequence([
          Animated.timing(alertAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(alertAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Trigger vibration if enabled
      if (vibrationEnabled && isConnected) {
        const pattern = vibrationIntensity === 'high' ? [0, 200, 100, 200] : 
                       vibrationIntensity === 'medium' ? [0, 150, 150, 150] : 
                       [0, 100, 200, 100];
        Vibration.vibrate(pattern);
      }

      // Announce to screen reader
      AccessibilityInfo.announceForAccessibility('Warning: Obstacle detected ahead');
    } else {
      alertAnim.stopAnimation();
      alertAnim.setValue(1);
      Vibration.cancel();
    }
  }, [obstacleDetected, vibrationEnabled, vibrationIntensity]);

  // Simulate obstacle detection
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        const random = Math.random();
        setObstacleDetected(random > 0.7);
        setDistance(random > 0.7 ? Math.floor(Math.random() * 100) + 50 : null);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
    AccessibilityInfo.announceForAccessibility(
      isConnected ? 'Device disconnected' : 'Device connected successfully'
    );
  };

  const getVibrationIcon = () => {
    switch(vibrationIntensity) {
      case 'low': return 'vibration';
      case 'medium': return 'vibrate';
      case 'high': return 'vibrate';
      default: return 'vibrate';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View 
            style={[
              styles.header,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <MaterialCommunityIcons
                  name="foot-print"
                  size={40}
                  color="#4fbdba"
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              </View>
              <Text style={styles.appTitle}>Smart Obstacle Belt</Text>
              <Text style={styles.subtitle}>Your Walking Companion</Text>
            </View>
          </Animated.View>

          {/* Connection Status Card */}
          <Animated.View 
            style={[
              styles.connectionCard,
              { 
                opacity: fadeAnim,
                transform: [{ scale: isConnected ? connectionPulse : 1 }]
              }
            ]}
          >
            <LinearGradient
              colors={isConnected ? ['#4fbdba', '#35a7a4'] : ['#533483', '#3c2861']}
              style={styles.connectionGradient}
            >
              <TouchableOpacity 
                onPress={handleConnect}
                style={styles.connectionButton}
                accessible={true}
                accessibilityLabel={`Bluetooth ${isConnected ? 'connected' : 'disconnected'}, tap to ${isConnected ? 'disconnect' : 'connect'}`}
                accessibilityRole="button"
              >
                <Ionicons 
                  name={isConnected ? 'bluetooth-sharp' : 'bluetooth-outline'} 
                  size={40} 
                  color="white" 
                />
                <Text style={styles.connectionText}>
                  {isConnected ? 'Connected' : 'Tap to Connect'}
                </Text>
                <Text style={styles.connectionSubtext}>
                  {isConnected ? 'Smart Belt Active' : 'Press to pair device'}
                </Text>
                <View style={[
                  styles.connectionIndicator,
                  { backgroundColor: isConnected ? '#00ff88' : '#ff4444' }
                ]} />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Main Detection Display */}
          <Animated.View 
            style={[
              styles.detectionContainer,
              { opacity: fadeAnim }
            ]}
          >
            <LinearGradient
              colors={obstacleDetected ? 
                ['rgba(231, 76, 60, 0.1)', 'rgba(192, 57, 43, 0.1)'] : 
                ['rgba(46, 204, 113, 0.1)', 'rgba(39, 174, 96, 0.1)']}
              style={styles.detectionGradient}
            >
              <Animated.View
                style={[
                  styles.detectionCircle,
                  {
                    transform: [{ scale: obstacleDetected ? alertAnim : 1 }],
                    borderColor: obstacleDetected ? '#e74c3c' : '#2ecc71',
                  }
                ]}
                accessible={true}
                accessibilityLabel={obstacleDetected ? 'Obstacle detected' : 'Path is clear'}
              >
                <View style={[
                  styles.innerCircle,
                  { backgroundColor: obstacleDetected ? '#e74c3c' : '#2ecc71' }
                ]}>
                  <Ionicons
                    name={obstacleDetected ? 'warning' : 'checkmark-circle'}
                    size={80}
                    color="white"
                  />
                </View>
              </Animated.View>
              
              <Text style={[
                styles.statusText,
                { color: obstacleDetected ? '#e74c3c' : '#2ecc71' }
              ]}>
                {obstacleDetected ? 'OBSTACLE DETECTED' : 'PATH CLEAR'}
              </Text>
              
              {distance && (
                <Text style={styles.distanceText}>
                  Distance: ~{distance} cm
                </Text>
              )}

              {!isConnected && (
                <Text style={styles.warningText}>
                  Please connect your belt to start detection
                </Text>
              )}
            </LinearGradient>
          </Animated.View>

          {/* Quick Settings */}
          <View style={styles.quickSettings}>
            <Text style={styles.sectionTitle}>Quick Settings</Text>
            
            {/* Vibration Toggle */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setVibrationEnabled(!vibrationEnabled)}
              accessible={true}
              accessibilityLabel={`Vibration ${vibrationEnabled ? 'enabled' : 'disabled'}, tap to toggle`}
              accessibilityRole="switch"
            >
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons 
                  name={getVibrationIcon()} 
                  size={24} 
                  color="#4fbdba" 
                />
                <Text style={styles.settingText}>Vibration Alert</Text>
              </View>
              <View style={[
                styles.toggleSwitch,
                { backgroundColor: vibrationEnabled ? '#4fbdba' : '#666' }
              ]}>
                <View style={[
                  styles.toggleCircle,
                  { transform: [{ translateX: vibrationEnabled ? 20 : 0 }] }
                ]} />
              </View>
            </TouchableOpacity>

            {/* Sound Toggle */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setSoundEnabled(!soundEnabled)}
              accessible={true}
              accessibilityLabel={`Sound ${soundEnabled ? 'enabled' : 'disabled'}, tap to toggle`}
              accessibilityRole="switch"
            >
              <View style={styles.settingLeft}>
                <Ionicons 
                  name={soundEnabled ? 'volume-high' : 'volume-mute'} 
                  size={24} 
                  color="#4fbdba" 
                />
                <Text style={styles.settingText}>Sound Alert</Text>
              </View>
              <View style={[
                styles.toggleSwitch,
                { backgroundColor: soundEnabled ? '#4fbdba' : '#666' }
              ]}>
                <View style={[
                  styles.toggleCircle,
                  { transform: [{ translateX: soundEnabled ? 20 : 0 }] }
                ]} />
              </View>
            </TouchableOpacity>

            {/* Vibration Intensity */}
            <View style={styles.intensityContainer}>
              <Text style={styles.intensityLabel}>Vibration Intensity</Text>
              <View style={styles.intensityButtons}>
                {['low', 'medium', 'high'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.intensityButton,
                      vibrationIntensity === level && styles.intensityButtonActive
                    ]}
                    onPress={() => setVibrationIntensity(level)}
                    accessible={true}
                    accessibilityLabel={`Set vibration to ${level}`}
                    accessibilityRole="button"
                  >
                    <Text style={[
                      styles.intensityButtonText,
                      vibrationIntensity === level && styles.intensityButtonTextActive
                    ]}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/settings')}
              accessible={true}
              accessibilityLabel="Open advanced settings"
              accessibilityRole="button"
            >
              <LinearGradient
                colors={['#533483', '#3c2861']}
                style={styles.actionGradient}
              >
                <Ionicons name="settings" size={24} color="white" />
                <Text style={styles.actionButtonText}>Settings</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              accessible={true}
              accessibilityLabel="Open help and support"
              accessibilityRole="button"
            >
              <LinearGradient
                colors={['#e74c3c', '#c0392b']}
                style={styles.actionGradient}
              >
                <Ionicons name="help-circle" size={24} color="white" />
                <Text style={styles.actionButtonText}>Help</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(79, 189, 186, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4fbdba',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  connectionCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  connectionGradient: {
    borderRadius: 20,
  },
  connectionButton: {
    padding: 25,
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  connectionSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  connectionIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  detectionContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  detectionGradient: {
    padding: 40,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detectionCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    letterSpacing: 1,
  },
  distanceText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#f39c12',
    marginTop: 15,
    textAlign: 'center',
  },
  quickSettings: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  intensityContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  intensityLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
  },
  intensityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  intensityButtonActive: {
    backgroundColor: '#4fbdba',
  },
  intensityButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  intensityButtonTextActive: {
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});