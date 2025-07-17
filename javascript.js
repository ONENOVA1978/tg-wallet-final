document.addEventListener('DOMContentLoaded', function() {
    // Profile modal
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModal = profileModal.querySelector('.close-modal');
    
    profileBtn.addEventListener('click', function() {
        profileModal.style.display = 'flex';
    });
    
    closeProfileModal.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });
    
    // Asset modals
    const assetItems = document.querySelectorAll('.asset-item');
    const assetModal = document.getElementById('asset-modal');
    const closeAssetModal = assetModal.querySelector('.close-modal');
    const assetModalTitle = document.getElementById('asset-modal-title');
    const currentPrice = document.getElementById('current-price');
    const priceChange = document.getElementById('price-change');
    const userAmount = document.getElementById('user-amount');
    
    assetItems.forEach(item => {
        item.addEventListener('click', function() {
            const asset = this.getAttribute('data-asset');
            const assetName = this.querySelector('.asset-name').textContent;
            const assetValue = this.querySelector('.value').textContent;
            const assetChange = this.querySelector('.change').textContent;
            const assetAmount = this.querySelector('.asset-amount').textContent;
            
            assetModalTitle.textContent = `График ${assetName}`;
            currentPrice.textContent = assetValue;
            priceChange.textContent = assetChange;
            userAmount.textContent = assetAmount;
            
            // Update chart based on asset
            updateAssetChart(asset);
            
            assetModal.style.display = 'flex';
        });
    });
    
    closeAssetModal.addEventListener('click', function() {
        assetModal.style.display = 'none';
    });
    
    // Exchange modal
    const exchangeBtn = document.getElementById('exchange-btn');
    const exchangeModal = document.getElementById('exchange-modal');
    const closeExchangeModal = exchangeModal.querySelector('.close-modal');
    
    exchangeBtn.addEventListener('click', function() {
        exchangeModal.style.display = 'flex';
    });
    
    closeExchangeModal.addEventListener('click', function() {
        exchangeModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Initialize asset chart
    function updateAssetChart(asset) {
        const ctx = document.getElementById('asset-chart').getContext('2d');
        
        // Destroy previous chart if exists
        if (window.assetChart) {
            window.assetChart.destroy();
        }
        
        // Sample data for different assets
        const dataSets = {
            'ton': [2.70, 2.75, 2.78, 2.80, 2.82, 2.81, 2.82],
            'btc': [82000, 83500, 84200, 85000, 85200, 85400, 85415],
            'usdt': [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]
        };
        
        window.assetChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['6ч', '5ч', '4ч', '3ч', '2ч', '1ч', 'Сейчас'],
                datasets: [{
                    data: dataSets[asset],
                    borderColor: '#3a7bfd',
                    backgroundColor: 'rgba(58, 123, 253, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
    
    // Initialize Telegram WebApp
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.expand();
        Telegram.WebApp.enableClosingConfirmation();
        
        // Add haptic feedback for buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function() {
                Telegram.WebApp.HapticFeedback.impactOccurred('light');
            });
        });
    }
});