document.addEventListener('DOMContentLoaded', () => {
    const quizQuestionElem = document.getElementById('quiz-question');
    const quizOptionsElem = document.getElementById('quiz-options');
    const quizFeedbackElem = document.getElementById('quiz-feedback');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    let currentQuestionIndex = 0;
    let quizActive = false; // To prevent multiple clicks

    // Pinyin tone questions (Pinyin, Correct Tone Number)
    const pinyinQuizQuestions = [
        { pinyin: "mā", correctTone: 1 },
        { pinyin: "má", correctTone: 2 },
        { pinyin: "mǎ", correctTone: 3 },
        { pinyin: "mà", correctTone: 4 },
        { pinyin: "hǎo", correctTone: 3 },
        { pinyin: "nǐ", correctTone: 3 },
        { pinyin: "xiè", correctTone: 4 },
        { pinyin: "zài", correctTone: 4 },
        { pinyin: "bù", correctTone: 4 },
        { pinyin: "tā", correctTone: 1 }
    ];

    function initializeQuiz() {
        currentQuestionIndex = 0;
        quizFeedbackElem.textContent = '';
        quizFeedbackElem.className = ''; // Clear previous feedback styling
        startQuizBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        quizQuestionElem.textContent = 'ກົດປຸ່ມ "ເລີ່ມ Quiz" ເພື່ອເລີ່ມຕົ້ນ!';
        disableOptions(true); // Disable options initially
    }

    function displayQuestion() {
        if (currentQuestionIndex < pinyinQuizQuestions.length) {
            const question = pinyinQuizQuestions[currentQuestionIndex];
            quizQuestionElem.textContent = `Pinyin: "${question.pinyin}" ແມ່ນສຽງວັນນະຍຸດໃດ?`;
            quizFeedbackElem.textContent = '';
            quizFeedbackElem.className = '';
            disableOptions(false); // Enable options for new question
            quizActive = true;
        } else {
            quizQuestionElem.textContent = 'ຈົບ Quiz ແລ້ວ! ຍິນດີດ້ວຍ!';
            quizOptionsElem.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            quizActive = false;
        }
    }

    function handleAnswer(event) {
        if (!quizActive) return; // Prevent multiple clicks

        const selectedTone = parseInt(event.target.dataset.value);
        const correctTone = pinyinQuizQuestions[currentQuestionIndex].correctTone;

        disableOptions(true); // Disable options after selection
        quizActive = false; // Deactivate quiz for current question

        if (selectedTone === correctTone) {
            quizFeedbackElem.textContent = 'ຖືກຕ້ອງ!';
            quizFeedbackElem.classList.add('correct');
        } else {
            quizFeedbackElem.textContent = `ຜິດ! ຄໍາຕອບທີ່ຖືກຕ້ອງແມ່ນ Tone ${correctTone}.`;
            quizFeedbackElem.classList.add('incorrect');
        }

        if (currentQuestionIndex < pinyinQuizQuestions.length - 1) {
            nextQuestionBtn.style.display = 'block';
        } else {
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            nextQuestionBtn.style.display = 'none';
        }
    }

    function disableOptions(disabled) {
        Array.from(quizOptionsElem.children).forEach(button => {
            if (disabled) {
                button.classList.add('disabled');
                button.removeEventListener('click', handleAnswer);
            } else {
                button.classList.remove('disabled');
                button.addEventListener('click', handleAnswer);
            }
        });
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0; // Reset for a new quiz
        quizOptionsElem.style.display = 'block'; // Ensure options are visible
        startQuizBtn.style.display = 'none';
        displayQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        nextQuestionBtn.style.display = 'none';
        displayQuestion();
    });

    // Initialize the quiz when the page loads
    initializeQuiz();
});
