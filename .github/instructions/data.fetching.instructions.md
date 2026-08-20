---
description: Guidelines for data fetching patterns and best practices.
---

# Data Fetching Guidelines

This document outlines the recommended data fetching patterns and best practices for the project. Adhering to these guidelines will ensure consistency, maintainability, and performance across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js ALWAYS use server components for data fetching. NEVER use Client Components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database insteractions.
