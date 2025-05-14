import { EventProvider } from '../events/EventContext';
import Navigation from '../components/Navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EventProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </EventProvider>
      </body>
    </html>
  );
}
