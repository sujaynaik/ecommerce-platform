type AuthEvent = "unauthorized";

type Listener = () => void;

const listeners = new Map<AuthEvent, Set<Listener>>();

export function on(
    event: AuthEvent,
    listener: Listener
) {
    if (!listeners.has(event)) {
        listeners.set(event, new Set());
    }

    listeners.get(event)!.add(listener);

    return () => {
        // Unsubscribe
        listeners.get(event)?.delete(listener);
    };
}

export function emit(event: AuthEvent) {
    listeners.get(event)?.forEach(listener => listener());
}