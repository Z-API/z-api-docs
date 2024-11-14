/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  tutorialSidebar: {
    'Quick Start': [
      'quickstart/introduction', //'quickstart/authentication'
    ],

    Tips: [
      'tips/blockednumber',
      'tips/enable-fix-number',
      // 'tips/disable-screem-blocked',
      // 'tips/android-active',
      // 'tips/stability',
      'tips/emulators',
      'tips/Z-APIvsAPI-OFICIAL',
      'tips/button-status',
      'tips/file-expiration',
      'tips/postman-collection',
    ],

    Security: [
      'security/introduction',
      'security/ip-block',
      'security/twofactor',
      'security/client-token',
    ],

    Instance: [
      'instance/introduction',
      'instance/update-auto-read-message',
      'instance/profile-picture',
      'instance/profile-name',
      'instance/profile-description',
      'instance/update-call-reject-auto',
      'instance/update-call-reject-message',
      'instance/qrcode',
      // 'instance/restore-session',
      'instance/restart',
      'instance/disconnect',
      'instance/status',
      'instance/device',
      'instance/rename-instance',
      'instance/me',
    ],
    Mobile: [
      'mobile/introduction',
      'mobile/registration-available',
      'mobile/request-code',
      'mobile/captcha-confirm',
      'mobile/confirm-code',
      'mobile/request-unbanning',
      'mobile/confirm-security-code',
      'mobile/forgot-security-code',
      'mobile/get-account-email',
      'mobile/set-account-email',
      'mobile/verify-account-email',
      'mobile/get-has-security-code',
      'mobile/set-security-code',
      'mobile/remove-account-email',
      'mobile/remove-security-code',
    ],
    Messages: [
      'message/introduction',
      'message/send-message-text',
      'message/forward-message',
      'message/send-message-reaction',
      'message/send-remove-reaction',
      'message/send-message-image',
      'message/send-message-sticker',
      'message/send-message-gif',
      'message/send-message-audio',
      'message/send-message-video',
      'message/send-message-ptv',
      'message/send-message-document',
      'message/send-message-link',
      'message/send-message-location',
      'message/send-message-product',
      'message/send-message-catalog',
      'message/send-message-contact',
      'message/send-message-multiple-contacts',
      'message/send-button-actions',
      'message/send-button-list',
      'message/send-button-list-image',
      'message/send-button-list-video',
      'message/send-option-list',
      'message/send-button-otp',
      'message/send-button-pix',
      'message/delete-message',
      'message/read-message',
      'message/reply-message',
      'message/send-poll',
      'message/send-poll-vote',
      'message/send-message-order',
      'message/send-order-status-update',
      'message/send-order-payment-update',
      'message/send-pin-message',
      'message/send-newsletter-admin-invite',
      'message/send-event',
      'message/send-edit-event',
      'message/send-event-response',
    ],
    Privacy: [
      'privacy/introduction',
      'privacy/get-disallowed-contacts',
      'privacy/set-last-seen',
      'privacy/set-photo-visualization',
      'privacy/set-privacy-description',
      'privacy/set-group-add-permission',
      'privacy/set-privacy-online',
      'privacy/set-read-receipts',
      'privacy/set-messages-duration',
    ],
    Contacts: [
      'contacts/introduction',
      'contacts/get-contacts',
      'contacts/add-contacts',
      'contacts/remove-contacts',
      'contacts/get-metadata-contact',
      'contacts/get-profile-picture',
      'contacts/get-iswhatsapp',
      'contacts/get-iswhatsapp-batch',
      'contacts/block-contact',
      'contacts/report-contact',
    ],
    Chats: [
      'chats/introduction',
      'chats/get-chats',
      /*'chats/get-message-chats',*/
      'chats/get-metadata-chat',
      'chats/read-chat',
      'chats/archive-chat',
      'chats/pin-chat',
      'chats/mute-chat',
      'chats/clear-chat',
      'chats/delete-chat',
      'chats/send-chat-expiration',
    ],
    Calls: ['calls/introduction', 'calls/send-call'],
    Groups: [
      'group/introduction',
      'group/create-group',
      'group/update-group-name',
      'group/update-group-photo',
      'group/add-participant',
      'group/remove-participant',
      'group/approve-participant',
      'group/reject-participant',
      'group/mention-participant',
      'group/add-admin',
      'group/remove-admin',
      'group/leave-group',
      'group/metadata-group',
      'group/group-invitation-metadata',
      'group/update-group-settings',
      'group/update-group-description',
      'group/redefine-invitation-link',
      'group/accept-group-invite',
    ],
    Communities: [
      'communities/introduction',
      'communities/create-community',
      'communities/list-communities',
      'communities/link-groups',
      'communities/unlink-groups',
      'communities/community-metadata',
      'communities/redefine-invitation-link',
      'communities/add-community-participant',
      'communities/remove-community-participant',
      'communities/add-community-admin',
      'communities/remove-community-admin',
      'communities/community-settings',
      'communities/deactivate-community',
    ],
    'Meta AI': [
      'metaai/introduction',
      'metaai/conversation'
    ],
    Newsletter: [
      'newsletter/introduction',
      'newsletter/create-newsletter',
      'newsletter/update-newsletter-picture',
      'newsletter/update-newsletter-name',
      'newsletter/update-newsletter-description',
      'newsletter/follow-newsletter',
      'newsletter/unfollow-newsletter',
      'newsletter/mute-newsletter',
      'newsletter/unmute-newsletter',
      'newsletter/delete-newsletter',
      'newsletter/newsletter-metadata',
      'newsletter/newsletter-list',
      'newsletter/search-newsletter',
      'newsletter/update-newsletter-config',
      'newsletter/accept-newsletter-admin-invite',
      'newsletter/newsletter-remove-admin',
      'newsletter/newsletter-revoke-admin-invite',
      'newsletter/transfer-newsletter-ownership',
    ],
    'Transmission list': ['broadcast/introduction'],
    Status: [
      'status/introduction',
      'status/send-text-status',
      'status/send-image-status',
      'status/reply-status-text',
      'status/reply-status-gif',
      'status/reply-status-sticker',
      'status/send-video-status',
    ],
    'Message queue': [
      'queue/introduction',
      'queue/get-queue',
      'queue/delete-queue',
      'queue/delete-queue-id',
    ],
    'WhatsApp Business': [
      'business/introduction',
      'business/edit-product',
      'business/get-products',
      'business/get-products-phone',
      'business/get-product-id',
      'business/delete-product',
      'business/tags',
      'business/tags-colors',
      'business/create-tag',
      'business/edit-tag',
      'business/delete-tag',
      'business/tags-add',
      'business/tags-remove',
      'business/save-catalog-config',
      'business/create-collection',
      'business/list-collections',
      'business/delete-collection',
      'business/edit-collection',
      'business/list-collection-products',
      'business/add-product-to-collection',
      'business/remove-product-from-collection',
      'business/company-description',
      'business/company-email',
      'business/company-address',
      'business/company-websites',
      'business/business-hours',
      'business/available-categories',
      'business/company-categories',
    ],
    Webhooks: [
      'webhooks/introduction',
      'webhooks/on-message-send',
      'webhooks/on-message-received',
      // 'webhooks/on-message-received-notify-fromme',
      'webhooks/on-whatsapp-disconnected',
      'webhooks/on-whatsapp-message-status-changes',
      'webhooks/on-chat-presence',
      'webhooks/on-webhook-connected',
    ],
    Partners: [
      'partner/introduction',
      'partner/create-instance',
      'partner/sign-instance',
      'partner/unsubscribe-instance',
      'partner/list-instances',
    ],

    Integradors: ['integrators/find-my-pack'],

    // 'Multi-Devices': ['multidevices/introduction', 'multidevices/beta'],

    // Sample: ['sample/exemplos'],
  },
};
