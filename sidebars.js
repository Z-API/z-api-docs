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
      'quickstart/introduction',
      'quickstart/authentication',
      'quickstart/webhook',
    ],
    'Boas Práticas': ['bestpractices/blockednumber'],

    Dicas: [
      'tips/enable-fix-number',
      'tips/disable-screem-blocked',
      'tips/android-active',
      'tips/stability',
      'tips/emulators',
    ],

    Instância: [
      'instance/introduction',
      'instance/qrcode',
      'instance/restore-session',
      'instance/restart',
      'instance/disconnect',
      'instance/status',
    ],
    Mensagens: [
      'message/introduction',
      'message/send-message-text',
      'message/send-message-image',
      'message/send-message-audio',
      'message/send-message-video',
      'message/send-message-document',
      'message/send-message-link',
      'message/send-message-location',
      /* 'send-message/send-message-product',
      'send-message/send-message-catalog',*/
      'message/send-message-contact',
      'message/delete-message',
      'message/read-message',
    ],
    Contatos: [
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
    ],
    Grupos: [
      'group/introduction',
      'group/create-group',
      'group/group-add-admin',
      'group/group-remove-admin',
      'group/update-group-name',
      'group/update-group-photo',
      /* 'group/add-participant',
      'group/remove-participant',
      'group/leave-group',
      'group/group-metadata/{phone}',*/
    ],
    Status: [
      'status/introduction',
      'status/send-text-status',
      /*
      'status/send-image-status',

      */
    ],
    Fila: [
      'status/introduction',
      'status/send-text-status',
      /*
      'status/send-image-status',

      */
    ],
    Webhooks: [
      /* 'webhooks/introduction',
     
      'status/send-image-status',

      */
    ],
    Sample: ['sample/exemplos'],
  },
};
