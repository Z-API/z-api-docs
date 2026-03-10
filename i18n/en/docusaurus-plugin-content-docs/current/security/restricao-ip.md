---
id: restricao-ip
sidebar_position: 2
title: IP Call Restriction
---
# Call Rate Limiting by IP

### IP Restriction

The IP blocking security method introduces an additional layer of protection, allowing users to restrict calls made to the API based on the requestors' IP addresses. This means you can control which IPs are allowed to access your API and which ones are blocked. Below, we detail how this feature works.

### Enabling the Feature

To enable this feature, follow the simple steps below:

1. **Log in to Z-API**: Access the Z-API control panel with your admin credentials.
2. **Navigate to the Security Page**: In the Z-API panel, find the "Security" option in the navigation menu or settings area.

![IP Restriction Configuration Screen](https://developer.z-api.io/assets/images/ip-block-e0d5f2cc124f2010619c765472855357.jpeg))

### Basic Operation

When the IP restriction module is not activated, the API functions normally and allows access from any IP address that makes a request. This is suitable for situations where no IP restrictions are needed and the API should be publicly accessible.

### Behavior of Unregistered IP

When a request is made from an IP address not in the list of allowed IPs, the API responds with a clear error message:

```json
{
  "error": "[IP da chamada] not allowed"
}
```

### Benefits of IP Blocking

1. **Control**: With this functionality, you have full control over who can access your API, allowing only trusted IPs.
2. **Protection Against Threats**: IP restriction helps protect your API against unauthorized access, attack attempts, and other security threats.
3. **Security Compliance**: For companies that need to comply with strict security regulations, this feature may be essential.

The IP blocking security method makes your API more secure by offering full control over who can access it and ensuring only authorized IPs have permission to use the API's resources. This functionality is particularly useful for protecting sensitive data, preventing abuses, and maintaining the integrity of your API.