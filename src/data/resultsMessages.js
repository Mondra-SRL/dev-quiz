// an object to hold all the results messages 

export const QUIZ_STATUS_MESSAGES = {
    completed: 'Quiz Completed!',
    expired: "Time's Up!",
}
// performance messages array
const PERFORMANCE_BANDS = [
    {
        minPercentage: 90, 
        title: "Excellent",
        messages: [
            "Outstanding result!", "You're mastering this topic.",
        ]
    },
    {
        minPercentage: 70, 
        title: "Well Done",
        messages: [
            "Nice work!", "You're building strong knowledge.",
        ]
    },
    {
        minPercentage: 40, 
        title: "Good Effort",
        messages: [
            "You're making progress!", "A little more practice will go a long way.",
        ]
    },
    {
        minPercentage: 0, 
        title: "Needs Improvement", 
        messages: [ 
            "Keep practicing.", "Review Fundamentals and try again.",
        ]
    }
]
// a small helper that does find and always return something (fall back to the last band)
export function getPerformanceBand(percentage){
    return (
        PERFORMANCE_BANDS.find((band) => percentage >= band.minPercentage) ??
        PERFORMANCE_BANDS[PERFORMANCE_BANDS.length - 1]
    )
}