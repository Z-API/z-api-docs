---
id: introduction
title: Introduction
---

### Concept

WhatsApp now offers the Communities feature, which allows users to group chats around a common subject or interest. It's an easy way to connect with others who share the same goals and ideas.

To illustrate how the community structure works, see the image below:

<img src="https://raw.githubusercontent.com/Z-API/z-api-docs/main/img/communities.png" />


**Notes:**

1. When you create a community, a default group (announcement group) with the same name as the community is created.
2. This group represents your entire community and is used to send messages to everyone.
3. Every new group linked to the community will have all participants as members of the default group (announcement group).
4. When unlinking a group, all participants in it are removed from the default group (announcement group).

As seen above, every community has an **"Announcement Group"** in which only administrators can send messages. Use it whenever you want to send something to the entire community.

Each community can have up to 50 groups, and community administrators can send messages to up to 5,000 people at once through the announcement group.

### Questions about API functionalities

#### 1. How do I create a new community?

First, it's important to check if the WhatsApp application on your mobile phone already supports communities. If it doesn't, wait for the application to be updated for your account. If you already have access to communities, check the documentation on how to [create a community via API](/communities/create-community).

#### 2. Can I list the communities I am part of?

Yes, Z-API provides methods for you to find out which communities you are a part of. Check the documentation on how to [list your communities](/communities/list-communities).

#### 3. Can I link and unlink groups to a community?

Absolutely! Z-API provides two additional APIs for you to manage the groups within a community. Learn how to [link groups](/communities/link-groups) or [unlink groups](/communities/unlink-groups) from a community.

#### 4. How do I send a message to the entire community?

As mentioned above, the community itself serves only to group your groups and provide an overview of all community groups to users. **You can indeed send a message to the entire community**, but for this purpose, you use the **Announcement Group**. Since the announcement group is just like any other group, you simply need to have the **phone** of the group and use the message sending APIs as you would with any other regular group.

#### 5. How do I get the announcement groups?

There are three ways to obtain the announcement groups:

- The first is during the [creation of the community](/communities/create-community), where creating the community also returns the information of the announcement group.
- The second is through the [list chats API](/chats/get-chats), where you can differentiate between normal groups and announcement groups. The **isGroup** attribute will be true for regular groups, and the **isGroupAnnouncement** attribute will be true for announcement groups.
- The third and final option is through the [community metadata API](/communities/community-metadata), which provides information about the community based on its ID, including the community's name and linked groups.

#### 6. Can I deactivate a community?

Yes, you can [deactivate a Community](/communities/deactivate-community) on WhatsApp, which will result in the disconnection of all groups related to it. It's important to note that deactivating the Community will not delete its groups but will remove them from the specific Community.

#### 7. How do I add or remove people from the community?

As mentioned earlier, the community itself is just a way to group your groups. The real action happens in the announcement groups. If you want to generate invitation links, add or remove people, promote them as administrators, and so on, all of this can be done through the announcement group using the APIs you are already familiar with.