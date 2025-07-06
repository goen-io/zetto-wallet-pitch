// Application data
const appData = {
  companyInfo: {
    name: "goen合同会社",
    founded: "2023年",
    employees: 2,
    ceo: "高嶋生也（コニカミノルタ出身）",
    cto: "矢野義博（大日本印刷出身、280件以上の特許取得）"
  },
  socialIssue: {
    title: "証券口座乗っ取り事件の深刻化",
    totalDamage: "5,240億円",
    totalAccess: "10,422件",
    totalTransactions: "5,958件",
    affectedCompanies: 16,
    timeline: [
      {month: "2025年1月", cases: 43, damage: 1.6},
      {month: "2025年2月", cases: 43, damage: 1.6},
      {month: "2025年3月", cases: 1420, damage: 257},
      {month: "2025年4月", cases: 6380, damage: 2886},
      {month: "2025年5月", cases: 10422, damage: 5240}
    ]
  },
  attackMethods: [
    {name: "フィッシング詐欺", threat: 3, description: "偽サイトへ誘導"},
    {name: "インフォスティーラー", threat: 4, description: "認証情報窃取"},
    {name: "RTPP攻撃", threat: 5, description: "リアルタイム中継"},
    {name: "AiTM攻撃", threat: 5, description: "中間者攻撃"}
  ],
  defenseComparison: [
    {method: "パスワードのみ", phishing: 0, infostealer: 0, aitm: 0, session: 0},
    {method: "SMS OTP", phishing: 30, infostealer: 0, aitm: 0, session: 0},
    {method: "アプリOTP", phishing: 50, infostealer: 0, aitm: 0, session: 0},
    {method: "パスキー(FIDO2)", phishing: 90, infostealer: 0, aitm: 0, session: 0},
    {method: "Zetto Wallet", phishing: 95, infostealer: 95, aitm: 95, session: 95}
  ]
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// DOM elements
let damageChart, threatChart, defenseChart, costChart;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCharts();
  initInteractivity();
});

// Navigation functionality
function initNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.section');
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSection = tab.dataset.section;
      
      // Update active tab
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active section
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(targetSection).classList.add('active');
      
      // Refresh charts if needed
      setTimeout(() => {
        if (targetSection === 'problem') {
          refreshCharts();
        }
      }, 100);
    });
  });
}

// Initialize all charts
function initCharts() {
  createDamageChart();
  createThreatChart();
  createDefenseChart();
  createCostChart();
}

// Create damage timeline chart
function createDamageChart() {
  const ctx = document.getElementById('damageChart');
  if (!ctx) return;
  
  const data = appData.socialIssue.timeline;
  
  damageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.month),
      datasets: [
        {
          label: '被害額（億円）',
          data: data.map(item => item.damage),
          borderColor: chartColors[2],
          backgroundColor: chartColors[2] + '20',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 3
        },
        {
          label: '件数',
          data: data.map(item => item.cases),
          borderColor: chartColors[0],
          backgroundColor: chartColors[0] + '20',
          fill: false,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: '証券口座乗っ取り被害の推移'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '被害額（億円）'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '件数'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

// Create threat radar chart
function createThreatChart() {
  const ctx = document.getElementById('threatChart');
  if (!ctx) return;
  
  const data = appData.attackMethods;
  
  threatChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: data.map(item => item.name),
      datasets: [{
        label: '脅威レベル',
        data: data.map(item => item.threat),
        borderColor: chartColors[2],
        backgroundColor: chartColors[2] + '40',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Create defense comparison chart
function createDefenseChart() {
  const ctx = document.getElementById('defenseChart');
  if (!ctx) return;
  
  const data = appData.defenseComparison;
  const attackTypes = ['phishing', 'infostealer', 'aitm', 'session'];
  const attackLabels = ['フィッシング', 'インフォスティーラー', 'AiTM攻撃', 'セッション攻撃'];
  
  const datasets = attackTypes.map((type, index) => ({
    label: attackLabels[index],
    data: data.map(item => item[type]),
    backgroundColor: chartColors[index],
    borderColor: chartColors[index],
    borderWidth: 1
  }));
  
  defenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.method),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: '認証方式別攻撃耐性比較（%）'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: '防御率（%）'
          }
        },
        x: {
          title: {
            display: true,
            text: '認証方式'
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

// Create cost comparison chart
function createCostChart() {
  const ctx = document.getElementById('costChart');
  if (!ctx) return;
  
  costChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['SMS認証', 'Zetto Wallet'],
      datasets: [{
        label: '認証単価（円）',
        data: [20, 3], // SMS認証の平均値
        backgroundColor: [chartColors[2], chartColors[0]],
        borderColor: [chartColors[2], chartColors[0]],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: '認証コスト比較'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '単価（円）'
          }
        }
      }
    }
  });
}

// Refresh charts when switching tabs
function refreshCharts() {
  if (damageChart) damageChart.update();
  if (threatChart) threatChart.update();
  if (defenseChart) defenseChart.update();
  if (costChart) costChart.update();
}

// Initialize interactive elements
function initInteractivity() {
  // Add hover effects to KPI cards
  const kpiCards = document.querySelectorAll('.kpi-card');
  kpiCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click effects to solution cards
  const solutionCards = document.querySelectorAll('.solution-card');
  solutionCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      solutionCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked card
      card.classList.add('active');
      
      // Add some visual feedback
      card.style.transform = 'scale(1.05)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 200);
    });
  });
  
  // Add interactive timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
    });
  });
  
  // Add roadmap phase interactions
  const roadmapPhases = document.querySelectorAll('.roadmap-phase');
  roadmapPhases.forEach((phase, index) => {
    phase.addEventListener('click', () => {
      // Remove active class from all phases
      roadmapPhases.forEach(p => p.classList.remove('active'));
      // Add active class to clicked phase
      phase.classList.add('active');
      
      // Show phase details
      showPhaseDetails(index + 1);
    });
  });
  
  // Add smooth scrolling for navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = document.getElementById(tab.dataset.section);
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// Show phase details
function showPhaseDetails(phaseNumber) {
  const phases = {
    1: {
      title: '証券会社導入フェーズ',
      details: [
        '主要証券会社5社への導入',
        '月間認証回数: 500万回',
        '市場シェア: 20%獲得',
        '収益目標: 年間15億円'
      ]
    },
    2: {
      title: 'EC・決済事業者展開',
      details: [
        'リテール決済市場への本格参入',
        '月間認証回数: 1億回',
        '導入企業数: 20社',
        '収益目標: 年間50億円'
      ]
    },
    3: {
      title: 'グローバル展開',
      details: [
        '海外10カ国への展開',
        '行政システムへの導入',
        'Web3プラットフォーム連携',
        '収益目標: 年間100億円'
      ]
    }
  };
  
  const phase = phases[phaseNumber];
  if (phase) {
    // Create modal or tooltip to show details
    console.log(`Phase ${phaseNumber}:`, phase);
  }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const activeTab = document.querySelector('.nav-tab.active');
  const tabs = Array.from(document.querySelectorAll('.nav-tab'));
  const currentIndex = tabs.indexOf(activeTab);
  
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    tabs[currentIndex - 1].click();
  } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
    tabs[currentIndex + 1].click();
  }
});

// Add data update animation
function animateKPICards() {
  const kpiValues = document.querySelectorAll('.kpi-value');
  
  kpiValues.forEach(value => {
    const finalValue = value.textContent;
    const isNumeric = !isNaN(parseFloat(finalValue));
    
    if (isNumeric) {
      const numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
      let currentValue = 0;
      const increment = numValue / 50;
      
      value.textContent = '0';
      
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numValue) {
          currentValue = numValue;
          clearInterval(interval);
        }
        
        value.textContent = finalValue.replace(/[\d.]+/, Math.floor(currentValue).toLocaleString());
      }, 50);
    }
  });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
  setTimeout(animateKPICards, 500);
});

// Add responsive chart handling
window.addEventListener('resize', () => {
  setTimeout(refreshCharts, 100);
});

// Add chart interaction handlers
function addChartInteractions() {
  // Add click handlers for chart elements
  if (damageChart) {
    damageChart.options.onClick = function(event, elements) {
      if (elements.length > 0) {
        const index = elements[0].index;
        const data = appData.socialIssue.timeline[index];
        console.log('Selected data point:', data);
        // Could show detailed information about this data point
      }
    };
  }
  
  if (defenseChart) {
    defenseChart.options.onClick = function(event, elements) {
      if (elements.length > 0) {
        const index = elements[0].index;
        const method = appData.defenseComparison[index];
        console.log('Selected defense method:', method);
        // Could show detailed comparison
      }
    };
  }
}

// Initialize chart interactions after charts are created
setTimeout(addChartInteractions, 1000);

// Export for potential external use
window.dashboardApp = {
  refreshCharts,
  animateKPICards,
  appData
};