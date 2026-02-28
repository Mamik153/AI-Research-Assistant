// Web Speech API type definitions
// See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

export interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    onstart: () => void;
}

export interface SpeechRecognitionEvent {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent {
    error: string;
    message: string;
}

export interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

export interface WindowWithSpeechRecognition extends Window {
    SpeechRecognition?: {
        new(): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
        new(): SpeechRecognition;
    };
}
