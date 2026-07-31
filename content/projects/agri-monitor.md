---
title: "Agricultural Monitoring System"
date: 2025-06-15
description: "Full-stack IoT project with sensor simulation, embedded acquisition, and real-time web dashboard."
tags: ["C", "Python", "IoT", "STM32", "MQTT", "Real-Time"]
icon: "🌱"
filetype: "c"
github: ""
hw_specs:
  - { key: "MCU",         value: "STM32F103C8T6" }
  - { key: "Clock",       value: "72 MHz" }
  - { key: "Flash",       value: "64 KB" }
  - { key: "RAM",         value: "20 KB" }
  - { key: "Sensors",     value: "DHT22, Soil Capacitive" }
  - { key: "Protocol",    value: "MQTT over Wi-Fi (ESP8266)" }
  - { key: "Backend",     value: "Python / FastAPI" }
  - { key: "Database",    value: "InfluxDB" }
  - { key: "Dashboard",   value: "Grafana / Custom Web" }
  - { key: "Power",       value: "3.3V / 5V regulated" }
---

## Overview

A complete IoT pipeline for agricultural field monitoring, from raw sensor data on an
STM32 microcontroller, through an MQTT broker, to a real-time web dashboard.

The system monitors soil moisture, ambient temperature, and humidity, triggering alerts
when values cross configurable thresholds.

## Architecture

```
[STM32 + Sensors] → UART → [ESP8266 Wi-Fi] → MQTT → [Broker]
                                                          ↓
                                               [Python FastAPI]
                                                          ↓
                                               [InfluxDB] → [Dashboard]
```

## Embedded Layer

The STM32 firmware reads sensors via ADC and I2C, packages readings into a JSON string,
and sends them over UART to the ESP8266 co-processor every 5 seconds.

{{< codeblock lang="c" filename="sensor_read.c" >}}
#include "stm32f1xx_hal.h"
#include "dht22.h"

typedef struct {
    float temperature;
    float humidity;
    uint16_t soil_moisture_raw;
} SensorData;

HAL_StatusTypeDef read_sensors(SensorData *data) {
    /* Read DHT22 over bit-bang GPIO */
    if (DHT22_Read(&data->temperature, &data->humidity) != DHT22_OK) {
        return HAL_ERROR;
    }
    /* Read soil moisture via ADC channel 0 */
    HAL_ADC_Start(&hadc1);
    if (HAL_ADC_PollForConversion(&hadc1, 10) == HAL_OK) {
        data->soil_moisture_raw = HAL_ADC_GetValue(&hadc1);
    }
    HAL_ADC_Stop(&hadc1);
    return HAL_OK;
}
{{< /codeblock >}}

## IoT Widget: Live Readout

{{< iot-widget title="Agri Node #1: Field A" >}}
Temperature   | 24.3 °C
Humidity      | 61 %
Soil Moisture | 42 %
MCU Uptime    | 3d 14h 22m
MQTT Status   | CONNECTED
Last Update   | 5s ago
{{< /iot-widget >}}

## Backend

A Python FastAPI service subscribes to the MQTT broker, validates incoming payloads,
and writes time-series data to InfluxDB. Grafana provides the default dashboard:
a custom lightweight web frontend was also built for mobile-friendly field access.
