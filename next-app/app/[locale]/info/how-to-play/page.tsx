export default function HowToPlay() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="text-2xl font-bold mb-6">How to Play</h1>

            <h2 className="text-lg font-semibold mt-6 mb-2">
                Getting Started
            </h2>
            <p className="mb-4">
                Welcome to cloudtyping.com! This is a typing practice game designed to help you improve your typing speed and accuracy. Simply select a game mode and start typing the text displayed on your screen.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2">
                Game Modes
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Time-based:</strong> Type as much as you can within a set time limit. Your words per minute (WPM) and accuracy are calculated at the end.</li>
                <li><strong>Count-based:</strong> Complete typing a specific amount of text. Your speed and accuracy are measured as you progress.</li>
                <li><strong>Manual End:</strong> Type at your own pace and end the game when you're ready. Perfect for practicing without time pressure.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">
                Difficulty Levels
            </h2>
            <p className="mb-4">
                Each game mode offers different difficulty levels (Easy, Medium, Hard) with varying text complexity and length. Start with Easy and work your way up as you improve!
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2">
                Tips for Success
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Focus on accuracy first, speed will come with practice</li>
                <li>Keep your eyes on the text, not on your keyboard</li>
                <li>Use proper finger positioning on the keyboard</li>
                <li>Practice regularly to build muscle memory</li>
                <li>Take breaks to avoid fatigue</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">
                Tracking Your Progress
            </h2>
            <p className="mb-4">
                When you sign in, your typing history and statistics are saved. You can view your past results and track your improvement over time in the History section.
            </p>
        </main>
    )
}

