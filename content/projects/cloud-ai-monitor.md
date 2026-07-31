---
title: "Cloud AI Monitor"
date: 2026-07-15
description: "AI-powered hybrid cloud monitoring platform with autonomous anomaly detection and remediation across OpenShift and OpenStack."
tags: ["Python", "React", "FastAPI", "OpenShift", "OpenStack", "AIOps"]
icon: "☁️"
filetype: "py"
github: ""
hw_specs:
  - { key: "Frontend",      value: "React 18 / TypeScript / Vite" }
  - { key: "Backend",       value: "FastAPI / SQLAlchemy" }
  - { key: "Database",      value: "PostgreSQL 15" }
  - { key: "AI Engine",     value: "Custom anomaly vector model" }
  - { key: "Prediction",    value: "Linear regression forecasting" }
  - { key: "Deployment",    value: "OpenShift (Red Hat Sandbox)" }
  - { key: "CI/CD",         value: "GitHub Actions → GHCR" }
  - { key: "Monitoring",    value: "OpenShift + OpenStack + Grafana" }
  - { key: "Company",       value: "CIRES Technologies, Tanger Med" }
  - { key: "Team",          value: "2 engineers + supervisor" }
---

## Overview

Cloud AI Monitor is a production-grade AIOps platform built during an internship at CIRES Technologies (Tanger Med). It monitors hybrid cloud infrastructure across OpenShift and OpenStack, detects anomalies using a custom mathematical AI model, predicts resource exhaustion, and executes autonomous remediation — all without human intervention.

## Architecture

```
[OpenShift Connector] ──┐
[OpenStack Connector] ──┼──► [PostgreSQL] ──► [AI Decision Engine] ──► [Remediation Engine]
[Grafana Connector]  ───┘                           │
                                                    ▼
                                        [React Dashboard + Email Reports]
```

## AI Engine — Anomaly Detection

The core pipeline operates on a three-dimensional anomaly vector:

```
A = [m, l, t]
```

Where `m` = metrics signal (threshold severity, recurrence), `l` = logs signal (keyword correlation), `t` = traces signal (latency patterns).

Health scoring uses exponential decay:

```
H = 100 × exp(-λ × |A|²)
```

The decision engine maps scores to action tiers: Escalate (≥78), Investigate (≥52), Watch (≥32), Suppress (<32).

## Autonomous Remediation

When the AI decides to act, it executes real infrastructure changes:

- **OpenShift**: Delete stress-test resources, restart crashloop pods, scale CPU/memory limits
- **OpenStack**: Resize VM flavors, extend volumes, hard reboot or migrate blocked VMs

All actions are logged with full audit trail and email incident reports.

## Key Features

- Real-time dashboard with WebSocket updates
- OpenShift pod monitoring (CPU, RAM, restarts, CrashLoopBackOff)
- OpenStack VM monitoring (plug-and-play connector)
- Prediction engine (time-to-exhaustion via linear regression)
- Soft quota system with configurable thresholds
- Stress test / chaos engineering tools
- Cost analysis from real metrics
- Role-based authentication (JWT) with audit trail
- CI/CD auto-deploy on push to OpenShift

## Team

- Redouane Meriche — Software & Embedded Systems Engineering, INPT
- Farouk Toujgani — Engineering, EMSI
- Supervisor: Mr. Ibrahim El Hannaoui

CIRES Technologies — Tanger Med | July 2026
