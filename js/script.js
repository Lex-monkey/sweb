// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 平滑滚动到指定部分
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // 关闭移动端菜单
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 数字计数动画
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 20);
        });
    }

    // 滚动动画观察器
    function createScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // 如果是统计数字部分，启动计数动画
                    if (entry.target.classList.contains('stats-container')) {
                        animateCounters();
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll('.feature-card, .community-card, .step, .stats-container');
        animatedElements.forEach(el => observer.observe(el));
    }

    // 初始化滚动观察器
    createScrollObserver();

    // 复制服务器IP功能
    window.copyIP = function() {
        const serverIP = 'mc.none.ink';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(serverIP).then(() => {
                showNotification('服务器IP已复制到剪贴板！');
            }).catch(() => {
                fallbackCopyTextToClipboard(serverIP);
            });
        } else {
            fallbackCopyTextToClipboard(serverIP);
        }
    };

    // 备用复制方法
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('服务器IP已复制到剪贴板！');
        } catch (err) {
            showNotification('复制失败，请手动复制');
        }
        
        document.body.removeChild(textArea);
    }

    // 显示通知
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(300px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 3秒后移除
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 滚动到指定部分
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 鼠标粒子效果
    function createParticleEffect() {
        document.addEventListener('mousemove', function(e) {
            // 限制粒子生成频率
            if (Math.random() > 0.1) return;
            
            const particle = document.createElement('div');
            particle.className = 'mouse-particle';
            
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #3498db, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: particleFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            // 1秒后移除粒子
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1000);
        });
    }

    // 初始化粒子效果
    createParticleEffect();

    // 添加粒子动画CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // 视差滚动效果
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-blocks');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // 初始化视差效果
    initParallax();

    // 特色卡片悬停效果增强
    function enhanceFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateY(5deg)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateY(0deg)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
            
            // 鼠标移动跟踪效果
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    }

    // 初始化增强卡片效果
    enhanceFeatureCards();

    // 打字机效果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 为主标题添加打字机效果
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // 按钮点击涟漪效果
    function addRippleEffect() {
        const buttons = document.querySelectorAll('button, .cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (this.contains(ripple)) {
                        this.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }

    // 添加涟漪动画CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // 初始化涟漪效果
    addRippleEffect();

    // 滚动进度条
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.pageYOffset / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }

    // 初始化滚动进度条
    createScrollProgress();

    // 懒加载图片（如果有的话）
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // 初始化懒加载
    initLazyLoading();

    
    // Discord按钮点击事件
const discordBtn = document.querySelector('.discord-btn');
if (discordBtn) {
    discordBtn.addEventListener('click', function() {
        // 打开QQ群链接
        window.open('https://qm.qq.com/q/dRNO0hOOpa', '_blank');
        showNotification('正在跳转到QQ群...');
    });
}


    // 作品集按钮点击事件
    const galleryBtn = document.querySelector('.gallery-btn');
    if (galleryBtn) {
        galleryBtn.addEventListener('click', function() {
            showNotification('作品集功能正在开发中，敬请期待！');
        });
    }

    // 页面可见性API - 当用户切换标签页时改变标题
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '回来继续你的冒险！ - Lex的神奇服务器';
        } else {
            document.title = 'Lex的神奇服务器 - Minecraft服务器';
        }
    });

    console.log('🎮 Lex的神奇服务器网站已加载完成！');
    console.log('💎 感谢访问我们的服务器网站');
    console.log('🚀 准备好开始你的Minecraft冒险了吗？');
});

// 全局错误处理
window.addEventListener('error', function(e) {
    console.error('网站运行出现错误:', e.error);
});

// 性能监控
window.addEventListener('load', function() {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 页面加载时间: ${loadTime}ms`);
});

