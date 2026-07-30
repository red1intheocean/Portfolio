---
title: "Lightweight MQTT Publish from Embedded C"
date: 2025-10-03
tags: ["C", "MQTT", "IoT", "Networking"]
---

Minimal MQTT PUBLISH packet construction for constrained devices without a full client library.

{{< codeblock lang="c" filename="mqtt_publish.c" >}}
/* Build a minimal MQTT PUBLISH packet (QoS 0, no retain) */
int mqtt_publish(int sock, const char *topic, const char *payload) {
    uint8_t buf[256];
    uint16_t topic_len  = strlen(topic);
    uint16_t payload_len = strlen(payload);
    uint16_t remaining  = 2 + topic_len + payload_len;
    int idx = 0;

    buf[idx++] = 0x30;           /* PUBLISH, QoS 0 */
    buf[idx++] = remaining;      /* remaining length (single byte, <128) */
    buf[idx++] = topic_len >> 8;
    buf[idx++] = topic_len & 0xFF;
    memcpy(&buf[idx], topic, topic_len);   idx += topic_len;
    memcpy(&buf[idx], payload, payload_len); idx += payload_len;

    return send(sock, buf, idx, 0);
}
{{< /codeblock >}}
