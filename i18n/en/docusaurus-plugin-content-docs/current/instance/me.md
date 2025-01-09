---
id: me
title: Instance data
---

## Concept

This method allows you to obtain the data of your instance.

---

## Method

#### /me

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/me

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Response

### 200

| Attribute                 | Type      | Description                                                                    |
| :------------------------ | :------   | :------------------------------------------------------------------------------ |
| id                        | string    | Instance ID                                                                    |
| token                     | string    | Instance token                                                                 |
| name                      | string    | Instance name                                                                  |
| due                       | number    | Timestamp with the expiration date of the instance (unix timestamp)            |
| connected                 | boolean   | Defines if the instance is connected                                           |
| paymentStatus             | string    | Defines the payment status of the instance                                      |
| created                   | Date      | Creation date of the instance                                                   |
| connectedCallbackUrl      | string    | Connection webhook URL                                                          |
| deliveryCallbackUrl       | string    | Message delivery webhook URL                                                    |
| disconnectedCallbackUrl   | string    | Disconnection webhook URL                                                       |
| messageStatusCallbackUrl  | string    | Message status webhook URL                                                      |
| presenceChatCallbackUrl   | string    | Chat presence webhook URL                                                       |
| receivedCallbackUrl       | string    | Received message webhook URL                                                     |
| receiveCallbackSentByMe   | boolean   | Defines if webhook will receive messages sent by the instance itself            |
| callRejectAuto            | boolean   | Defines if it will automatically reject an incoming call                        |
| callRejectMessage         | string    | Message to be sent when rejecting a call                                         |
| autoReadMessage           | boolean   | Defines if it will automatically mark received messages as read                 |
| initialDataCallbackUrl    | string    | Initial data webhook URL after connection                                        |

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/instance-me.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
