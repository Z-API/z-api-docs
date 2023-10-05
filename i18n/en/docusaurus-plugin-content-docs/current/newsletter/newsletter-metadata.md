---
id: newsletter-metadata
title: Newsletter Metadata
---

## Method

#### /newsletter/metadata

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/metadata/{newsletterId}

---

## Concept

This method returns the metadata of a newsletter, including all newsletter information and its views.

---

## Attributes

### Required

| Attributes | Type    | Description |
| :--------- | :-----: | :---------- |
| id         | string  | Newsletter ID  |

---

## Request Params

#### URL

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/metadata/{newsletterId}

:::warning

The newsletter ID must always include the "@newsletter" suffix, as this is the standard used by WhatsApp itself.

:::

---

## Response

### 200

| Attributes         | Type      | Description                                                  |
| :----------------- | :-------- | :----------------------------------------------------------- |
| id                 | string    | Newsletter ID                                                   |
| creationTime       | timestamp | Timestamp of the newsletter's creation date                     |
| state              | string    | Newsletter state (ACTIVE, NON_EXISTING)                         |
| name               | string    | Newsletter name                                                |
| description        | string    | Newsletter description                                         |
| subscribersCount   | string    | Number of newsletter followers                                 |
| inviteLink         | string    | Newsletter's invite link                                       |
| verification       | string    | Indicates whether the newsletter is verified or not (VERIFIED, UNVERIFIED) |
| picture            | string    | Newsletter's image URL                                         |
| preview            | string    | Newsletter's image preview URL                                 |
| viewMetadata       | object    | Object with view information                                 |

Object (viewMetadata)

| Attributes | Type   | Description                                                  |
| :--------  | :----: | :----------------------------------------------------------  |
| mute       | string | Indicates whether the newsletter is muted or not (ON, OFF)     |
| role       | string | Indicates if the user is the owner or a subscriber (OWNER, SUBSCRIBER) |

**Example**

```json
  {
    "id": "999999999999999999@newsletter",
    "creationTime": "1695643504",
    "state": "ACTIVE",
    "name": "Z-API",
    "description": "Official Z-API Newsletter",
    "subscribersCount": "123",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a",
    "verification": "VERIFIED",
    "picture": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?ccb=11-4&oh=01_AdS-Wk3RSfXmtEqDA4-LTFaZQILXZSprywV8EwNoZPOaGw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "preview": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdRltWYOZftf0cnm-GNw5RRGoxQ53nJR9zzxxot_N7JQCw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "viewMetadata": {
      "mute": "OFF",
      "role": "OWNER"
    }
  }
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

<!-- 
## Webhook Response

Link to the response of the webhook (upon receiving)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-newsletter-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>