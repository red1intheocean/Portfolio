---
title: "FaceRecon Bridge"
date: 2026-05-20
description: "Real-time biometric access control system using AWS Rekognition, Flask, and ESP32-CAM with servo-driven door unlock."
tags: ["Python", "AWS", "ESP32", "Flask", "IoT", "C++"]
icon: "🔐"
filetype: "py"
github: "https://github.com/red1intheocean/face-recon-bridge"
hw_specs:
  - { key: "Camera",      value: "ESP32-CAM (OV2640)" }
  - { key: "Actuator",    value: "SG90 Servo (GPIO13)" }
  - { key: "Backend",     value: "Flask / Python" }
  - { key: "AI Service",  value: "AWS Rekognition" }
  - { key: "Database",    value: "SQLite (access log)" }
  - { key: "Protocol",    value: "HTTP (WiFi LAN)" }
  - { key: "Auth",        value: "Face collection matching" }
  - { key: "Team",        value: "4 engineers" }
---

## Overview

A real-time face recognition access control bridge built for INPT. The system captures frames from a camera (webcam or ESP32-CAM), identifies enrolled faces via AWS Rekognition, and triggers a servo on the ESP32 to unlock a door. All access events are logged to SQLite with timestamps and confidence scores.

## Architecture

```
[ESP32-CAM + Servo] ◄──WiFi──► [Flask Backend] ──AWS API──► [AWS Rekognition]
                                      │
                                      ▼
                               [Browser Dashboard]
                               [SQLite Access Log]
```

## How It Works

1. Browser shows live camera feed (MJPEG stream from ESP32 or webcam).
2. Every 2 seconds, a frame is sent to the `/scan` endpoint.
3. Backend forwards the frame to AWS Rekognition `SearchFacesByImage`.
4. If a match is found (confidence ≥ threshold) → ESP32 `/open` endpoint is called → servo unlocks the door.
5. Access event is logged to SQLite with name, timestamp, and confidence score.

## Key Features

- **Dual Camera Modes**: Seamlessly switch between webcam (development) and ESP32-CAM (production) via a single config flag.
- **Face Enrollment UI**: Browser-based interface to register new faces into the Rekognition collection.
- **Real-Time Dashboard**: Live MJPEG feed with auto-scanning and access log display.
- **Hardware Feedback**: LCD display (GPIO14/15) and buzzer (GPIO2) on the ESP32 for access granted/denied indication.
- **RESTful API**: Full CRUD for face management, access logs, and system status.

## Team

- Software & AWS — Meriche Redouane & IbnHabib Imane
- Hardware & ESP32 — El Harti Med & Ennaciri Abderahim

INPT — Expedition 2 | 2026
