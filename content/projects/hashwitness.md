---
title: "HashWitness"
date: 2026-11-14
slug: "hashwitness"
description: "Hackathon finalist: a client-side verification layer that catches lying Hedera mirror nodes with quorum checks and running hash verification. 2nd place at the Hedera Cross Campus Challenge."
tags: ["JavaScript", "Hedera", "Blockchain", "Security", "HCS", "Verification"]
icon: "🛡️"
filetype: "js"
github: "https://github.com/manelell83/hashwitness"
hw_specs:
  - { key: "Event",             value: "Hedera Cross Campus Challenge, INPT Edition" }
  - { key: "Result",            value: "2nd place, 69 pts (winners 71)" }
  - { key: "Team",              value: "DigiHacks (3 members)" }
  - { key: "Network",           value: "Hedera Testnet" }
  - { key: "Registry Topic",    value: "0.0.11443553" }
  - { key: "Attestation Topic", value: "0.0.11443554" }
  - { key: "Core Checks",       value: "Mirror quorum, running hash v3, consensus anchor" }
  - { key: "Stack",             value: "JavaScript, Hedera Consensus Service, Mirror Node APIs" }
---

## Overview

Applications on Hedera almost never read the ledger directly. They read a
mirror node, a copy of the record, and they trust that copy completely.
HashWitness removes that blind trust.

Our demo scenario: a school issues a digital diploma credential, then revokes
it. The revocation is final on the ledger. But a compromised mirror node
keeps answering "valid", and a recruiter checking the credential would have
hired on a revoked diploma. HashWitness catches the lie before the decision
is made.

## Architecture

```
[Issuer] --> [Hedera Consensus] --> [Mirror Nodes]
                                         |
                                   one mirror may lie
                                         |
                             [HashWitness verification layer]
                              - quorum across mirrors
                              - running hash v3 check
                              - consensus anchor (TopicInfoQuery)
                              - verdict anchored back on HCS
                                         |
                                  [Recruiter App]
```

## Technical Highlights

- Quorum across mirrors: the same record is requested from several
  independent mirror nodes. Answers must agree before anything is trusted.
- Running hash verification: Hedera stamps every consensus message with a
  running hash that commits to the whole history. We reimplemented the exact
  algorithm and matched 100 out of 100 real testnet messages.
- Consensus anchor: the head of the topic is read directly from a consensus
  node (TopicInfoQuery), an independent reference the mirrors are checked
  against.
- Audit log on HCS: every verdict is hashed and anchored on the Hedera
  Consensus Service, so the verification itself is verifiable later.
- Forensic agent with a leash: an LLM explains detected attacks in plain
  language. It never decides. Golden rule: AI proposes, crypto and quorum
  decide.
- Adaptive mirror selection: a Thompson sampling bandit learns which mirrors
  answer honestly and routes around unreliable ones.
- Attack lab: our own fake mirror serves the revoked diploma as valid. A
  naive app accepts it. HashWitness flags it.

## Result

2nd place at the Hedera Cross Campus Challenge (INPT edition), 69 points
against the winning team's 71. I presented and defended the project solo in
front of both juries, and also designed the event's full visual identity:
trophies, certificates, badges, roll-up and banderole.

Live demo and full source are linked above.
