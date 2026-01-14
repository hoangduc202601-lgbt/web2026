/**
 * Main JavaScript - Các chức năng chính cho trang web
 * Đã được điều chỉnh để hoạt động với Next.js
 */

(function ($) {
    "use strict";

    /*==================================================================
    [ Load page - For Next.js (No animsition loading) ]*/
    function initAnimsition() {
        try {
            // For Next.js: Don't use animsition loading, just ensure page is visible
            hideLoading();
            
            // Set body as loaded
            $('body').addClass('page-loaded');
            $('.animsition').addClass('animsition-loaded');
            
            // Make sure page is visible
            $('.animsition').css('opacity', '1');
            
        } catch (er) { console.log(er); }
    }
    
    /*==================================================================
    [ Hide Loading Screen - Remove any animsition loading elements ]*/
    function hideLoading() {
        try {
            // Remove any loading elements that animsition might have created
            var loadingEl = $('.animsition-loading-1, .animsition-loading');
            if (loadingEl.length > 0) {
                loadingEl.addClass('hide-loading');
                loadingEl.hide();
                // Remove from DOM
                setTimeout(function() {
                    loadingEl.remove();
                }, 100);
            }
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Back to top ]
    NOTE: This is now handled by React component BackToTop.tsx */
    function initBackToTop() {
        // Handled by React BackToTop component
    }

    /*==================================================================
    [ Fixed menu ]*/
    function initFixedMenu() {
        try {
            var wrapMainNav = $('.wrap-main-nav');
            if (wrapMainNav.length === 0) return;

            var posNav = wrapMainNav.offset().top;
            var menuDesktop = $('.container-menu-desktop');
            var mainNav = $('.main-nav');
            var lastScrollTop = 0;
            var st = 0;

            var fixedHeader = function () {
                st = $(window).scrollTop();

                if (st > posNav + mainNav.outerHeight()) {
                    $(menuDesktop).addClass('fix-menu-desktop');
                }
                else if (st <= posNav) {
                    $(menuDesktop).removeClass('fix-menu-desktop');
                }

                if (st > lastScrollTop) {
                    $(mainNav).removeClass('show-main-nav');
                }
                else {
                    $(mainNav).addClass('show-main-nav');
                }

                lastScrollTop = st;
            };

            $(window).off('scroll.fixedMenu resize.fixedMenu load.fixedMenu')
                .on('scroll.fixedMenu', fixedHeader)
                .on('resize.fixedMenu', fixedHeader)
                .on('load.fixedMenu', fixedHeader);

            // Run immediately
            fixedHeader();
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Menu mobile ]*/
    function initMobileMenu() {
        try {
            $('.btn-show-menu-mobile').off('click.mobileMenu').on('click.mobileMenu', function () {
                $(this).toggleClass('is-active');
                $('.menu-mobile').slideToggle();
            });

            var arrowMainMenu = $('.arrow-main-menu-m');

            arrowMainMenu.off('click.arrowMenu').on('click.arrowMenu', function () {
                $(this).parent().find('.sub-menu-m').slideToggle();
                $(this).toggleClass('turn-arrow-main-menu-m');
            });

            $(window).off('resize.mobileMenu').on('resize.mobileMenu', function () {
                if ($(window).width() >= 992) {
                    if ($('.menu-mobile').css('display') === 'block') {
                        $('.menu-mobile').css('display', 'none');
                        $('.btn-show-menu-mobile').removeClass('is-active');
                    }

                    $('.sub-menu-m').each(function () {
                        if ($(this).css('display') === 'block') {
                            $(this).css('display', 'none');
                            $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                        }
                    });
                }
            });
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Respon tab01 ]*/
    function initResponsiveTab() {
        try {
            $('.tab01').each(function () {
                var tab01 = $(this);
                var navTabs = $(this).find('.nav-tabs');
                var dropdownMenu = $(tab01).find('.nav-tabs>.nav-item-more .dropdown-menu');
                var navItem = $(tab01).find('.nav-tabs>.nav-item');

                var navItemSize = [];
                var size = 0;
                var wNavItemMore = 0;

                // Calculate sizes
                navItem.each(function () {
                    size += $(this).width();
                    navItemSize.push(size);
                });

                var responTab01 = function () {
                    if (navItemSize.length === 0) return;

                    if (navTabs.width() <= navItemSize[navItemSize.length - 1] + 1) {
                        $(tab01).find('.nav-tabs>.nav-item-more').removeClass('dis-none');
                    }
                    else {
                        $(tab01).find('.nav-tabs>.nav-item-more').addClass('dis-none');
                    }

                    wNavItemMore = $(tab01).find('.nav-tabs>.nav-item-more').hasClass('dis-none') ? 0 : $(tab01).find('.nav-tabs>.nav-item-more').width();

                    for (var i = 0; i < navItemSize.length; i++) {
                        if (navTabs.width() - wNavItemMore <= navItemSize[i] + 1) {
                            $(tab01).find('.nav-tabs .nav-item').remove();

                            for (var j = i - 1; j >= 0; j--) {
                                $(navTabs).prepend($(navItem[j]).clone());
                            }

                            for (var j = i; j < navItemSize.length; j++) {
                                $(dropdownMenu).append($(navItem[j]).clone());
                            }

                            break;
                        }
                        else {
                            $(tab01).find('.nav-tabs .nav-item').remove();

                            for (var j = i; j >= 0; j--) {
                                $(navTabs).prepend($(navItem[j]).clone());
                            }
                        }
                    }
                };

                $(window).off('resize.responsiveTab').on('resize.responsiveTab', responTab01);
                responTab01();
            });
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Play video 01 ]*/
    function initVideoModal() {
        try {
            var videoIframe = $('.video-mo-01').children('iframe');
            if (videoIframe.length === 0) return;

            var srcOld = videoIframe.attr('src');

            $('[data-target="#modal-video-01"]').off('click.videoModal').on('click.videoModal', function () {
                videoIframe[0].src += "&autoplay=1";

                setTimeout(function () {
                    $('.video-mo-01').css('opacity', '1');
                }, 300);
            });

            $('[data-dismiss="modal"]').off('click.videoModalClose').on('click.videoModalClose', function () {
                videoIframe[0].src = srcOld;
                $('.video-mo-01').css('opacity', '0');
            });
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Tab mega menu ]*/
    function initMegaMenuTab() {
        try {
            $('.sub-mega-menu .nav-pills > a').off('mouseenter.megaMenu').on('mouseenter.megaMenu', function () {
                $(this).tab('show');
            });
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Slide100 txt - Trending News Animation ]
    NOTE: This is now handled by React component TrendingNews.tsx
    Keeping empty function for compatibility */
    function initSlide100Txt() {
        // Handled by React TrendingNews component
    }

    /*==================================================================
    [ Auto scale banner text for mobile ]*/
    function initScaleBannerText() {
        try {
            function scaleBannerText() {
                // Chỉ chạy trên mobile
                if (window.innerWidth > 991) {
                    // Reset scale trên desktop
                    $('.banner-title, .banner-main, .banner-subtitle, .banner-title-mobile, .banner-main-mobile, .banner-subtitle-mobile').css('transform', 'scale(1)');
                    return;
                }

                // Scale cho desktop banner (nếu có)
                var container = $('.banner-text-container');
                if (container.length > 0) {
                    var containerWidth = container.width();
                    var padding = 20;
                    var maxWidth = containerWidth - padding;

                    $('.banner-title, .banner-main, .banner-subtitle').each(function () {
                        var $el = $(this);
                        $el.css('transform', 'scale(1)');
                        var textWidth = $el[0].scrollWidth;

                        if (textWidth > maxWidth && maxWidth > 0) {
                            var scale = maxWidth / textWidth;
                            scale = Math.max(scale, 0.5);
                            $el.css('transform', 'scale(' + scale + ')');
                        } else {
                            $el.css('transform', 'scale(1)');
                        }
                    });
                }

                // Scale cho mobile banner
                var mobileContainer = $('.banner-text-container-mobile');
                if (mobileContainer.length > 0) {
                    var mobileContainerWidth = mobileContainer.width();
                    var mobilePadding = 10;
                    var mobileMaxWidth = mobileContainerWidth - mobilePadding;

                    $('.banner-title-mobile, .banner-main-mobile, .banner-subtitle-mobile').each(function () {
                        var $el = $(this);
                        $el.css('transform', 'scale(1)');
                        var textWidth = $el[0].scrollWidth;

                        if (textWidth > mobileMaxWidth && mobileMaxWidth > 0) {
                            var scale = mobileMaxWidth / textWidth;
                            scale = Math.max(scale, 0.4);
                            $el.css('transform', 'scale(' + scale + ')');
                        } else {
                            $el.css('transform', 'scale(1)');
                        }
                    });
                }
            }

            // Run on load and resize
            scaleBannerText();

            $(window).off('resize.scaleBanner').on('resize.scaleBanner', function () {
                scaleBannerText();
            });

            // Re-run after fonts load
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(function () {
                    setTimeout(scaleBannerText, 100);
                });
            }
        } catch (er) { console.log(er); }
    }

    /*==================================================================
    [ Initialize all functions ]*/
    window.initMainJS = function () {
        initAnimsition();
        initBackToTop();
        initFixedMenu();
        initMobileMenu();
        initResponsiveTab();
        initVideoModal();
        initMegaMenuTab();
        initSlide100Txt();
        initScaleBannerText();
    };

    // Auto init on document ready
    $(document).ready(function () {
        window.initMainJS();
    });

    // Re-init on page navigation (for Next.js)
    if (typeof window !== 'undefined') {
        window.reinitMainJS = function () {
            // Re-initialize components that need refreshing after navigation
            initBackToTop();
            initFixedMenu();
            initResponsiveTab();
            initSlide100Txt();
            initScaleBannerText();
        };
    }

})(jQuery);
