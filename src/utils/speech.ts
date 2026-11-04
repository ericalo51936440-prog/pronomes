/**
 * Web Speech API text-to-speech utility configured for European Portuguese (pt-PT).
 * Greatly assists 5th grade students who struggle with reading or dyslexia.
 */

let isSpeaking = false;

export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // If already speaking the same or another text, cancel first
  window.speechSynthesis.cancel();

  // Strip markdown or excessive punctuation for natural reading
  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/→/g, 'passa para')
    .replace(/\+/g, 'mais')
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'pt-PT';
  utterance.rate = 0.92; // Slightly calmer speed for children
  utterance.pitch = 1.05; // Friendly pitch

  // Try to find a Portuguese voice (pt-PT preferred, fallback pt-BR or default)
  const voices = window.speechSynthesis.getVoices();
  const ptPtVoice = voices.find(v => v.lang === 'pt-PT' || v.lang.startsWith('pt_PT'));
  const ptVoice = ptPtVoice || voices.find(v => v.lang.startsWith('pt'));
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  utterance.onstart = () => {
    isSpeaking = true;
  };

  utterance.onend = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
}

export function getIsSpeaking() {
  return isSpeaking;
}
