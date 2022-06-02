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
    'Quick Start': ['quickstart/introduction', 'quickstart/authentication'],

    Tips: [
      'tips/blockednumber',
      'tips/enable-fix-number',
      'tips/disable-screem-blocked',
      'tips/android-active',
      'tips/stability',
      'tips/emulators',
      'tips/Z-APIvsAPI-OFICIAL',
    ],

    Instance: [
      'instance/introduction',
      'instance/qrcode',
      'instance/restore-session',
      'instance/restart',
      'instance/disconnect',
      'instance/status',
      'instance/device',
      'instance/rename-instance',
    ],
    Messages: [
      'message/introduction',
      'message/send-message-text',
      'message/forward-message',
      'message/send-message-reaction',
      'message/send-remove-reaction',
      'message/send-message-image',
      'message/send-message-sticker',
      'message/send-message-audio',
      'message/send-message-video',
      'message/send-message-document',
      'message/send-message-link',
      'message/send-message-location',
       /* 'send-message/send-message-product',
       'send-message/send-message-catalog', */
      'message/send-message-contact',
      'message/send-button-list',
      'message/send-option-list',
      'message/delete-message',
      'message/read-message',
      'message/reply-message',
    ],
    Contacts: [
      'contacts/introduction',
      'contacts/get-contacts',
      'contacts/get-metadata-contact',
      'contacts/get-profile-picture',
      'contacts/get-iswhatsapp',
    ],
    Chats: [
      'chats/introduction',
      'chats/get-chats',
      'chats/get-message-chats',
      'chats/get-metadata-chat',
      'chats/archive-chat',
      'chats/delete-chat',
    ],
    Groups: [
      'group/introduction',
      'group/create-group',
      'group/update-group-name',
      'group/update-group-photo',
      'group/add-participant',
      'group/remove-participant',
      'group/mention-participant',
      'group/add-admin',
      'group/remove-admin',
      'group/leave-group',
      'group/metadata-group',
      'group/group-invitation-metadata',
      'group/update-group-settings',
      'group/update-group-description',
    ],
    'Transmission list': ['broadcast/introduction'],
    Status: [
      'status/introduction',
      'status/send-text-status',
      'status/send-image-status',
    ],
    'Message queue': [
      'queue/introduction',
      'queue/get-queue',
      'queue/delete-queue',
      'queue/delete-queue-id',
    ],
    'Whatsapp Business': [
      'business/introduction',
      'business/edit-product',
      'business/get-products',
      'business/get-products-phone',
      'business/get-product-id',
      'business/delete-product',
    ],
    Webhooks: [
      'webhooks/introduction',
      'webhooks/on-message-send',
      'webhooks/on-message-received',
      'webhooks/on-message-received-notify-fromme',
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

    'Multi-Devices': ['multidevices/introduction', 'multidevices/beta'],

    Sample: ['sample/exemplos'],
  },
};
