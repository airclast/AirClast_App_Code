
import React, { useState, useCallback } from 'react';
import { generateImmersiveStory } from '../services/geminiService';
import { SparklesIcon } from './icons';

const storyTopics = [
    "The journey of PM2.5 particles",
    "How ozone forms on a sunny day",
    "The impact of a large wildfire on air quality miles away",
    "A future with 100% clean energy and clear skies"
];

export const ImmersiveStory: React.FC = () => {
    const [topic, setTopic] = useState<string>(storyTopics[0]);
    const [story, setStory] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateStory = useCallback(async () => {
        if (!topic) return;
        setIsLoading(true);
        setError(null);
        setStory('');
        try {
            const stream = await generateImmersiveStory(topic);
            for await (const chunk of stream) {
                setStory(prev => prev + chunk.text);
            }
        } catch (e) {
            console.error(e);
            setError("Failed to generate story. The AI may be busy.");
        } finally {
            setIsLoading(false);
        }
    }, [topic]);

    return (
        <div className="mt-12 p-6 bg-slate-800/60 rounded-lg shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-3" />
                Immersive Storytelling
            </h2>
            <p className="text-slate-400 mb-4">Select a topic to generate an immersive story about our atmosphere.</p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <select 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="flex-grow bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    disabled={isLoading}
                >
                    {storyTopics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button
                    onClick={handleGenerateStory}
                    disabled={isLoading}
                    className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {isLoading ? 'Weaving narrative...' : 'Generate Story'}
                </button>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {story && (
                <div className="mt-6 p-4 bg-slate-900/50 rounded-md border border-slate-700">
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{story}</p>
                </div>
            )}
        </div>
    );
};
