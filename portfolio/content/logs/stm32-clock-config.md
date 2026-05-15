---
title: "STM32 Clock Configuration: PLL Traps and How to Avoid Them"
date: 2026-01-18
tags: ["STM32", "Embedded", "Debugging", "Clocks"]
---

Notes from a painful afternoon debugging a 72 MHz PLL configuration that silently
fell back to the internal 8 MHz HSI oscillator.

## The Problem

After flashing a new project, peripherals were running at unexpected speeds.
UART baud rate was off by 9x. The culprit: `SystemClock_Config()` was failing
silently because the external crystal (HSE) wasn't starting in time.

## Root Cause

The HSE startup timeout in HAL defaults to `HSE_STARTUP_TIMEOUT` (100 ms).
On some boards with a slow crystal, this isn't enough. HAL falls back to HSI
without asserting an error if you don't check the return value.

## Fix

```c
/* Always check HSE ready status explicitly */
RCC_OscInitTypeDef osc = {0};
osc.OscillatorType = RCC_OSCILLATORTYPE_HSE;
osc.HSEState       = RCC_HSE_ON;
osc.PLL.PLLState   = RCC_PLL_ON;
osc.PLL.PLLSource  = RCC_PLLSOURCE_HSE;
osc.PLL.PLLMUL     = RCC_PLL_MUL9;  /* 8 MHz × 9 = 72 MHz */

if (HAL_RCC_OscConfig(&osc) != HAL_OK) {
    Error_Handler();  /* Don't ignore this */
}
```

Also: add a small delay or check `__HAL_RCC_GET_FLAG(RCC_FLAG_HSERDY)` in a
loop before proceeding with PLL configuration.
