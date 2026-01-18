---
title: 'Why I chose Swift over React Native: An important realization'
slug: 'choosing-swift-over-react-native'
date: '2025-11-03'
description: 'Existing mood tracking apps do a tad too much, often leaving you feeling overwhelming. So I started building Mudo, a micro-mood journal app that does what it says. No fancy features, just a simple way to log your mood and reflect. Powerful insights to help you understand your emotional patterns over time.'
status: 'draft'
tags: ['iOS', 'Design', 'Indie Dev']
---

change needed.
You might be wondering why would I even compare React Native with Swift&mdash;a tool that allows you to cross-platform apps with a single codebase vs. an over-the-top language that's so moody that it'll only work on Apple devices.

In this post, I want to share my journey of choosing Swift over React Native, why I made that decision, and what it means for you.

## The Excitement of the Craft

If you're anything like me, you understand how appealing it is to start a new project with a technology that you have _just_ started tinkering with. When I decided to take a leap of faith into mobile app development, I was naturally drawn to the idea of using React Native given my experience in JavaScript and React.

I had a small project in mind; a micro mood journal app called **Mudo**, and I was eager to get started. After spending around 2 weeks building the bare-bones of the app _while_ I was learning and understanding the quirks of React Native, I was already feeling too confident.

After sometime, I thought to myself, "Let's see how the process of publishing an app on the Play Store and App Store works." Naturally, I started with Google Play Store since their registration fee was a one-shot payment of USD $25, compared to an USD $99/year fee for the App Store, which, I still think, is f\*cking absurd.

So, I started with the Google Play Store. The process was... let's just say, not as smooth as I had hoped. I quickly found myself struggling to navigate the various requirements and guidelines. The dashboard too seemed a bit confusing for a first-timer like me.

This is where the problems began to surface. I realized that React Native, while promising a single codebase, often required platform-specific tweaks and adjustments. The performance on Android devices was inconsistent, and I found myself spending more time debugging platform-specific issues than actually building features for my app.

## The Decision & Challenges

Given the fact that both React Native and Swift would introduce a bit of learning curve, one much steeper than the other&mdash;I had to make a choice. My existing knowledge of JavaScript and React made React Native an attractive option. I was already familiar with the ecosystem, and I could leverage my existing skills to build the app quickly. Plus, the promise of a single codebase meant less maintenance and faster updates.

My attempt to try to submit Mudo to the Google's Play Store felt like the worst indie-dev nightmare! You need at least 12 Android Developer users as testers (at my time of trying, it was 20 devs). This, to me, as a solo developer, was an impossible task. From where am I to gather 12 users to test my app?

In contrast, the App Store has a more transparent and consistent review process, with clear guidelines and faster turnaround times. This was a crucial factor for me as I wanted to get Mudo into users' hands as quickly as possible without unnecessary delays.

I made the daunting decision to go with Swift and build a truly "native" iOS app.

## The Swift Switch

My first impression of Swift was not great. The learning curve was steep, and I found myself struggling to grasp the syntax and concepts. It took me weeks to realize the difference between SwiftUI and UIKit and which one to use for my app. The community support for Swift was also lacking compared to React Native, which had a vast ecosystem of libraries and resources.

I had to grapple with unfamiliar concepts like optionals, protocols, and memory management.

But the more I worked with it, the more I understood the workings of this "moody language", its power, and its elegance. The declarative syntax of SwiftUI felt cleaner compared to the imperative style of React. To be honest, it was a love-hate relation with Swift.

I used to hate the fact that I cannot use VSCode for Swift development.

I know, I know, even with App Store you have to pay a heft $99/year fee. But I was ready to pay that price for the peace of mind and the superior user experience that Apple offered. Though, I will always severely dislike the fact that it's a subscription fee they charge. I would have been okay with a one time fee of $199 or something. But that's just me being greedy I guess.

## The Payoff

I am at a state now, where, believe it or not, I kinda like Swift. The language is powerful and expressive, and though Xcode could be better, it gets the job done.

To test the waters, I'd built a small app&mdash;**Gita Essence**. It shows a daily verse using iOS Notification API from the Bhagavad Gita that I'd scraped in a `JSON` file. It was a simple app, but it familiarized me with not just the development process, but also the process of publishing an app live on App Store.

To my surprise, the experience was much smoother, and the overall process felt pretty snappy and predictable. Gita Essence was approved and live on the App Store without any issues within 3 days of submission. That was actually impressive and gave me the confidence to go all in with Swift for Mudo.

## Moving Forward

There's still a lot to learn, and I am sure I'll encounter more challenges along the way with Swift, Xcode, and the overall iOS-ecosystem. But, I'm excited to continue this journey and see where it takes me. The performance, the user experience, and the native capabilities are unmatched.

As for React Native, I still think it's a great choice for many projects, especially if you need to target multiple platforms quickly, and you can manage to get 12 testers for Play Store submission.

I would like to submit Mudo to the Play Store eventually, and I hope by then, Google would have simplified the submission process for indie developers like me. Until then, I'll be focusing on making Mudo the best iOS app it can be, leveraging the full power of Swift and the iOS ecosystem.

If this resonates, I'd love to hear what project you've been stuck on&mdash;reach out to me over email or [Threads](https://www.threads.net/adictonator), I'm always open to chat.
