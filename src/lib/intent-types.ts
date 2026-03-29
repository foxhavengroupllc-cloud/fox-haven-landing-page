export type IntentClassification =
  | 'emergency'
  | 'shelter-info'
  | 'app-info'
  | 'family-hub-info'
  | 'get-involved'
  | 'general';

export type Initiative = 'heat-relief-shelters' | 'heat-relief-app' | 'family-hub';

export interface Action {
  label: string;
  href?: string;
  scrollTo?: string;
}

export interface IntentResponse {
  classification: IntentClassification;
  response: string;
  actions: Action[];
  initiative?: Initiative;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: Action[];
  classification?: IntentClassification;
  timestamp: Date;
}

export interface WidgetState {
  isOpen: boolean;
  isEmergency: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
