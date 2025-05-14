"use client";

import { useState } from 'react';
import { useEventEmitter } from '../events/EventContext';

export function EventPublisher({ onEventPublished }) {
  const eventEmitter = useEventEmitter();
  const [message, setMessage] = useState('');
  const [eventType, setEventType] = useState('message');
  
  const publishEvent = () => {
    if (!message.trim()) return;
    
    const payload = { 
      message,
      timestamp: new Date().toISOString()
    };
    
    eventEmitter.emit(eventType, payload);
    onEventPublished && onEventPublished();
    setMessage('');
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Event Type
        </label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="message">Message</option>
          <option value="notification">Notification</option>
          <option value="alert">Alert</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Message
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter message content"
        />
      </div>
      
      <button
        onClick={publishEvent}
        disabled={!message.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        Publish Event
      </button>
    </div>
  );
}
