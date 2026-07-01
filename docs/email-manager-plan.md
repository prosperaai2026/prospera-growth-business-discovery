# PROSPERA GROWTH Email Manager Plan

## 1. Purpose of the Module

The PROSPERA GROWTH Email Manager will help organize incoming business email so
leads, clients, proposals, invoices, receipts, estimates, payments, and low
priority messages can be reviewed quickly and safely.

The module is intended to support the Business Growth System by making email a
structured operational channel instead of an unorganized inbox. It should help
PROSPERA GROWTH identify new opportunities, protect active client
communication, and prepare email data for future CRM, dashboard, and workflow
integrations.

The module must prioritize safety. It should label, organize, and prepare emails
for review before taking any destructive action.

## 2. Recommended Architecture

Recommended architecture:

```text
Gmail Inbox
  -> Gmail API Reader
  -> Email Classification Layer
  -> Safety / Confidence Rules
  -> Gmail Label Manager
  -> Review Queue
  -> Future Integrations
```

Core components:

- Gmail API Reader: reads new messages, headers, sender, subject, body snippets,
  timestamps, and attachments metadata.
- Email Classification Layer: determines whether a message is a new lead,
  active client communication, estimate, invoice, proposal, receipt, payment,
  marketing, spam, or low priority.
- Client Identity Resolver: attempts to identify the client name and business
  name from the sender, subject, FormSubmit fields, known CRM records, and prior
  Gmail labels.
- Gmail Label Manager: applies safe labels without deleting messages.
- Review Queue: stores emails that need human confirmation before moving,
  archiving, or marking as low priority.
- Audit Log: records classification decisions, confidence levels, applied labels,
  and any manual review outcome.

Recommended implementation style:

- Start with a rule-based MVP.
- Add AI-assisted classification only after enough examples exist.
- Keep all destructive actions disabled until a clear review process is proven.
- Store configuration for labels, client names, trusted senders, and thresholds
  outside source code.

## 3. Gmail Label Structure

Recommended Gmail labels:

```text
PROSPERA
PROSPERA / New Leads
PROSPERA / Active Clients
PROSPERA / Waiting Response
PROSPERA / Estimates
PROSPERA / Invoices
PROSPERA / Proposals
PROSPERA / Receipts
PROSPERA / Payments
PROSPERA / Marketing
PROSPERA / Spam / Low Priority
PROSPERA / Review Needed
PROSPERA / Clients
PROSPERA / Clients / Jordan
PROSPERA / Clients / Jonathan
```

Client labels should follow this pattern:

```text
PROSPERA / Clients / ClientFirstName
```

If multiple clients share the same first name, use:

```text
PROSPERA / Clients / ClientFirstName LastInitial
```

Examples:

```text
PROSPERA / Clients / Jordan
PROSPERA / Clients / Jonathan
PROSPERA / Clients / Jordan C
```

## 4. Email Classification Rules

### Business Growth Assessment Submissions

Classify as `PROSPERA / New Leads` when the email appears to be a FormSubmit
Business Growth Assessment submission.

Signals:

- Sender or reply path indicates FormSubmit.
- Subject contains business assessment, discovery form, form submission, or new
  submission.
- Body includes fields such as Full Name, Business Name, Phone Number, Email, or
  Service Area.
- Body includes PROSPERA GROWTH DEVELOPER or Business Growth Assessment.

Actions:

- Apply `PROSPERA / New Leads`.
- Apply `PROSPERA / Review Needed` if client identity is unclear.
- Extract possible full name and business name for future CRM matching.

### Active Clients

Classify as `PROSPERA / Active Clients` when the sender or content matches an
existing client.

Signals:

- Sender email is associated with an existing client record.
- Subject or body mentions known client business name.
- Prior email thread already has a client-specific label.

Actions:

- Apply `PROSPERA / Active Clients`.
- Apply the client-specific label, such as `PROSPERA / Clients / Jordan`.

### Waiting Response

Classify as `PROSPERA / Waiting Response` when an email requires a reply or
follow-up.

Signals:

- Message contains questions, requests, decisions, approvals, missing
  information, or scheduling language.
- Message is from an active client or qualified lead.
- No reply has been sent after a defined time window.

Actions:

- Apply `PROSPERA / Waiting Response`.
- Do not archive automatically in the MVP.

### Estimates

Classify as `PROSPERA / Estimates` when the message refers to estimates, quotes,
pricing, scope, or service cost.

Signals:

- Subject/body contains estimate, quote, pricing, cost, scope, or proposal
  request.
- Attachment filename includes estimate or quote.

### Invoices

Classify as `PROSPERA / Invoices` when the message contains invoice-related
content.

Signals:

- Subject/body contains invoice, amount due, bill, payment due, or balance.
- Attachment filename includes invoice.

### Proposals

Classify as `PROSPERA / Proposals` when the message includes a business proposal
or service agreement.

Signals:

- Subject/body contains proposal, agreement, statement of work, service plan, or
  approval.
- Attachment filename includes proposal.

### Receipts

Classify as `PROSPERA / Receipts` when the message confirms a purchase or
payment.

Signals:

- Subject/body contains receipt, paid, payment received, transaction, or
  confirmation.
- Sender is a known payment processor, bank, vendor, or SaaS platform.

### Payments

Classify as `PROSPERA / Payments` when the message relates to money movement,
failed payments, successful payments, deposits, subscriptions, or payment links.

Signals:

- Subject/body contains payment, deposit, subscription, refund, failed payment,
  charge, transfer, payout, or payment link.

### Marketing

Classify as `PROSPERA / Marketing` when the message is promotional but not
dangerous.

Signals:

- Newsletter language.
- Bulk sender patterns.
- Promotional offers.
- Unsubscribe footer.
- Non-client sender.

Actions:

- Apply `PROSPERA / Marketing`.
- Do not delete automatically.

### Spam / Low Priority

Classify as `PROSPERA / Spam / Low Priority` only when confidence is high.

Signals:

- Repeated unsolicited promotions.
- Suspicious sender domain.
- Obvious phishing language.
- No relationship to PROSPERA GROWTH, clients, invoices, payments, or services.

Actions:

- Apply `PROSPERA / Spam / Low Priority`.
- Do not move to Gmail Spam in the MVP.
- Add `PROSPERA / Review Needed` if any uncertainty exists.

## 5. Safety Rules

Mandatory safety rules:

- Never delete emails automatically.
- Never permanently remove labels automatically.
- Never move important emails to Spam unless confidence is extremely high.
- Never mark messages as read in the MVP.
- Never auto-reply to clients or leads in the MVP.
- Never send data to external tools unless the integration is explicitly
  approved.
- Always keep a review workflow before destructive or irreversible actions.
- Always log every label action.
- Use conservative confidence thresholds.
- If the message has invoices, payments, proposals, client names, or lead data,
  prefer `Review Needed` over low priority.

Recommended confidence levels:

- 90-100: safe to label automatically.
- 70-89: label plus `Review Needed`.
- Below 70: do not label except `Review Needed`.

## 6. MVP Version

The MVP should be safe, simple, and useful.

MVP features:

- Connect to Gmail API with read and label permissions only.
- Detect new FormSubmit Business Growth Assessment submissions.
- Apply `PROSPERA / New Leads`.
- Detect basic client names and business names from email body.
- Apply known client-specific labels.
- Create missing Gmail labels if approved in setup.
- Classify obvious invoices, estimates, proposals, receipts, payments, and
  marketing emails.
- Apply `PROSPERA / Review Needed` when confidence is not high.
- Maintain an audit log.
- Produce a daily or weekly review summary.

MVP exclusions:

- No email deletion.
- No auto-replies.
- No Gmail Spam moves.
- No automatic CRM writes unless separately approved.
- No automatic WhatsApp notifications unless separately approved.

## 7. Future Advanced Version

Future advanced capabilities:

- AI-assisted email classification with explainable confidence scores.
- Automatic Google Sheets CRM updates.
- Automatic Google Drive client folder matching.
- n8n workflows for routing, review queues, and notifications.
- WhatsApp notifications for high-priority leads and client messages.
- Growth Dashboard inbox analytics.
- SLA tracking for unanswered leads.
- Client timeline view across Gmail, forms, files, reports, and WhatsApp.
- Attachment classification for PDFs, invoices, receipts, proposals, and signed
  documents.
- Duplicate lead detection.
- Lead source tracking from forms and campaigns.
- Weekly email intelligence report.

## 8. Required APIs or Services

Likely required services:

- Gmail API for reading messages and applying labels.
- Google OAuth for secure authorization.
- Google Sheets API for future CRM integration.
- Google Drive API for future client folder integration.
- n8n for future workflow orchestration.
- WhatsApp provider or existing WhatsApp workflow for future notifications.
- Growth Dashboard backend for future reporting and analytics.

Recommended Gmail API scopes for MVP:

```text
https://www.googleapis.com/auth/gmail.readonly
https://www.googleapis.com/auth/gmail.labels
```

If message modification is needed later:

```text
https://www.googleapis.com/auth/gmail.modify
```

The MVP should avoid broader scopes until necessary.

## 9. Security Considerations

Security requirements:

- Use OAuth, not stored Gmail passwords.
- Store tokens securely outside source control.
- Never commit credentials, refresh tokens, OAuth secrets, or webhook secrets.
- Limit Gmail scopes to the minimum required permissions.
- Maintain an audit log of every automated action.
- Encrypt sensitive configuration where possible.
- Separate production and development credentials.
- Avoid sending email bodies to third-party services unless explicitly approved.
- Redact private client data in logs where possible.
- Require manual approval for destructive actions.
- Review Google API quota and access policies before production launch.

Data privacy expectations:

- Client emails may contain sensitive business, payment, and personal
  information.
- Any dashboard or workflow should show only the minimum data needed for the
  task.
- Access should be limited to authorized PROSPERA GROWTH operators.

## 10. Step-by-Step Implementation Roadmap

### Step 1: Define Labels and Rules

- Finalize Gmail label structure.
- Define client naming conventions.
- Define confidence thresholds.
- Define review workflow.

### Step 2: Build Local Prototype

- Create a local script or service that reads test email samples.
- Classify samples without connecting to Gmail.
- Validate classification rules against real examples copied manually.

### Step 3: Add Gmail API Read Access

- Configure Google Cloud project.
- Enable Gmail API.
- Create OAuth credentials.
- Authenticate with read-only and label permissions.
- Read new messages without modifying them.

### Step 4: Add Label Creation and Label Application

- Create required PROSPERA labels.
- Apply labels to safe test emails.
- Log every action.

### Step 5: Add Review Queue

- Store uncertain messages in a review list.
- Add `PROSPERA / Review Needed`.
- Create a manual review checklist.

### Step 6: Add FormSubmit Detection

- Detect Business Growth Assessment emails.
- Extract full name, business name, phone number, email, and service area when
  available.
- Prepare extracted data for future CRM integration.

### Step 7: Add Client-Specific Routing

- Match known clients.
- Apply client-specific labels.
- Avoid creating new client labels automatically until reviewed.

### Step 8: Prepare Integrations

- Design Google Sheets CRM mapping.
- Design Google Drive client folder matching.
- Design n8n workflow entry points.
- Design WhatsApp notification triggers.
- Design Growth Dashboard data model.

### Step 9: Pilot Safely

- Run on a limited inbox window.
- Review audit logs daily.
- Adjust rules.
- Keep destructive actions disabled.

### Step 10: Productionize

- Add monitoring.
- Add error alerts.
- Add backup/export for audit logs.
- Document operating procedures.

## 11. What Should NOT Be Automated Yet

Do not automate these actions in the MVP:

- Deleting emails.
- Moving emails to Gmail Spam.
- Marking emails as read.
- Sending replies.
- Sending WhatsApp notifications.
- Creating client folders in Google Drive.
- Updating the CRM automatically.
- Creating invoices or proposals.
- Charging payments.
- Labeling emails as low priority when confidence is not extremely high.
- Taking action on attachments without review.
- Creating new client-specific labels without review.

## 12. Recommended Next Action

Recommended next action:

Create a sample email classification matrix before connecting to Gmail.

The matrix should include examples for:

- FormSubmit Business Growth Assessment submission.
- New lead email.
- Active client email.
- Waiting response email.
- Estimate.
- Invoice.
- Proposal.
- Receipt.
- Payment.
- Marketing email.
- Spam or low priority email.

Once the sample matrix is approved, the next technical step should be a local
prototype that classifies saved sample emails without connecting to Gmail.
