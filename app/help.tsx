import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: 'How do I pair my Smart Belt?',
    answer: 'Pairing your Smart Belt is simple. First, ensure your belt is charged and turned on. Then, open the Smart Obstacle Belt app on your phone. On the home screen, you will see a "Tap to Connect" button. Tap it, and the app will automatically search for and connect to your belt via Bluetooth.'
  },
  {
    question: 'What do the different vibration patterns mean?',
    answer: 'The vibration patterns indicate the proximity of a detected obstacle. You can set the intensity in the app:\n\n• Low: A single, gentle buzz, indicating a distant object.\n• Medium: A steady, repeating pulse, indicating an object is getting closer.\n• High: A strong, urgent series of pulses, warning you of a very close obstacle. \n\nYou can adjust these settings on the home screen to your preference.'
  },
  {
    question: 'How do I charge the device?',
    answer: 'To charge your Smart Belt, connect the provided USB-C cable to the charging port on the belt\'s main unit. Connect the other end to any standard USB power adapter. A red light indicates that the device is charging, and it will turn green when fully charged. A full charge typically takes about 2 hours.'
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFaq(index)} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Ionicons
                name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
            {expandedFaq === index && (
              <View style={styles.faqAnswerContainer}>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={24} color="#4fbdba" />
          <Text style={styles.contactText}>pritam.pramanik@stud.th-deg.de</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={24} color="#4fbdba" />
          <Text style={styles.contactText}>+49 15218934169</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#16213e',
    },
    backButton: {
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        marginTop: 10,
    },
    faqContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginBottom: 10,
        overflow: 'hidden',
    },
    faqItem: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 16,
        color: 'white',
        flex: 1,
        marginRight: 10,
    },
    faqAnswerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    faqAnswer: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 12,
        marginBottom: 10,
    },
    contactText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 15,
    },
});