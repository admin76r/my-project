# ACCA Diagnostic Center — Software Requirements Specification (MVP)

## Purpose
Web-based Diagnostic Center Management system for patient registration, sample management, test results, billing, reports and user roles.

## Users / Personas
- Admin
- Receptionist
- Lab Technician
- Doctor / Verifier
- Accountant
- Patient (portal)

## Scope (MVP)
- Patient registration & search
- Visit/sample registration (barcode)
- Test catalog & pricing
- Result entry & verification (technician → verifier)
- PDF report generation with doctor signature and QR/verification code
- Billing & receipts (cash/credit/insurance minimal)
- Appointments
- User management & RBAC (Admin manages roles)
- SMS/Email notifications
- Audit log
- Localization: English + Hindi

## Functional Requirements (selected)
FR-1: Create / update / search patient.
FR-2: Create visit or sample record for patient, assign sample barcode.
FR-3: Add tests to a sample (single or panel).
FR-4: Enter results per test; technician saves draft; verifier signs/publishes.
FR-5: Generate PDF report with patient info, tests, results, reference ranges, doctor signature, QR/verification code.
FR-6: Create invoice, record payments, print receipt.
FR-7: Appointment create/update by receptionist and patient portal.
FR-8: Audit logs for critical operations (who/when/old->new).
FR-9: SMS/Email when report is ready or appointment reminders.

## Non-Functional
- Responsive web UI (desktop + tablet)
- PostgreSQL DB, REST API with JWT auth, role-based access
- Dockerized services; backup policy; basic monitoring
- Performance: handle 1000 samples/day for single center initially
- Security: HTTPS, password hashing, RBAC, DB-level access control
- Retention & export: CSV/Excel export, scheduled DB backups

## Data Retention & Compliance
- Retain reports per local regulation; allow admin configuration
- Encrypt PII at rest if required; use TLS in transit
- Audit trails and role-based access control

## Acceptance Criteria (example)
- Receptionist can register new patient and print barcode label.
- Lab technician can view assigned pending samples and save results.
- Doctor/verifier can approve results and the system sends SMS to patient with report link.
- Generated PDF matches clinic header and contains verification QR.

## Phase 2 / Future
- Instrument integrations (HL7/ASTM)
- Inventory & reagent management
- Multi-center & consolidation reports
- Mobile offline collector app

## Timeline (estimate)
- Detailed SRS & ER diagram: 3 days (done)
- UI mockups & API spec: 3–5 days (done: basic)
- Seed project scaffold: 1–2 days (done)
- Full MVP dev & QA: 6–10 weeks (team dependent)
