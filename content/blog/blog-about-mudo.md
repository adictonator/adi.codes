---
title: 'Draft: Blog about mudo'
date: '2025-10-06'
description: 'Existing mood tracking apps do a tad too much, often leaving you feeling overwhelming. So I started building Mudo, a micro-mood journal app that does what it says. No fancy features, just a simple way to log your mood and reflect. Powerful insights to help you understand your emotional patterns over time.'
status: 'draft'
tags: ['iOS', 'Design', 'Indie Dev']
---

React Native is great for many projects, but for **Mudo**, I needed something that felt truly native to iOS. Swift offered the performance and fluidity that a mood journaling app requires to feel seamless and unobtrusive. Even though I was already comfortable with React, I was sure using React Native would definitely be the best choice for me.
And that's what I started off with.
Pretty soon, I realized that React Native's abstraction layer introduced subtle delays and inconsistencies that detracted from the user experience. Even though Mudo is a very simple app, these small issues added up. And the evil perfectionist in me couldn't let it slide. I had not other option left. And the innate curiosity to learn something new pushed me to try Swift.

And boy was I disappointed. Swift has a steep learning curve, and I had to grapple with unfamiliar concepts like optionals, protocols, and memory management. But the more I worked with it, the more I appreciated its power and elegance. The SwiftUI framework made it easy to create beautiful, responsive interfaces with minimal code. The declarative syntax felt refreshing compared to the imperative style of React. To be honest, it was a love-hate relation with Swift. The initial frustration was real, but the satisfaction of overcoming those challenges was worth it. I used to hate the fact that I cannot use my beloved VSCode for Swift development. But Xcode, despite its quirks, has some powerful features that made the development process smoother once I got the hang of it.

The other main reason I chose Swift over React Native was the fact that as a indie dev, trying to submit an app to the Android's Play Store is a nightmare. You need at least 12 Android Developer users as testers. This, to me, was an impossible task. From where am I to gather 12 users to test my app? And even if I did, the overall Play Store's review process is notoriously slow and unpredictable, often leaving developers in limbo for weeks. The guidelines are vague and frequently change, making it hard to know if your app will be accepted. In contrast, the App Store has a more transparent and consistent review process, with clear guidelines and faster turnaround times. This was a crucial factor for me as I wanted to get Mudo into users' hands as quickly as possible without unnecessary delays.

Having a single codebase was my main intention when I had decided to go with React Native. And since I knew I am not going to bother with Google's policies for getting your app approved, I made the daunting decision to go with Swift and build a truly "native" iOS app.

I know, I know, even with App Store you have to pay a heft $99/year fee. But I was ready to pay that price for the peace of mind and the superior user experience that Apple offered. Though, I will always severely dislike the fact that it's a subscription fee they charge. I would have been okay with a one time fee of $199 or something. But that's just me being greedy I guess.

Now, I am at a point, where I kinda like Swift. The language is powerful and expressive, and the ecosystem is rich with libraries and tools that make development easier. The performance is top-notch, and the user experience is unparalleled. React Native was fun to work with, but it felt like a compromise.

To test the waters, I build a small app called Gita Essence, that shows a daily verse from the Bhagavad Gita. It was a simple app, but it gave me a taste of what was possible with Swift. The experience was smooth, and the app felt snappy and responsive. And to my surprise, Gita Essence got approved on the App Store without any issues and within 3 days of submission. That was actually impressive and gave me the confidence to go all in with Swift for Mudo.

There's still a lot to learn, and I am sure I'll encounter more challenges along the way. But I am excited to continue this journey and see where it takes me. React Native was a great starting point, but Swift is where I see the future of Mudo. The performance, the user experience, and the native capabilities are unmatched.

As for React Native, I still think it's a great choice for many projects, especially if you need to target multiple platforms quickly. I might end up creating something simple with it, too.

If you'd like to get updated on Mudo development, you can follow me on [Threads](https://threads.net/adictonator) or check out the [Mudo website](https://mudoapp.com).

Swift, on the other hand, allowed me to leverage iOS's native capabilities fully, resulting in a smoother, more responsive app.

Building **Mudo** was my attempt to merge code and calmness.

It started with a simple idea: how can an app _feel_ peaceful?

## The Design Philosophy

When building Mudo, I wanted to create something that didn't just look minimalist, but actually felt calming to use. This meant making deliberate choices about:

- **Colors**: Soft, muted tones that don't strain the eyes
- **Animations**: Gentle transitions that feel natural
- **Typography**: Clean, readable fonts that invite focus
- **Spacing**: Generous whitespace to let content breathe

## Technical Challenges

### State Management

One of the biggest challenges was managing the app's state while keeping the interface responsive. I opted for a clean architecture that separates concerns:

```swift
class MudoViewModel: ObservableObject {
    @Published var isTimerRunning = false
    @Published var currentMode: FocusMode = .work

    private var timer: Timer?

    func startTimer() {
        // Timer logic here
    }
}
```

### Smooth Animations

Creating animations that felt natural required careful attention to timing curves and duration:

```swift
withAnimation(.easeInOut(duration: 0.6)) {
    self.isExpanded.toggle()
}
```

## Key Features

1. **Focus Timer**: A simple Pomodoro-style timer
2. **Ambient Sounds**: Curated background audio
3. **Progress Tracking**: Gentle insights without pressure
4. **Dark Mode**: Designed for evening productivity

## Lessons Learned

Building Mudo taught me that simplicity is harder than complexity. Every feature had to earn its place. The challenge wasn't adding more—it was knowing what to leave out.

The most important lesson? **Good design is invisible.** When users don't notice your interface, that's when you know you've succeeded.

---

_Mudo is available on the App Store. Built with love and lots of coffee._
