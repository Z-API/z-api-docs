---
id: introduction
title: Introduction
---

## What is an instance anyway?

An instance is a connection with a phone number that has a WhatsApp account, which will be responsible for sending and receiving messages. It is possible to create various instances so that you can have several numbers on WhatsApp connected to your account.

Technically speaking an instance is nothing more than a virtual machine (or contained) within the infrastructure of servers that are dedicated to providing you with a connection to your phone number.

Each instance has a number, in case you need more numbers it will be necessary to create more instances. An instance is not chained to a unique number, that means you can disconnect your number and connect another one in the same instance.

To help you understand the functionality of Z-API, our service runs with a model that is based on WhatsApp Web and we abstract the methods allowing you to manipulate them through RestFul API.

To make it more concrete, in the next sections we will help you take your first steps.

---

:::tip Curiosity

It is neat to know that each time you create an instance our FlyBots that are responsible for orchestrating all of our devops, starts the creation process with a Stack Z-API in AWS Brasil. YEAH! All of our services are nacional a run on AWS Brasil.
