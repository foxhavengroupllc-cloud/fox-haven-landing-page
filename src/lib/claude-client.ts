import Anthropic from '@anthropic-ai/sdk';
import type { IntentResponse, IntentClassification, Action } from './intent-types';
import { getInitiativeContext } from './intent-config';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are the Fox Haven Group assistant — warm, knowledgeable, and focused on community wellbeing.

Fox Haven Group is a Phoenix-based company building technology and infrastructure to protect lives and empower families. Their initiatives:

${getInitiativeContext()}

Your role:
1. Help visitors understand Fox Haven's initiatives and how to get involved
2. Provide accurate heat safety guidance for Phoenix residents
3. Connect people with the right resources
4. IMMEDIATELY prioritize life-threatening emergencies

CRITICAL: If someone is experiencing a heat emergency, provide 911 guidance FIRST.

Respond ONLY with this exact XML structure (no other text):
<classification>one of: emergency | shelter-info | app-info | family-hub-info | get-involved | general</classification>
<response>Your conversational response (2-4 sentences, warm and direct, no jargon)</response>
<actions>
  <action label="Find cooling centers" scrollTo="#initiatives" />
</actions>

Rules:
- Keep responses to 2-4 sentences max
- Use scrollTo="#initiatives" for general initiative questions, "#cta" for sign-up/join, "#mission" for about/values
- For cooling center / "find cooling" / heat shelter / heat relief app questions: use href="/initiatives/heat-relief-app?phase=3" with label "Find cooling centers" — this opens the live map with location filters
- For Balm / Family Control Center questions: use href="https://balm-puyebvbqba-uc.a.run.app/signup" with label "Try Balm free" — it is live and free
- For emergencies: classify as "emergency" and tell them to call 911 immediately
- Be warm but not sycophantic — don't say "Great question!"
- Provide 1-3 action chips maximum`;

function parseXmlResponse(xml: string): {
  classification: IntentClassification;
  response: string;
  actions: Action[];
} {
  const classification =
    (xml
      .match(/<classification>([\s\S]*?)<\/classification>/)?.[1]
      ?.trim() as IntentClassification) ?? 'general';

  const response =
    xml
      .match(/<response>([\s\S]*?)<\/response>/)?.[1]
      ?.trim() ??
    "I'd be happy to help you learn more about Fox Haven Group.";

  const actions: Action[] = [];
  const actionsBlock = xml.match(/<actions>([\s\S]*?)<\/actions>/)?.[1] ?? '';
  const actionMatches = actionsBlock.matchAll(/<action\s+([^/\n>]+)\s*\/>/g);

  for (const match of actionMatches) {
    const attrs = match[1];
    const label = attrs.match(/label="([^"]+)"/)?.[1];
    const scrollTo = attrs.match(/scrollTo="([^"]+)"/)?.[1];
    const href = attrs.match(/href="([^"]+)"/)?.[1];
    if (label) {
      actions.push({ label, ...(scrollTo ? { scrollTo } : {}), ...(href ? { href } : {}) });
    }
  }

  return { classification, response, actions };
}

// ── Deterministic intent shortcuts ────────────────────────────────────────────
// These bypass the LLM for high-confidence, well-defined intents so they work
// instantly and without an API key (e.g., in dev or if the API is unavailable).

const COOLING_CENTER_PATTERNS =
  /cooling\s*center|find\s*cool|heat\s*shelter|heat\s*relief\s*app|cool\s*near|cooling\s*map|cooling\s*location/i;

function tryDeterministicResponse(message: string): IntentResponse | null {
  if (COOLING_CENTER_PATTERNS.test(message)) {
    return {
      classification: 'app-info',
      response:
        'The Heat Relief App maps every open cooling center near you in real time. You can filter by accessibility, capacity, and hours — and get walking directions that work offline.',
      actions: [
        { label: 'Find cooling centers', href: '/initiatives/heat-relief-app?phase=3' },
        { label: 'Join the beta', scrollTo: '#cta' },
      ],
    };
  }
  return null;
}

export async function classifyAndRespond(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  isEmergencyFastPath: boolean
): Promise<IntentResponse> {
  // Fast-path: return deterministic response for well-known intents
  const deterministic = tryDeterministicResponse(userMessage);
  if (deterministic) return deterministic;
  const messages: Anthropic.MessageParam[] = [
    ...conversationHistory.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];

  try {
    const apiResponse = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: isEmergencyFastPath ? 300 : 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const textBlock = apiResponse.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text content in response');
    }

    const parsed = parseXmlResponse(textBlock.text);
    return {
      classification: parsed.classification,
      response: parsed.response,
      actions: parsed.actions,
    };
  } catch (error) {
    console.error('Claude API error:', error);
    return {
      classification: 'general',
      response:
        "Thanks for reaching out! You can learn more about our initiatives below, or get in touch directly — we'd love to hear from you.",
      actions: [
        { label: 'See initiatives', scrollTo: '#initiatives' },
        { label: 'Get in touch', scrollTo: '#cta' },
      ],
    };
  }
}
