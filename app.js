// Zetto Wallet Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initDashboard();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize charts
    initCharts();
    
    // Add interactive animations
    initAnimations();
    
    // Add KPI value animations
    animateKPIValues();
});

function initDashboard() {
    console.log('Zetto Wallet Dashboard initialized');
    
    // Show overview section by default
    showSection('overview');
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.scrollTop = 0;
        
        // Initialize section-specific features
        initSectionFeatures(sectionId);
    }
}

function initSectionFeatures(sectionId) {
    switch(sectionId) {
        case 'social-issues':
            // Initialize timeline chart if not already created
            if (!document.querySelector('#timelineChart').hasAttribute('data-initialized')) {
                createTimelineChart();
            }
            break;
        case 'competitive-advantage':
            // Initialize comparison chart if not already created
            if (!document.querySelector('#comparisonChart')) {
                createComparisonChart();
            }
            break;
        case 'business-model':
            // Initialize business model interactions
            initBusinessModelInteractions();
            break;
    }
}

function initCharts() {
    // Charts will be initialized when their sections are first viewed
    // This improves initial load performance
}

function createTimelineChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) return;
    
    canvas.setAttribute('data-initialized', 'true');
    
    const ctx = canvas.getContext('2d');
    
    // Timeline data from the provided JSON
    const timelineData = [
        {month: "1月", access: 43, transactions: 39, damage: 1.6},
        {month: "2月", access: 43, transactions: 39, damage: 1.6}, 
        {month: "3月", access: 1420, transactions: 736, damage: 257},
        {month: "4月", access: 6380, transactions: 2746, damage: 2886},
        {month: "5月", access: 10422, transactions: 5958, damage: 5240}
    ];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timelineData.map(d => d.month),
            datasets: [
                {
                    label: '不正アクセス数',
                    data: timelineData.map(d => d.access),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: '不正取引数',
                    data: timelineData.map(d => d.transactions),
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: '被害総額（億円）',
                    data: timelineData.map(d => d.damage),
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '証券口座乗っ取り被害の推移（2025年1月〜5月）',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '件数'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '被害額（億円）'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            }
        }
    });
}

function createComparisonChart() {
    const comparisonSection = document.querySelector('#competitive-advantage');
    if (!comparisonSection) return;
    
    // Create chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    chartContainer.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">防御効果の総合比較</h3>
        <canvas id="comparisonChart" style="height: 400px !important;"></canvas>
    `;
    chartContainer.style.cssText = `
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
    `;
    
    comparisonSection.appendChild(chartContainer);
    
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['フィッシング', 'インフォスティーラー', 'AiTM攻撃', 'セッション窃取'],
            datasets: [
                {
                    label: 'SMS認証',
                    data: [30, 0, 0, 0],
                    backgroundColor: 'rgba(255, 193, 133, 0.2)',
                    borderColor: '#FFC185',
                    borderWidth: 2
                },
                {
                    label: 'FIDO2/パスキー',
                    data: [90, 0, 0, 0],
                    backgroundColor: 'rgba(180, 65, 60, 0.2)',
                    borderColor: '#B4413C',
                    borderWidth: 2
                },
                {
                    label: 'Zetto Wallet',
                    data: [95, 95, 95, 95],
                    backgroundColor: 'rgba(31, 184, 205, 0.3)',
                    borderColor: '#1FB8CD',
                    borderWidth: 3,
                    pointBackgroundColor: '#1FB8CD'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

function initBusinessModelInteractions() {
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            businessCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Add visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

function animateKPIValues() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    
    kpiValues.forEach(value => {
        const finalValueText = value.textContent.replace(/,/g, '');
        const finalValue = parseInt(finalValueText);
        
        if (isNaN(finalValue)) return;
        
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(finalValue * easedProgress);
            
            // Format with commas for Japanese locale
            value.textContent = currentValue.toLocaleString('ja-JP');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value is exactly what was intended
                value.textContent = finalValue.toLocaleString('ja-JP');
            }
        }
        
        // Start animation after a delay
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 500);
    });
}

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effects to KPI cards
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to comparison table rows
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove active class from all rows
            tableRows.forEach(r => r.classList.remove('active-row'));
            // Add active class to clicked row
            this.classList.add('active-row');
        });
    });
    
    // Add pulse effect to critical stats
    const criticalStats = document.querySelectorAll('.kpi-card.critical .kpi-value');
    criticalStats.forEach(stat => {
        setInterval(() => {
            stat.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                stat.style.animation = '';
            }, 2000);
        }, 8000);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentActive = document.querySelector('.nav-link.active');
    const currentIndex = Array.from(navLinks).indexOf(currentActive);
    
    let newIndex = currentIndex;
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            newIndex = (currentIndex + 1) % navLinks.length;
            break;
        case 'ArrowUp':
            e.preventDefault();
            newIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
            break;
        case 'Enter':
            if (currentActive) {
                e.preventDefault();
                currentActive.click();
            }
            break;
    }
    
    if (newIndex !== currentIndex) {
        navLinks[newIndex].focus();
        navLinks[newIndex].click();
    }
});

// Add scroll progress indicator for each section
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: var(--sidebar-width);
        width: calc(100% - var(--sidebar-width));
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
        z-index: 9999;
        transition: width 0.25s ease;
        transform-origin: left;
        transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);
    
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('scroll', () => {
        const scrollTop = mainContent.scrollTop;
        const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });
}

// Initialize scroll progress after page load
setTimeout(addScrollProgress, 500);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .active-row {
        background: linear-gradient(135deg, rgba(31, 184, 205, 0.2) 0%, rgba(29, 116, 128, 0.2) 100%) !important;
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(31, 184, 205, 0.3);
    }
    
    .selected {
        border-color: var(--color-primary) !important;
        border-width: 2px !important;
        box-shadow: 0 8px 25px rgba(31, 184, 205, 0.3) !important;
    }
    
    .chart-container canvas {
        height: 400px !important;
    }
    
    /* Loading animation for section transitions */
    .content-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease-in-out;
    }
    
    .content-section.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Responsive navigation for mobile */
    @media (max-width: 768px) {
        #scroll-progress {
            left: 0 !important;
            width: 100% !important;
        }
        
        .nav-menu {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-8);
        }
        
        .nav-item {
            margin-bottom: 0;
        }
        
        .nav-link {
            padding: var(--space-8) var(--space-12);
            font-size: var(--font-size-sm);
        }
        
        .nav-text {
            display: none;
        }
        
        .nav-icon {
            margin-right: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth transitions for better UX
function addSmoothTransitions() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.transition = 'all 0.3s ease-in-out';
    });
}

// Initialize smooth transitions
setTimeout(addSmoothTransitions, 100);

// Add section-specific initialization
function initSectionSpecificFeatures() {
    // Add click-to-expand functionality for threat cards
    const threatCards = document.querySelectorAll('.threat-card');
    threatCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '10';
            } else {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            }
        });
    });
    
    // Add hover effects to market segments
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        segment.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize section-specific features
setTimeout(initSectionSpecificFeatures, 1000);

console.log('Zetto Wallet Dashboard fully loaded and interactive!');

// Add performance monitoring
window.addEventListener('load', function() {
    console.log('Dashboard load time:', performance.now(), 'ms');
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
});

// Export functions for testing
window.zettoWalletDashboard = {
    showSection,
    initCharts,
    animateKPIValues
};