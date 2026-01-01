import { getHistoryByUserId } from "@/lib/data/user_history"
import { notFound } from "next/navigation"

interface HistoryDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function HistoryDetailPage({ params }: HistoryDetailPageProps) {
    const { id } = await params
    
    if (!id) {
        notFound()
    }

    const history = await getHistoryByUserId(id)

    if (!history || history.length === 0) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>History</h1>
                <p>No history found for this user.</p>
            </div>
        )
    }

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h1>Typing History</h1>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
                Showing {history.length} {history.length === 1 ? "entry" : "entries"}
            </p>
            <div style={{ display: "grid", gap: "1rem" }}>
                {history.map((entry, index) => (
                    <div
                        key={`${entry.id}-${entry.created_at}-${index}`}
                        style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "1.5rem",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Session {history.length - index}</h2>
                                <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.875rem" }}>
                                    {new Date(entry.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
                                    {entry.wpm} WPM
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div>
                                <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.25rem" }}>Accuracy</div>
                                <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>{entry.accuracy.toFixed(1)}%</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.25rem" }}>Duration</div>
                                <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>{entry.duration}s</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.25rem" }}>Mode</div>
                                <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>{entry.mode}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
