---
title: "STM32 Gyro 3D Plane Visualizer"
date: 2026-07-28
description: "Bare-metal SPI gyroscope driver on STM32 streaming real-time orientation data to a 3D aircraft model in Blender via UART."
tags: ["C", "STM32", "SPI", "Python", "Blender", "Embedded"]
icon: "✈️"
filetype: "c"
github: "https://github.com/red1intheocean/STM32-Gyro-3D-Plane-Visualizer"
hw_specs:
  - { key: "MCU",         value: "STM32F429ZI" }
  - { key: "Sensor",      value: "L3GD20H (3-axis gyro)" }
  - { key: "Interface",   value: "SPI (burst read)" }
  - { key: "Output",      value: "UART Virtual COM Port" }
  - { key: "Language",    value: "C11 / Python 3.11" }
  - { key: "3D Engine",   value: "Blender 5.0" }
  - { key: "Filtering",   value: "Deadband noise filter" }
  - { key: "Threading",   value: "Multi-threaded daemon" }
---

## Overview

A full-stack embedded-to-3D pipeline that translates physical motion into a real-time 3D environment. The STM32 reads raw angular velocity from an L3GD20H gyroscope via SPI, transmits parsed data over UART, and a multi-threaded Python script animates a 3D F-15 aircraft model in Blender with zero perceptible latency.

## Architecture

```
[L3GD20H Gyroscope] ──SPI──► [STM32F429] ──UART──► [Python Script] ──► [Blender 3D Model]
```

## Technical Highlights

- **Bare-Metal SPI**: Uses STM32 HAL for efficient burst reads, capturing X, Y, and Z axes simultaneously.
- **Optimized UART**: Fixed-point arithmetic formats and transmits sensor data, intentionally bypassing heavy floating-point `printf` to save MCU flash.
- **Real-Time Integration**: Converts raw angular velocity (°/s) into absolute Euler angles (Pitch, Roll, Yaw) on the fly using numerical integration: `θ_current = θ_previous + (ω × Δt)`.
- **Multi-Threaded Engine**: Background daemon thread + Blender Modal Operator parses live serial data without freezing the 3D rendering UI.
- **Deadband Filtering**: Customizable noise threshold prevents model drift from inherent sensor noise.

{{< codeblock lang="c" filename="gyro_spi_read.c" >}}
/* Burst-read X, Y, Z angular velocity registers via SPI */
uint8_t tx_buf[7] = { 0xA8 | 0x80 | 0x40 }; /* auto-increment + read */
uint8_t rx_buf[7];

HAL_SPI_TransmitReceive(&hspi5, tx_buf, rx_buf, 7, HAL_MAX_DELAY);

int16_t raw_x = (int16_t)(rx_buf[2] << 8 | rx_buf[1]);
int16_t raw_y = (int16_t)(rx_buf[4] << 8 | rx_buf[3]);
int16_t raw_z = (int16_t)(rx_buf[6] << 8 | rx_buf[5]);
{{< /codeblock >}}

## Demonstration

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/NO5X-J4crtQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
</div>
