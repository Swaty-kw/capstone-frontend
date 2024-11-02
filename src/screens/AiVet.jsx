import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RobotIcon from "../components/RobotIcon";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../api/config";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hello! I'm Dr. PawAI, your virtual veterinary assistant. How can I help you and your pet today?",
  },
];

// Pre-defined responses for common pet questions
const AI_RESPONSES = {
  default:
    "I understand your concern. Could you tell me more about what you're observing with your pet?",
  symptoms:
    "Based on these symptoms, I recommend monitoring your pet closely. If symptoms persist for more than 24 hours, please consult with a veterinarian.",
  emergency:
    "This sounds like it could be serious. Please contact your veterinarian or emergency animal hospital immediately.",
  diet: "A balanced diet is crucial for your pet's health. Make sure to provide fresh water daily and follow feeding guidelines based on your pet's age, size, and activity level.",
  exercise:
    "Regular exercise is important for your pet's physical and mental health. The amount needed varies by breed, age, and health condition.",
  grooming:
    "Regular grooming helps maintain your pet's health and can help you spot any unusual changes early.",
  vaccination:
    "Keeping your pet's vaccinations up to date is crucial for their health. Check with your vet for the recommended vaccination schedule.",
};

const getAIResponse = (userMessage) => {
  const message = userMessage.toLowerCase();

  if (
    message.includes("emergency") ||
    message.includes("bleeding") ||
    message.includes("vomiting") ||
    message.includes("breathing")
  ) {
    return AI_RESPONSES.emergency;
  }

  if (
    message.includes("eat") ||
    message.includes("food") ||
    message.includes("feeding") ||
    message.includes("diet")
  ) {
    return AI_RESPONSES.diet;
  }

  if (
    message.includes("exercise") ||
    message.includes("walk") ||
    message.includes("playing") ||
    message.includes("active")
  ) {
    return AI_RESPONSES.exercise;
  }

  if (
    message.includes("groom") ||
    message.includes("bath") ||
    message.includes("brush") ||
    message.includes("nail")
  ) {
    return AI_RESPONSES.grooming;
  }

  if (
    message.includes("vaccine") ||
    message.includes("shot") ||
    message.includes("vaccination")
  ) {
    return AI_RESPONSES.vaccination;
  }

  if (
    message.includes("sick") ||
    message.includes("pain") ||
    message.includes("hurt") ||
    message.includes("symptoms")
  ) {
    return AI_RESPONSES.symptoms;
  }

  return AI_RESPONSES.default;
};

const AiVet = ({ visible, onClose }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    try {
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Dr. PawAI, a friendly and knowledgeable veterinary AI assistant. Keep responses concise and clear. If you detect a potentially serious condition, always recommend consulting a real veterinarian.",
          },
          ...messages.filter((m) => m.role !== "system"),
          userMessage,
        ],
        temperature: 0.7,
        max_tokens: 150,
      });

      const aiResponse = {
        role: "assistant",
        content: completion.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      Alert.alert(
        "Connection Error",
        "Unable to connect to AI service. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarContainer}>
                <RobotIcon size={32} color="#64C5B7" />
              </View>
              <View>
                <Text style={styles.title}>Dr. PawAI</Text>
                <Text style={styles.subtitle}>
                  Virtual Veterinary Assistant
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#91ACBF" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.messagesContainer}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
          >
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  message.role === "user"
                    ? styles.userMessage
                    : styles.aiMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.role === "user" && styles.userMessageText,
                  ]}
                >
                  {message.content}
                </Text>
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#64C5B7" />
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Describe your pet's condition..."
              multiline
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                isLoading && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={isLoading}
            >
              <Ionicons
                name="send"
                size={24}
                color={isLoading ? "#91ACBF" : "#64C5B7"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF1",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  message: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#64C5B7",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#436B9B",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EEF1",
  },
  input: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
    color: "#436B9B",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
    justifyContent: "center",
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
});

export default AiVet;
