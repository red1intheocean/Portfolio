---
title: "Al-Midan"
date: 2026-07-27
description: "Full-stack sports-matching platform connecting Moroccan university students for spontaneous team games."
tags: ["TypeScript", "Next.js", "Tailwind", "Firebase", "Full-Stack"]
icon: "🏟️"
filetype: "tsx"
github: "https://github.com/red1intheocean/al-midan-app"
hw_specs:
  - { key: "Frontend",    value: "Next.js 14 / React" }
  - { key: "Language",    value: "TypeScript" }
  - { key: "Styling",     value: "Tailwind CSS + shadcn/ui" }
  - { key: "Backend",     value: "Firebase (Auth + Firestore)" }
  - { key: "Realtime",    value: "Firestore subscriptions" }
  - { key: "Deploy",      value: "Vercel" }
  - { key: "Scope",       value: "~35 universities, Rabat" }
  - { key: "Team",        value: "5 engineers" }
---

## Overview

Al-Midan is a full-stack application that connects student athletes across Moroccan universities. It facilitates spontaneous sports event organization — matching players, balancing teams, and coordinating campus field reservations in real time.

The platform tackles student isolation and promotes physical well-being by making pickup games as frictionless as sending a message.

## Architecture

```
[Next.js Frontend] → [Firebase Auth] → [Firestore DB]
       ↓                                      ↑
  [Tailwind UI]                     [Realtime Listeners]
       ↓                                      ↑
  [Vercel CDN] ←──── SSR/ISR ────→ [API Routes]
```

## Core Features

- **Smart Matchmaking**: Auto-balances teams based on player skill scores and reliability ratings derived from post-match feedback.
- **Location-Aware**: Surfaces nearby matches and available campus fields using geolocation.
- **Real-Time Updates**: Firestore subscriptions push live player counts and match status changes instantly.
- **Venue Integration**: Partner sports complexes appear in-app with availability, pricing, and student discounts.
- **Trust System**: Post-match reporting identifies toxic behavior and maintains community quality.

## Why It Matters

University life in Morocco often leads to sedentary habits and social isolation. Al-Midan leverages the neurobiological benefits of group sports — endorphin release, cortisol reduction — as a healthy alternative to excessive screen time. Initial projections target 11,000+ users across Rabat's 35 universities within the first semester.

## Team

- Meriche Redouane
- Bourtal Saad
- Ibnelhabib Imane
- Hamami Med
- Boualaoui Aya
