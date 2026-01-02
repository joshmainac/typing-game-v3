'use client'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            <h1>Something went wrong!</h1>
            <p>Error: {error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    )
}

