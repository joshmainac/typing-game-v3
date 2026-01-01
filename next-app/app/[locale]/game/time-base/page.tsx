import { getTextByKeyword, getRandomTextByNumber } from "@/lib/text/getTextDict"

export default function TimeBasePage() {
    // Example usage: get text by keyword
    const textByKeyword = getTextByKeyword("mid")
    
    // Example usage: get text by keyword and length
    const textByNumber = getRandomTextByNumber("mid", 200)
    
    return (
        <div>
            <h1>Time Base</h1>
            <p>{textByKeyword}</p>
            <p>{textByNumber}</p>
        </div>
    )
}