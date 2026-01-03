// Collection of English text passages for typing practice organized by content keyword
type TextKeyword = "lowercase" | "mixed-case" | "numbers-symbols";
export type Mode = "easy" | "mid" | "hard";

const texts: Record<TextKeyword, string> = {
    lowercase: "a beautiful morning brings sunshine through the window. birds sing their cheerful songs while flowers bloom in the garden. the gentle breeze carries the sweet scent of spring. children play outside with laughter filling the air. nature always finds a way to bring joy and happiness to our lives.",
    "mixed-case": "Learning new skills opens doors to exciting opportunities. Technology continues to evolve rapidly, changing how we work and communicate. The internet connects people across vast distances instantly. Creative thinking and problem solving are valuable abilities in today world. Knowledge is power when applied wisely.",
    "numbers-symbols": "JavaScript developers use async/await for promises. Code reviews check for bugs & optimize performance (avg 50-100ms). Version control: git commit -m \"feat: add feature\". API endpoints return JSON: {status: 200, data: [...]}. Testing ensures 95%+ code coverage. Deploy @ 2:00 PM UTC. Cost: $0.05/request.",
};

// Mode configuration: maps mode to text keyword and text length
const modeConfig: Record<Mode, { keyword: TextKeyword; length: number }> = {
    easy: { keyword: "lowercase", length: 30 },
    mid: { keyword: "mixed-case", length: 300 },
    hard: { keyword: "numbers-symbols", length: 300 },
};

/**
 * Gets text by content keyword
 * @param keyword The text content keyword (e.g., "lowercase", "mixed-case", "numbers-symbols")
 * @returns A string containing English text for the specified keyword
 */
export function getTextByKeyword(keyword: TextKeyword): string {
    return texts[keyword] || texts["mixed-case"];
}

/**
 * Gets text by keyword and repeats it to reach the desired length
 * @param keyword The text content keyword (e.g., "lowercase", "mixed-case", "numbers-symbols")
 * @param length The desired length (number of characters) for the text
 * @returns A string containing English text repeated to approximately match the desired length
 */
export function getRandomTextByNumber(keyword: TextKeyword, length: number): string {
    const baseText = texts[keyword] || texts["mixed-case"];
    
    if (length <= 0) {
        return baseText;
    }
    
    // Repeat the text until we reach or exceed the desired length
    let result = "";
    while (result.length < length) {
        result += baseText + " ";
    }
    
    // Trim to the exact length if needed, or return the result
    return result.substring(0, length).trim();
}

/**
 * Gets text by mode, which includes both keyword and text length
 * @param mode The mode: "easy" (keyword: lowercase, length: 100), "mid" (keyword: mixed-case, length: 200), or "hard" (keyword: numbers-symbols, length: 300)
 * @returns A string containing English text repeated to match the mode's configured length
 */
export function getTextByMode(mode: Mode): string {
    const config = modeConfig[mode] || modeConfig.mid;
    return getRandomTextByNumber(config.keyword, config.length);
}

/**
 * Returns an array of valid modes
 * @returns An array of valid mode strings: ["easy", "mid", "hard"]
 */
export function getValidModes(): Mode[] {
    return ["easy", "mid", "hard"];
}
