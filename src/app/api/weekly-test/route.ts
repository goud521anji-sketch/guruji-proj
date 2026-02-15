import { NextResponse } from 'next/server';
import { QUESTION_BANK } from '@/data/question_bank';
import { Question } from '@/types/assessment';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const domainQuestions = QUESTION_BANK.filter(q =>
        q.domain.toLowerCase() === domain.toLowerCase()
    );

    if (domainQuestions.length < 5) {
        // If not enough questions, return all
        return NextResponse.json(domainQuestions);
    }

    // Shuffle and pick 10 (or max available)
    const shuffled = [...domainQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    return NextResponse.json(selected);
}
