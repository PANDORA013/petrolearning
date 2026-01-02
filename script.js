// Course data
const courses = {
    1: {
        title: "Petroleum Geology Basics",
        description: "Master the fundamentals of petroleum geology and understand how hydrocarbons are formed and trapped underground.",
        modules: [
            {
                title: "Module 1: Introduction to Petroleum Geology",
                topics: [
                    "What is petroleum geology?",
                    "History of petroleum exploration",
                    "Importance in the energy sector",
                    "Career opportunities"
                ]
            },
            {
                title: "Module 2: Rock Types and Properties",
                topics: [
                    "Sedimentary rocks",
                    "Igneous and metamorphic rocks",
                    "Rock porosity and permeability",
                    "Reservoir characterization"
                ]
            },
            {
                title: "Module 3: Hydrocarbon Formation",
                topics: [
                    "Organic matter accumulation",
                    "Thermal maturation process",
                    "Oil and gas generation",
                    "Migration and accumulation"
                ]
            },
            {
                title: "Module 4: Traps and Reservoirs",
                topics: [
                    "Structural traps",
                    "Stratigraphic traps",
                    "Combination traps",
                    "Seal rocks and cap rocks"
                ]
            }
        ],
        quiz: {
            question: "What is the primary requirement for a petroleum reservoir?",
            options: [
                "High temperature only",
                "Porosity and permeability",
                "Volcanic activity",
                "Deep ocean environment"
            ],
            correct: 1
        }
    },
    2: {
        title: "Drilling Engineering",
        description: "Learn the principles and practices of drilling operations, equipment, and safety procedures.",
        modules: [
            {
                title: "Module 1: Drilling Fundamentals",
                topics: [
                    "Introduction to drilling operations",
                    "Types of drilling rigs",
                    "Rotary drilling systems",
                    "Drilling crew and responsibilities"
                ]
            },
            {
                title: "Module 2: Drilling Equipment",
                topics: [
                    "Drill string components",
                    "Drill bits and their selection",
                    "Mud pumps and circulation systems",
                    "Blowout preventers (BOPs)"
                ]
            },
            {
                title: "Module 3: Drilling Fluids",
                topics: [
                    "Functions of drilling mud",
                    "Types of drilling fluids",
                    "Mud properties and testing",
                    "Mud weight calculations"
                ]
            },
            {
                title: "Module 4: Drilling Operations & Safety",
                topics: [
                    "Drilling procedures",
                    "Well control",
                    "Kick detection and prevention",
                    "HSE in drilling operations"
                ]
            }
        ],
        quiz: {
            question: "What is the primary function of drilling mud?",
            options: [
                "Lubricate the drill bit only",
                "Cool the bit, remove cuttings, and maintain pressure",
                "Increase drilling speed",
                "Reduce equipment costs"
            ],
            correct: 1
        }
    },
    3: {
        title: "Reservoir Engineering",
        description: "Study reservoir behavior, fluid properties, and production optimization techniques.",
        modules: [
            {
                title: "Module 1: Reservoir Properties",
                topics: [
                    "Porosity and permeability",
                    "Fluid saturation",
                    "Capillary pressure",
                    "Relative permeability"
                ]
            },
            {
                title: "Module 2: Reservoir Fluids",
                topics: [
                    "Oil properties and classification",
                    "Natural gas properties",
                    "Water properties",
                    "PVT analysis"
                ]
            },
            {
                title: "Module 3: Material Balance",
                topics: [
                    "Material balance equations",
                    "Drive mechanisms",
                    "Recovery factor estimation",
                    "Reserves calculation"
                ]
            },
            {
                title: "Module 4: Production Forecasting",
                topics: [
                    "Decline curve analysis",
                    "Production optimization",
                    "Enhanced oil recovery (EOR)",
                    "Reservoir simulation"
                ]
            }
        ],
        quiz: {
            question: "What does PVT stand for in reservoir engineering?",
            options: [
                "Pressure Volume Temperature",
                "Production Value Total",
                "Petroleum Viscosity Testing",
                "Pore Volume Thickness"
            ],
            correct: 0
        }
    },
    4: {
        title: "Production Operations",
        description: "Explore production systems, facilities, and operations management.",
        modules: [
            {
                title: "Module 1: Production Systems",
                topics: [
                    "Wellhead and christmas tree",
                    "Flow lines and gathering systems",
                    "Artificial lift methods",
                    "Well testing and monitoring"
                ]
            },
            {
                title: "Module 2: Surface Facilities",
                topics: [
                    "Separation systems",
                    "Gas treatment facilities",
                    "Water treatment",
                    "Storage and export systems"
                ]
            },
            {
                title: "Module 3: Production Optimization",
                topics: [
                    "Production monitoring",
                    "Well performance analysis",
                    "Troubleshooting production issues",
                    "Production enhancement techniques"
                ]
            },
            {
                title: "Module 4: Maintenance & Integrity",
                topics: [
                    "Equipment maintenance",
                    "Corrosion management",
                    "Pipeline integrity",
                    "Asset management"
                ]
            }
        ],
        quiz: {
            question: "What is the purpose of a separator in production facilities?",
            options: [
                "Increase oil temperature",
                "Separate oil, gas, and water",
                "Store crude oil",
                "Generate electricity"
            ],
            correct: 1
        }
    },
    5: {
        title: "Environmental & Safety",
        description: "Understand HSE management, environmental regulations, and sustainable practices in oil & gas.",
        modules: [
            {
                title: "Module 1: HSE Fundamentals",
                topics: [
                    "Health, Safety & Environment overview",
                    "Risk assessment and management",
                    "Incident investigation",
                    "Safety culture"
                ]
            },
            {
                title: "Module 2: Environmental Protection",
                topics: [
                    "Environmental impact assessment",
                    "Waste management",
                    "Spill prevention and response",
                    "Emissions control"
                ]
            },
            {
                title: "Module 3: Regulations & Compliance",
                topics: [
                    "International standards (ISO, API)",
                    "Environmental regulations",
                    "Occupational safety laws",
                    "Audit and compliance"
                ]
            },
            {
                title: "Module 4: Sustainability",
                topics: [
                    "Sustainable development goals",
                    "Carbon footprint reduction",
                    "Renewable energy integration",
                    "Future of energy"
                ]
            }
        ],
        quiz: {
            question: "What does HSE stand for?",
            options: [
                "High Speed Engineering",
                "Health, Safety and Environment",
                "Hydrocarbon Separation Equipment",
                "Heavy Service Equipment"
            ],
            correct: 1
        }
    },
    6: {
        title: "Petroleum Economics",
        description: "Learn project evaluation, economics analysis, and decision-making in the oil & gas industry.",
        modules: [
            {
                title: "Module 1: Economic Fundamentals",
                topics: [
                    "Time value of money",
                    "Discount rate and NPV",
                    "Internal rate of return (IRR)",
                    "Cash flow analysis"
                ]
            },
            {
                title: "Module 2: Project Evaluation",
                topics: [
                    "Capital budgeting",
                    "Economic indicators",
                    "Profitability analysis",
                    "Break-even analysis"
                ]
            },
            {
                title: "Module 3: Risk & Uncertainty",
                topics: [
                    "Risk identification",
                    "Probability analysis",
                    "Decision trees",
                    "Monte Carlo simulation"
                ]
            },
            {
                title: "Module 4: Market Dynamics",
                topics: [
                    "Oil and gas pricing",
                    "Market trends and forecasting",
                    "Supply and demand",
                    "Geopolitics and energy markets"
                ]
            }
        ],
        quiz: {
            question: "What does NPV stand for in project economics?",
            options: [
                "New Production Value",
                "Net Present Value",
                "National Petroleum Venture",
                "Natural Price Variation"
            ],
            correct: 1
        }
    }
};

// Scroll to courses section
function scrollToCourses() {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle keyboard navigation for course cards
function handleCourseKeydown(event, courseId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCourse(courseId);
    }
}

// Handle keyboard navigation for close button
function handleCloseKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        closeModal();
    }
}

// Open course modal
function openCourse(courseId) {
    const course = courses[courseId];
    if (!course) {
        console.error('Course not found:', courseId);
        return;
    }
    
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    let modulesHTML = '';
    course.modules.forEach((module, index) => {
        modulesHTML += `
            <div class="module">
                <h3>${module.title}</h3>
                <ul>
                    ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    modalBody.innerHTML = `
        <h2 id="modalTitle">${course.title}</h2>
        <p style="margin-bottom: 2rem; color: #666; font-size: 1.1rem;">${course.description}</p>
        <h3 style="color: #1e3c72; margin-bottom: 1rem;">Course Modules</h3>
        ${modulesHTML}
        <div class="quiz-container">
            <h3 style="color: #856404; margin-bottom: 1rem;">📝 Quick Quiz</h3>
            <div class="quiz-question">
                <strong>${course.quiz.question}</strong>
            </div>
            <div class="quiz-options" id="quizOptions-${courseId}">
                ${course.quiz.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectOption(${courseId}, ${index})" tabindex="0" role="button" aria-label="Option ${index + 1}: ${option}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <button class="check-answer-btn" onclick="checkAnswer(${courseId})" id="checkBtn-${courseId}" disabled>
                Check Answer
            </button>
            <div id="quizResult-${courseId}" style="margin-top: 1rem; font-weight: bold;" role="alert" aria-live="polite"></div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Focus management for accessibility
    setTimeout(() => {
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.focus();
        }
    }, 100);
}

// Close modal
function closeModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Quiz functionality
let selectedAnswers = {};

function selectOption(courseId, optionIndex) {
    selectedAnswers[courseId] = optionIndex;
    
    // Remove selected class from all options
    const options = document.querySelectorAll(`#quizOptions-${courseId} .quiz-option`);
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    options[optionIndex].classList.add('selected');
    
    // Enable check button
    document.getElementById(`checkBtn-${courseId}`).disabled = false;
}

function checkAnswer(courseId) {
    const course = courses[courseId];
    const selectedAnswer = selectedAnswers[courseId];
    const resultDiv = document.getElementById(`quizResult-${courseId}`);
    const options = document.querySelectorAll(`#quizOptions-${courseId} .quiz-option`);
    const checkBtn = document.getElementById(`checkBtn-${courseId}`);
    
    // Disable check button
    checkBtn.disabled = true;
    
    // Remove all previous classes
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    if (selectedAnswer === course.quiz.correct) {
        options[selectedAnswer].classList.add('correct');
        resultDiv.innerHTML = '✅ Correct! Great job!';
        resultDiv.style.color = '#28a745';
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[course.quiz.correct].classList.add('correct');
        resultDiv.innerHTML = '❌ Incorrect. The correct answer is highlighted in green.';
        resultDiv.style.color = '#dc3545';
    }
}

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const messageDiv = document.getElementById('form-message');
    
    // Simulate form submission
    messageDiv.className = 'form-message success';
    messageDiv.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`;
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Add smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
