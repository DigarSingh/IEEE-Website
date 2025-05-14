"use client";

import React, { createContext, useContext, useCallback, useRef } from 'react';

// Create context for our event system
const EventContext = createContext(null);

/**
 * Event emitter implementation for Next.js
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }
}

/**
 * Provider component for the event system
 */
export function EventProvider({ children }) {
  // Use ref to ensure the emitter instance persists across renders
  const emitterRef = useRef(new EventEmitter());
  
  return (
    <EventContext.Provider value={emitterRef.current}>
      {children}
    </EventContext.Provider>
  );
}

/**
 * Hook to use the event emitter
 */
export function useEventEmitter() {
  const emitter = useContext(EventContext);
  if (!emitter) {
    throw new Error('useEventEmitter must be used within an EventProvider');
  }
  return emitter;
}

/**
 * Hook to subscribe to an event
 */
export function useEventListener(event, callback) {
  const emitter = useEventEmitter();
  
  // Wrap callback in useCallback to prevent unnecessary re-subscriptions
  const stableCallback = useCallback(callback, [callback]);
  
  React.useEffect(() => {
    const unsubscribe = emitter.on(event, stableCallback);
    return () => unsubscribe();
  }, [emitter, event, stableCallback]);
}
