---
title: "Testing K8s Auto-healing with ChaosForge-Lab"
date: "2026-09-02"
categories: ["ChaosForge-Lab", "DevOps"]
excerpt: "Today we implemented the CPU stress button and watched Kubernetes auto-recover."
---
### Welcome to ChaosForge-Lab

Today, I implemented a new feature in my chaos engineering tool. When I press the **CPU Stress** button, it intentionally maxes out the CPU on a targeted pod. 

```bash
# The command running under the hood
stress --cpu 4 --timeout 60s