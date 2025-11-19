import { useState, useCallback } from "react";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

interface UseVoiceRecordingReturn {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  transcribedText: string;
}

// Note: This is a simplified implementation
// For real speech-to-text, you'll need to integrate a service like Google Cloud Speech-to-Text
// or use Expo's Speech Recognition when available
export const useVoiceRecording = (): UseVoiceRecordingReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState("");

  const startRecording = useCallback(async () => {
    try {
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access microphone denied");
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!recording) return null;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      // TODO: Implement actual speech-to-text here
      // For now, this is a placeholder
      // You would send the audio file to a transcription service
      // For example: Google Cloud Speech-to-Text, Assembly.ai, or Whisper API

      console.log("Recording saved at:", uri);

      // Placeholder: Return null since we don't have actual transcription yet
      // In production, you'd send the audio file to your backend or a transcription service
      return null;
    } catch (error) {
      console.error("Failed to stop recording:", error);
      return null;
    }
  }, [recording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    transcribedText,
  };
};

// Alternative: Voice Input using Web Speech API (for Expo Web)
// This won't work on native mobile, but can be used as a fallback for web builds
export const useWebSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // This would only work in web environment
  // For native apps, use a native speech recognition library or API service

  return {
    isListening,
    transcript,
    startListening: () => console.log("Web speech not available in native"),
    stopListening: () => console.log("Web speech not available in native"),
  };
};
