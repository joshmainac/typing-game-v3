import { getTextByMode, getValidModes, type Mode } from "@/lib/text/getTextDict"
import { notFound } from "next/navigation"

export default async function TimeBaseModePage({
    params,
}: {
    params: Promise<{ mode: string }>
}) {
    const { mode } = await params
    const validModes = getValidModes()
    
    if (!validModes.includes(mode as Mode)) {
        notFound()
    }
    
    const text = getTextByMode(mode as Mode)
    
    return (
        <div>
            <h1>Time Base - {mode.toUpperCase()}</h1>
            <p>{text}</p>
        </div>
    )
}

