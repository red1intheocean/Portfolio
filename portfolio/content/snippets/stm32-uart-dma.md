---
title: "STM32 UART DMA Receive: Idle Line Detection"
date: 2025-11-10
tags: ["C", "STM32", "UART", "DMA", "Embedded"]
---

Robust UART receive on STM32 using DMA + idle-line interrupt. Handles variable-length
frames without polling.

{{< codeblock lang="c" filename="uart_dma.c" >}}
/* Enable UART idle interrupt + DMA receive */
void UART_DMA_Init(void) {
    __HAL_UART_ENABLE_IT(&huart1, UART_IT_IDLE);
    HAL_UART_Receive_DMA(&huart1, rx_buf, RX_BUF_SIZE);
}

/* Call from USART1_IRQHandler */
void UART_IdleCallback(UART_HandleTypeDef *huart) {
    if (__HAL_UART_GET_FLAG(huart, UART_FLAG_IDLE)) {
        __HAL_UART_CLEAR_IDLEFLAG(huart);
        uint16_t len = RX_BUF_SIZE
            - __HAL_DMA_GET_COUNTER(huart->hdmarx);
        process_frame(rx_buf, len);
        HAL_UART_Receive_DMA(huart, rx_buf, RX_BUF_SIZE);
    }
}
{{< /codeblock >}}
