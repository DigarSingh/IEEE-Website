"use client";

import { useState, useEffect } from 'react';
import { useEventListener, useEventEmitter } from '../events/EventContext';

export function EventSubscriber() {
  const [events, setEvents] = useState([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState({
    message: true,
    notification: false,
    alert: false
  });
  
  const eventEmitter = useEventEmitter();
  
  // Handle events when subscribed
  const handleEvent = (type, data) => {
    setEvents(prev => [
      { 
        id: Date.now(), 
        type, 
        data,
        receivedAt: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 9) // Keep only the last 10 events
    ]);
  };
  
  // Set up message event listener if subscribed
  useEventListener('message', (data) => {
    if (activeSubscriptions.message) {
      handleEvent('message', data);
    }
  });
  
  // Subscribe/unsubscribe to events dynamically
  useEffect(() => {
    const notificationHandler = data => handleEvent('notification', data);
    const alertHandler = data => handleEvent('alert', data);
    
    // Set up subscription for notification
    let notificationUnsubscribe;
    if (activeSubscriptions.notification) {
      notificationUnsubscribe = eventEmitter.on('notification', notificationHandler);
    }
    
    // Set up subscription for alert
    let alertUnsubscribe;
    if (activeSubscriptions.alert) {
      alertUnsubscribe = eventEmitter.on('alert', alertHandler);
    }
    
    // Clean up subscriptions
    return () => {
      if (notificationUnsubscribe) notificationUnsubscribe();
      if (alertUnsubscribe) alertUnsubscribe();
    };
  }, [activeSubscriptions, eventEmitter]);
  
  const toggleSubscription = (type) => {
    setActiveSubscriptions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(activeSubscriptions).map(type => (
          <button
            key={type}
            onClick={() => toggleSubscription(type)}
            className={`px-3 py-1 text-sm rounded ${
              activeSubscriptions[type] 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            {type} {activeSubscriptions[type] ? '(on)' : '(off)'}
          </button>
        ))}
      </div>
      
      <div className="overflow-y-auto border rounded max-h-64">
        {events.length === 0 ? (
          <p className="p-4 text-gray-500">No events received yet</p>
        ) : (
          <ul className="divide-y">
            {events.map(event => (
              <li key={event.id} className="p-3">
                <div className="flex justify-between">
                  <span className="font-medium capitalize">{event.type}</span>
                  <span className="text-xs text-gray-500">{event.receivedAt}</span>
                </div>
                <p className="text-sm">{event.data.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
