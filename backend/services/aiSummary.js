import path from 'path';
import axios from 'axios';

const TYPE_DESCRIPTIONS = {
  entry: 'Entry point that bootstraps or coordinates the application.',
  business: 'Core business logic implementing the main application features.',
  utility: 'Shared utility, helper, configuration, or type definition.',
  external: 'Integration with an external service, database, or API.',
};

export async function generateSummaries(nodes, fileContents, openaiKey) {
  if (openaiKey) {
    return generateAISummaries(nodes, fileContents, openaiKey);
  }
  return generateRuleBasedSummaries(nodes, fileContents);
}

function generateRuleBasedSummaries(nodes, fileContents) {
  for (const node of nodes) {
    const content = fileContents.get(node.id) || '';
    node.summary = buildRuleBasedSummary(node, content);
  }
  return nodes;
}

function buildRuleBasedSummary(node, content) {
  const base = path.basename(node.id, path.extname(node.id));
  const type = node.type;
  const depCount = node.resolvedDeps.length;
  const dependentCount = node.dependents.length;
  const loc = node.loc;

  let summary = `**${base}** is a ${type} file (${loc} lines). `;
  summary += TYPE_DESCRIPTIONS[type] + ' ';

  if (dependentCount > 0) {
    summary += `It is imported by ${dependentCount} other file${dependentCount > 1 ? 's' : ''}, making it ${node.impactScore > 0.5 ? 'a high-impact' : 'a shared'} module. `;
  }
  if (depCount > 0) {
    summary += `It depends on ${depCount} internal module${depCount > 1 ? 's' : ''}. `;
  }

  // Content-based hints
  const lower = content.toLowerCase();
  const hints = [];
  if (/router|route|endpoint|controller/.test(lower)) hints.push('defines routes or API endpoints');
  if (/auth|jwt|token|session|passport|login/.test(lower)) hints.push('handles authentication');
  if (/database|db\.|query|model|schema|migration|orm/.test(lower)) hints.push('interacts with a database');
  if (/render|component|jsx|template|view/.test(lower)) hints.push('renders UI components');
  if (/test|describe|it\(|expect|assert/.test(lower)) hints.push('contains automated tests');
  if (/middleware|next\(|pipeline/.test(lower)) hints.push('implements middleware');
  if (/socket|websocket|ws\.|emit|on\(/.test(lower)) hints.push('manages real-time communication');
  if (/cron|schedule|job|queue|worker/.test(lower)) hints.push('handles background jobs or scheduling');

  if (hints.length > 0) summary += `It ${hints.join(' and ')}.`;

  return summary.trim();
}

async function generateAISummaries(nodes, fileContents, openaiKey) {
  const BATCH = 5;
  for (let i = 0; i < nodes.length; i += BATCH) {
    const batch = nodes.slice(i, i + BATCH);
    await Promise.all(batch.map(async node => {
      const content = (fileContents.get(node.id) || '').slice(0, 1500);
      try {
        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini',
          max_tokens: 120,
          messages: [
            { role: 'system', content: 'You are a senior software engineer. In 2-3 sentences, explain what this file does in plain English for a new developer. Be concrete and specific.' },
            { role: 'user', content: `File: ${node.id}\nType: ${node.type}\nCode:\n${content}` },
          ],
        }, { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' } });
        node.summary = res.data.choices[0].message.content.trim();
      } catch {
        node.summary = buildRuleBasedSummary(node, fileContents.get(node.id) || '');
      }
    }));
    await new Promise(r => setTimeout(r, 200));
  }
  return nodes;
}
