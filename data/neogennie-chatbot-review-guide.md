# NeoGennie Chatbot Q&A Review Guide

Editable Q&A source:

`C:\Users\rskcc\Documents\NeoGennieWebsite\data\neogennie-chatbot-qa.json`

WSL path:

`/mnt/c/Users/rskcc/Documents/NeoGennieWebsite/data/neogennie-chatbot-qa.json`

How to update answers:

1. Open `data/neogennie-chatbot-qa.json`.
2. Update the `answer` field for any Q&A item.
3. Add or adjust `keywords` so the bot can match visitor questions.
4. Keep answers pre-sales oriented and factual.
5. Do not add commitments, guarantees, legal interpretations, compliance claims, contract terms, refund promises, or binding pricing statements.
6. For legal, compliance, privacy, security, contract, policy, regulated-industry, or formal terms questions, keep the answer non-committal and tell the visitor the NeoGennie team should review and respond later if they choose to share details.

Lead capture behavior:

- The bot captures name, email, optional phone, product/business interest, and message only when the visitor clicks “Capture my details.”
- On this static site, it opens an email draft to `info@neogennie.com` with the captured lead details.
- If a backend endpoint is later created, add it to `contact.optionalBackendEndpoint` in the JSON file and the bot can POST leads there first.

Guardrail reminder:

The chatbot is not a legal/compliance/policy advisor and should not make commitments. It should not force lead capture after ordinary answers. It should only invite follow-up when the visitor chooses “Capture my details,” asks to be contacted, or asks a sensitive/commitment-heavy question.
