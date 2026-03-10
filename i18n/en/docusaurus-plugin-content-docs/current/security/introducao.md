---
id: introducao
sidebar_position: 1
title: Security
---
# <Icon name="Shield" size="lg" /> Security and Authentication

This section documents all available security measures in the Z-API to protect your account, credentials, integrations, and data. Implementing these security practices is essential for maintaining a secure and reliable operation.

## <Icon name="BookOpen" size="md" /> What You Will Learn in This Section

This section is structured to provide comprehensive knowledge on security in the Z-API:

- **Fundamental Concepts**: Understanding the importance of security and common threats
- **Authentication**: Token and credential systems
- **Access Control**: IP restrictions and other measures
- **Two-Factor Authentication (2FA)**: An additional layer of protection
- **Webhook Security**: Validation and protection of endpoints
- **Best Practices**: Recommendations for secure implementations

## <Icon name="Target" size="md" /> Overview and Context

### <Icon name="ShieldAlert" size="sm" /> Why Security is Critical

Security is not optional when working with APIs and integrations. Compromised credentials can result in:

- **Unauthorized Access**: Third parties may use your account to send messages
- **Data Leakage**: Sensitive information may be exposed
- **Resource Abuse**: Misuse can lead to costs or blocks
- **System Compromise**: Integrations may be manipulated
- **Privacy Violation**: Contact data may be accessed

**Shared Responsibility:**

Security is a shared responsibility between the Z-API (which provides tools) and you (who must implement them correctly). This section teaches how to do your part.

### <Icon name="Info" size="sm" /> Multi-Layered Security Architecture

The Z-API implements a multi-layered security architecture, following the principle of "defense in depth." Each layer adds an additional barrier against unauthorized access:

**Layer 1: Token-Based Authentication**

A robust authentication system using unique and secure tokens for each instance. Tokens are generated cryptographically securely and should be kept secret.

**Layer 2: IP Access Restrictions**

Fine-grained control that limits API calls to specific and trusted IP addresses. Significantly reduces the attack surface.

**Layer 3: Two-Factor Authentication (2FA)**

An additional layer of protection that requires a second factor of authentication in addition to the password. Even if credentials are compromised, an attacker would need the second factor.

**Layer 4: Webhook Security Tokens**

Mandatory token validation for all webhook requests. Ensures only the Z-API can send events to your endpoints, preventing malicious requests.

**Combined Effectiveness:**

Each layer individually offers protection, but combining all layers creates a robust and resilient defense against various types of threats.

:::info Multi-Layered
Each security layer adds an additional barrier against unauthorized access. Use all available layers for maximum protection!
:::

:::tip Explanatory Article
For a simple explanation of Z-API security using everyday analogies (building doorman), especially useful for automators who want to protect their automation without technical cybersecurity expertise, see the article: [Z-API Security: Protect Your Automation Without Becoming an Expert in Cybersecurity](/blog/seguranca-zapi-proteja-automacao-como-porteiro). The article explains all layers of protection simply and practically.
:::

---

## <Icon name="ListChecks" size="md" /> Available Security Topics

The security documentation is organized into the following topics, each with a complete guide:

### <Icon name="IdCard" size="sm" /> Authentication and Credentials

- **[ID and Token](/docs/security/id-e-token)**: Manage your authentication credentials. Learn to generate, renew, and protect API access tokens.

### <Icon name="GlobeLock" size="sm" /> Access Control

- **[IP Call Restrictions](/docs/security/restricao-ip)**: Limit access to your API by IP. Configure a whitelist of allowed IPs for maximum security.

### <Icon name="ShieldCheck" size="sm" /> Multi-Factor Authentication

- **[Two-Factor Authentication](/docs/security/autenticacao-2fa)**: Add an extra layer of security to your dashboard. Protect your account even if the password is compromised.

### <Icon name="KeyRound" size="sm" /> Webhook Security

- **[Account Security Token](/docs/security/token-seguranca)**: Configure tokens to validate webhooks. Ensure only the Z-API can send events to your endpoints.

---

## <Icon name="ShieldAlert" size="md" /> Best Security Practices

Following these recommendations is essential for maintaining a secure account and integrations:

### <Icon name="Lock" size="sm" /> Credential Protection

**Keep tokens secret:**

- Never share tokens publicly (GitHub, forums, public documentation)
- Do not commit tokens to code repositories
- Use environment variables for storing credentials
- Rotate tokens periodically
- Revoke compromised tokens immediately

**Secure storage:**

- Use secret managers (AWS Secrets Manager, Azure Key Vault, etc.)
- Avoid hardcoding credentials in code
- Use different tokens for different environments (development, production)
- Implement role-based access control (RBAC) when possible

### <Icon name="GlobeLock" size="sm" /> Access Control

**IP restrictions:**

- Configure a whitelist of IPs whenever possible
- Use static IPs for production servers
- Monitor unauthorized access attempts from IP addresses
- Review and update the list of allowed IPs periodically

### <Icon name="ShieldCheck" size="sm" /> Multi-Factor Authentication

**Enable 2FA:**

- Always enable two-factor authentication in the dashboard
- Use authenticator apps (Google Authenticator, Authy) instead of SMS when possible
- Keep recovery codes in a secure location
- Review authorized devices periodically

### <Icon name="Webhook" size="sm" /> Webhook Validation

**Always validate webhooks:**

- Implement token validation `x-token` in all endpoints
- Reject requests without a valid token
- Use HTTPS for all webhook endpoints
- Implement rate limiting to prevent abuse
- Monitor unauthorized access attempts

### <Icon name="Monitor" size="sm" /> Monitoring and Auditing

**Maintain visibility:**

- Monitor access and authentication logs
- Configure alerts for suspicious activities
- Regularly review logs
- Implement audit systems for critical actions
- Maintain secure backups of important configurations

:::success Layered Security: Defense in Depth
The more security layers you activate, the more protected your account will be. Do not underestimate the importance of each layer - in security, multiple barriers are always better than a single strong barrier. Implement all available layers for maximum protection.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you understand the importance of security, follow these learning paths:

### <Icon name="PlayCircle" size="sm" /> Initial Configuration

1. **[ID and Token](/docs/security/id-e-token)**: Configure your authentication credentials
2. **[Two-Factor Authentication](/docs/security/autenticacao-2fa)**: Enable 2FA in your dashboard
3. **[Account Security Token](/docs/security/token-seguranca)**: Configure webhook validation

### <Icon name="Code2" size="sm" /> Technical Implementation

1. **[IP Restrictions](/docs/security/restricao-ip)**: Configure a whitelist of IPs
2. **Webhook validation**: Implement validation in your endpoints
3. **Secure storage**: Configure secret management

### <Icon name="Target" size="sm" /> Auditing and Maintenance

1. **Periodic review**: Regularly review security configurations
2. **Monitoring**: Implement monitoring and alert systems
3. **Credential rotation**: Establish a process for periodic credential rotation

Each security page includes complete code examples, step-by-step configurations, and specific recommendations. Start with basic configurations and expand as your needs grow.