// Collection of English text passages for typing practice organized by difficulty
type Difficulty = "easy" | "mid" | "hard";
export type Mode = "easy" | "mid" | "hard";

const texts: Record<Difficulty, string> = {
    easy: "The quick brown fox jumps over the lazy dog.",
    mid: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once. Programming is the art of telling a computer what to do through a series of instructions.",
    hard: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once. Typing practice helps improve your speed and accuracy over time. Consistent practice is essential for mastering any skill, including keyboard proficiency. Programming requires logic, creativity, and patience to solve complex problems.",
};

// Mode configuration: maps mode to keyword and text length
const modeConfig: Record<Mode, { keyword: Difficulty; length: number }> = {
    easy: { keyword: "easy", length: 100 },
    mid: { keyword: "mid", length: 200 },
    hard: { keyword: "hard", length: 300 },
};

/**
 * Gets text by keyword (difficulty level)
 * @param keyword The difficulty keyword: "easy", "mid", or "hard"
 * @returns A string containing English text for the specified difficulty
 */
export function getTextByKeyword(keyword: Difficulty): string {
    return texts[keyword] || texts.mid;
}

/**
 * Gets text by keyword and repeats it to reach the desired length
 * @param keyword The difficulty keyword: "easy", "mid", or "hard"
 * @param length The desired length (number of characters) for the text
 * @returns A string containing English text repeated to approximately match the desired length
 */
export function getRandomTextByNumber(keyword: Difficulty, length: number): string {
    const baseText = texts[keyword] || texts.mid;
    
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
 * @param mode The mode: "easy" (keyword: easy, length: 100), "mid" (keyword: mid, length: 200), or "hard" (keyword: hard, length: 300)
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
