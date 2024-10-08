export type IntervalType = 'exercise' | 'rest' | 'warmup' | 'cooldown';

interface Interval {
    type: IntervalType;
    name: string;
    duration: number;
}

export function getIntervals(): Interval[] {
    return [
        {
            type: 'exercise',
            name: 'Exercise',
            duration: 5 * 1000,
        },
        {
            type: 'rest',
            name: 'Rest',
            duration: 2 * 1000,
        },
        {
            type: 'exercise',
            name: 'Exercise',
            duration: 5 * 1000,
        },
        {
            type: 'rest',
            name: 'Rest',
            duration: 2 * 1000,
        },
    ];
}
