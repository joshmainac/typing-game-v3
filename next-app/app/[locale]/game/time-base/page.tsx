import { getTextByMode } from "@/lib/text/getTextDict"

export default function TimeBasePage() {
    // Get text by mode (easy mode: keyword "easy" with length 100)
    const text = getTextByMode("easy")
    
    return (
        <div>
            <h1>Time Base</h1>
            <p>{text}</p>
        </div>
    )
}