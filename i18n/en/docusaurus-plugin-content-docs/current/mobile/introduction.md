---
id: introduction
title: Introduction
---

### Concept

In this topic, you will get to know all the methods available to register a number on a mobile instance.

**What are mobile instances?** Mobile instances are basically like your cell phone! Instead of being connected as a secondary "device" - as is the case with the web instance - they are the primary device. This means that, in addition to connecting a number to this instance, you can also connect other devices - such as web and desktop - through it! Amazing, right?!

Moreover, there are several **advantages** to connecting your number to a mobile instance. One of them would be that the chances of **banning** are considerably reduced because we are dealing with a primary device. This does not necessarily mean that there are no bans for this type of connection. They can indeed occur, but the **probability is much lower** compared to a web instance.

Now that you understand and have seen the advantages of the mobile instance, **let's code**!


### Steps to connect a number

Start by checking the availability of your number for registration on a new primary device. From this API, you can check if the number is banned, if it is possible to request the confirmation code via SMS, voice call, or through the currently connected cell phone. For more details, access the section below:

- [Registration is available](./registration-available)

If the number is not banned and any of the confirmation code methods are available (SMS, voice call, or cell phone app), just use the following endpoint to request its sending:

- [Request registration code](./request-code)

In some cases, after requesting the code, it is required to respond to a **captcha** to proceed with the code confirmation. In this case, the base64 of the captcha image is returned in the API before this one - **Request confirmation code**. Use the following API to confirm this captcha.

- [Respond captcha](./captcha-confirm)

After verifying the captcha - if that was your case - we can proceed to confirm the code that was sent to you by the chosen method.

- [Confirm code](./confirm-code)



Phew! If you followed this step-by-step, you should already be connected to a mobile instance! Now, just give **Wings to your imagination!**

:::tip Tip
Remember that other APIs related to WhatsApp - such as sending messages and interactions on the account - work in the same way of web instances. In other words, the methods are fully compatible between instances.
:::
