// Quiz answers key
const quizAnswers = {
    1: {
        q1: 'b',
        q2: 'a',
        q3: 'c'
    },
    2: {
        q4: 'b',
        q5: 'b',
        q6: 'b'
    },
    3: {
        q7: 'b',
        q8: 'b',
        q9: 'c'
    },
    4: {
        q10: 'b',
        q11: 'b',
        q12: 'b'
    },
    5: {
        q13: 'a',
        q14: 'c',
        q15: 'b'
    }
};

// Show specific day
function showDay(dayNumber) {
    // Hide all day content
    const dayContents = document.querySelectorAll('.day-content');
    dayContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected day
    const selectedDay = document.getElementById(`day${dayNumber}`);
    if (selectedDay) {
        selectedDay.classList.add('active');
    }

    // Add active class to clicked button
    buttons[dayNumber - 1].classList.add('active');

    // Clear quiz results when switching days
    const quizResult = document.getElementById(`quiz${dayNumber}-result`);
    if (quizResult) {
        quizResult.classList.remove('show', 'correct', 'incorrect');
        quizResult.innerHTML = '';
    }
}

// Submit quiz
function submitQuiz(dayNumber) {
    const answers = quizAnswers[dayNumber];
    let correctCount = 0;
    let totalQuestions = Object.keys(answers).length;
    let feedback = '';

    // Get all questions for this day
    const questions = Object.keys(answers);
    
    for (let question of questions) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        
        if (!userAnswer) {
            feedback += `<p>❌ Question ${questions.indexOf(question) + 1}: Please select an answer</p>`;
            continue;
        }
        
        if (userAnswer.value === answers[question]) {
            correctCount++;
            const questionNum = questions.indexOf(question) + 1;
            feedback += `<p>✓ Question ${questionNum}: Correct!</p>`;
        } else {
            const questionNum = questions.indexOf(question) + 1;
            feedback += `<p>✗ Question ${questionNum}: Incorrect. The correct answer is option ${answers[question].toUpperCase()}</p>`;
        }
    }

    // Calculate percentage
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    // Display result
    const resultDiv = document.getElementById(`quiz${dayNumber}-result`);
    resultDiv.classList.add('show');
    
    if (percentage >= 70) {
        resultDiv.classList.add('correct');
        resultDiv.classList.remove('incorrect');
        resultDiv.innerHTML = `<h4>🎉 Great Job!</h4><p>You scored ${correctCount}/${totalQuestions} (${percentage}%)</p>${feedback}`;
    } else {
        resultDiv.classList.add('incorrect');
        resultDiv.classList.remove('correct');
        resultDiv.innerHTML = `<h4>⚠️ Need More Review</h4><p>You scored ${correctCount}/${totalQuestions} (${percentage}%)</p><p>Review the lesson material and try again!</p>${feedback}`;
    }

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    showDay(1);
});
