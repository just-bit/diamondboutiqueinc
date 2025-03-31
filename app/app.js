'use strict';

import 'sumoselect';
//import intlTelInput from 'intl-tel-input';

// Depends
let $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('./modules/forms');
var Slider = require('./modules/slider');
var Popup = require('./modules/popup');
var LightGallery = require('./modules/lightgallery');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/mark.js/dist/jquery.mark.min');
require('../node_modules/jquery-validation/dist/jquery.validate.min');
//require('./modules/succinct/succinct');
//require('../node_modules/ez-plus/src/jquery.ez-plus');
// var swal = require('sweetalert2');


// Stylesheet entrypoint
import './assets/stylesheets/app.scss';

// Are you ready?
$(function () {
    new Forms();
    new LightGallery();
    new Popup();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
    }, 100);

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    /*   $(window).scroll(function () {
           var scrolled = $(window).scrollTop();

           if (scrolled > 200 && scrolled > scrollPrev) {
               header.addClass('fixed');
               $('body').addClass('hide-header');
           } else {
               header.removeClass('fixed');
               $('body').removeClass('hide-header');
           }
           scrollPrev = scrolled;
       });*/

    $('.go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 'smooth');
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".go-top").fadeIn(300);
        } else {
            $(".go-top").fadeOut(300);
        }
    });

    // header menu

    $('.header__collections-menu__main li a').on('mouseover', function () {
        var category = $(this).data('category'),
            $image = $(this).closest('.header__collections-submenu').find('.header__collections-menu__pic > img');
        $image.each(function () {
            var image = $(this).data('image');
            if (image === category) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
    });


    // header-search

    const $body = $('body');
    const $headerSearch = $('.header-search');
    const $searchInput = $headerSearch.find('input[type="search"]');
    const $searchResults = $headerSearch.find('.search-results');
    const $searchWrapper = $('.header-search__wrapper');
    const $clearButton = $headerSearch.find('.search-clear');
    const $searchBtn = $('.header-search__btn');
    const $closeBtn = $('.header-search__close');
    const $resultsContent = $searchResults.find('> ul');
    const $noResultsMessage = $searchResults.find('div p span');
    const $seeAllResults = $searchResults.find('> div > a');
    const $noResultsDiv = $searchResults.find('> div > div');
    let currentIndex = 0;

    $searchBtn.on('click', function (e) {
        e.stopPropagation();
        $body.addClass('search-shown');
        setTimeout(() => $searchInput.focus(), 200);
    });

    $closeBtn.on('click', function () {
        $body.removeClass('search-shown open-search-results');
        $searchWrapper.removeClass('focus active');
        $searchResults.hide();
    });

    $searchInput.on('input', function () {
        const hasValue = $(this).val().length > 0;
        $headerSearch.find('button').css('pointer-events', hasValue ? 'auto' : 'none');
        $clearButton.toggle(hasValue);
    }).on('keyup', function (e) {
        const searchVal = $(this).val().trim().toLowerCase();

        if (searchVal.length < 3) {
            $searchWrapper.removeClass('focus active');
            $searchResults.hide();
            $body.removeClass('open-search-results');
        } else {
            $searchWrapper.addClass('focus active');
            $searchResults.show();
            $body.addClass('open-search-results');
            updateSearchResults(searchVal);
        }
    }).on('keypress', function (e) {
        if (e.which === 13 && !$(this).val()) {
            e.preventDefault();
        }
    });

    $clearButton.on('click', function () {
        $searchInput.val('');
        $searchWrapper.removeClass('focus active');
        $searchResults.hide();
        $body.removeClass('open-search-results');
        $(this).hide();
    });

    $(document).on('click', function () {
        $body.removeClass('search-shown open-search-results');
        $searchWrapper.removeClass('focus active');
        $searchResults.hide();
    });

    $searchWrapper.add($searchBtn).add($searchResults).on('click', function (e) {
        e.stopPropagation();
    });

    function updateSearchResults(searchVal) {
        let matchesFound = false;

        $resultsContent.unmark({
            done: function () {
                $resultsContent.mark(searchVal, {
                    separateWordSearch: true,
                    done: function () {
                        $resultsContent.find('li').each(function () {
                            const itemText = $(this).find('span').text().toLowerCase();
                            if (itemText.includes(searchVal)) {
                                $(this).addClass('show');
                                matchesFound = true;
                            } else {
                                $(this).removeClass('show');
                            }
                        });
                        toggleResultsDisplay(matchesFound, searchVal);
                    }
                });
            }
        });
    }

    function toggleResultsDisplay(matchesFound, searchVal) {
        $noResultsMessage.text(searchVal);
        $seeAllResults.toggle(matchesFound);
        $noResultsDiv.toggle(!matchesFound);
        $resultsContent.toggleClass('highlighting-results', matchesFound);
        $searchResults.find('> div').toggleClass('no-results', !matchesFound);
    }

    // search results tooltips

    function positionTooltip($li) {
        const $tooltip = $li.find('.search-results-item__tooltip');
        const $tooltipInner = $tooltip.find('.search-results-item__tooltip-inner');
        const tooltipHeight = $tooltipInner.outerHeight();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        const liOffsetTop = $li.offset().top;

        let topPosition = liOffsetTop - scrollTop;

        const tooltipBottom = topPosition + tooltipHeight;

        if (tooltipBottom > windowHeight) {
            topPosition -= (tooltipBottom - windowHeight);
        }

        if (topPosition < 0) {
            topPosition = 0;
        }

        $tooltipInner.css('top', `${topPosition - liOffsetTop + scrollTop}px`);
    }

    $('.search-results-item').on('mouseenter', function () {
        const $li = $(this).closest('li');
        const $tooltip = $li.find('.search-results-item__tooltip');

        positionTooltip($li);

        $tooltip.css({
            visibility: 'visible',
            opacity: '1'
        });
    });

    $('.search-results-item__tooltip').on('mouseleave', function () {
        const $tooltip = $(this);
        $tooltip.css({
            visibility: 'hidden',
            opacity: '0'
        });
    });

    $('.search-results-item, .search-results-item__tooltip').on('mouseleave', function (event) {
        const $li = $(this).closest('li');
        const $tooltip = $li.find('.search-results-item__tooltip');

        if (!$(event.relatedTarget).closest('.search-results-item__tooltip').length) {
            $tooltip.css({
                visibility: 'hidden',
                opacity: '0'
            });
        }
    });

    $(window).on('resize', function () {
        $('.search-results-item').each(function () {
            const $li = $(this).closest('li');
            positionTooltip($li);
        });
    });

    // favorites

    $(document).on('click', '.product-main__fav:not(.active), .product-item__fav:not(.active)', function () {
        var elm = $(this);

        elm.addClass('active');

        var product_id = $(this).data("product_id");
        var product_name = $(this).data("product_name");
        var product_link = $(this).data("product_link");
        var product_image = $(this).data("product_image");
        var variation_id = $("input[name=variation_id]").val();
        var action = elm.attr('data-action');
        var action_type = elm.attr('type-action');
        var act = action;
        var quantity = $("input[name=quantity]").val();
        if (!quantity) {
            quantity = 1;
        }

        $('.fav-dialog__product-title').text(product_name);
        $('.fav-dialog__product').attr('href', product_link);
        $('.fav-dialog__product-pic').html('<img src="' + product_image + '" alt="' + product_name + '">');

        $.ajax({
            url: webtoffee_wishlist_ajax_add.add_to_wishlist,
            type: 'POST',
            data: {
                action: 'add_to_wishlist',
                product_id: product_id,
                variation_id: variation_id,
                act: act,
                quantity: quantity,
                wt_nonce: webtoffee_wishlist_ajax_add.wt_nonce
            },
            success: function (response) {
                var new_action = (action == 'remove' ? 'add' : 'remove');
                elm.attr('data-action', new_action);
                $('#fav-dialog').fadeIn();
                var count = parseInt($('.header__main-wishlist span').text().replace('Wishlist (', '').replace(')', ''));
                if (!count) {
                    count = 0;
                }
                if (action == 'add') {
                    $('.header__main-wishlist span').text('Wishlist (' + (count + quantity) + ')');
                    $('.header__main-wishlist').addClass('active');
                } else if (count - quantity > 0) {
                    $('.header__main-wishlist span').text('Wishlist (' + (count - quantity) + ')');
                    $('.header__main-wishlist').addClass('active');
                } else {
                    $('.header__main-wishlist span').text('Wishlist');
                    $('.header__main-wishlist').removeClass('active');
                }
            }
        });

        setTimeout(function () {
            $('#fav-dialog').fadeOut();
        }, 10000);
    });

    $('#fav-dialog-close').on('click', function () {
        $('#fav-dialog').fadeOut();
    });

    function checkIfWishlistIsEmpty() {
        if ($('.wishlist-popup .col-lg-3').length === 0) {
            $('.wishlist-popup').addClass('empty-wishlist');
        } else {
            $('.wishlist-popup').removeClass('empty-wishlist');
        }
    }

    $('.wishlist-popup-btn').click(function () {
        $('#fav-dialog').fadeOut();

        $.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: 'POST',
            data: {
                action: 'get_wishlist'
            },
            success: function (response) {
                $('#wishlist-popup .wishlist-items').html(response);

                if ($('#wishlist-popup .wishlist-items .product-item').length) {
                    $('.wishlist-popup__head .btn, .wishlist-popup__head .wishlist-clear__bar').show();
                } else {
                    $('.wishlist-popup__head .btn, .wishlist-popup__head .wishlist-clear__bar').hide();
                }

                $.magnificPopup.open({
                    items: {
                        src: '#wishlist-popup',
                        type: 'inline'
                    }
                });
            }
        });
    });

    $(document).on('click', '.product-main__fav.active, .product-item__fav.active', function (e) {
        e.stopPropagation();
        var $this = $(this);
        var isInWishlistPopup = $this.parents('.wishlist-popup').length > 0;
        var isInWishlistPage = $this.parents('.wishlist-page').length > 0;
        var itemRemoved = false;

        if (isInWishlistPopup) {
            $.magnificPopup.close();
        }

        setTimeout(function () {
            $.magnificPopup.open({
                items: {
                    src: '#fav-remove-confirmation',
                    type: 'inline'
                },
                callbacks: {
                    afterClose: function () {
                        if (!itemRemoved && isInWishlistPopup) {
                            setTimeout(function () {
                                $.magnificPopup.open({
                                    items: {
                                        src: '#wishlist-popup',
                                        type: 'inline'
                                    }
                                });
                            }, 100);
                        }
                    }
                }
            });
        }, 100);

        $('#fav-remove-ok-btn').off('click').on('click', function () {
            $('[data-product_id="'+$this.data('product_id')+'"]').removeClass('active');
            // $this.removeClass('active');
            if (isInWishlistPage || isInWishlistPopup) {
                itemRemoved = true;
            }

            if ($this.parents('.wishlist-popup__body').length)
                $this.closest('.col-lg-3').remove();

            checkIfWishlistIsEmpty();

            $.magnificPopup.close();

            var product_id = $this.data("product_id");
            var variation_id = $("input[name=variation_id]").val();
            var action = $this.attr('data-action');
            var act = action;
            var quantity = 1;

            $.ajax({
                url: webtoffee_wishlist_ajax_add.add_to_wishlist,
                type: 'POST',
                data: {
                    action: 'add_to_wishlist',
                    product_id: product_id,
                    variation_id: variation_id,
                    act: act,
                    quantity: quantity,
                    wt_nonce: webtoffee_wishlist_ajax_add.wt_nonce
                },
                success: function (response) {
                    var new_action = (action == 'remove' ? 'add' : 'remove');
                    $this.attr('data-action', new_action);
                    var count = parseInt($('.header__main-wishlist span').text().replace('Wishlist (', '').replace(')', ''));
                    if (!count) {
                        count = 0;
                    }
                    if (action == 'add') {
                        $('.header__main-wishlist span').text('Wishlist (' + (count + quantity) + ')');
                        $('.header__main-wishlist').addClass('active');
                    } else if (count - quantity > 0) {
                        $('.header__main-wishlist span').text('Wishlist (' + (count - quantity) + ')');
                        $('.header__main-wishlist').addClass('active');
                    } else {
                        $('.header__main-wishlist span').text('Wishlist');
                        $('.header__main-wishlist').removeClass('active');
                        $('.wishlist-popup__body.wishlist-items').html('<div class="wishlist-popup__empty">Your wishlist is empty! Let\'s add some items there!</div>');
                    }
                }
            });

            if (isInWishlistPopup) {
                setTimeout(function () {
                    $.magnificPopup.open({
                        items: {
                            src: '#wishlist-popup',
                            type: 'inline'
                        }
                    });
                }, 100);
            }
        });
    });

    $(document).on('click', '.wishlist-clear__btn', function () {
        $('.wishlist-popup .col-lg-3').remove();

        $('.wishlist-popup').addClass('empty-wishlist');
        $('.wishlist-popup__body.wishlist-items').html('<div class="wishlist-popup__empty">Your wishlist is empty! Let\'s add some items there!</div>');
        $('.wishlist-popup-btn').removeClass('active');
        $('.product-item__fav').removeClass('active');

        $.magnificPopup.close();

        setTimeout(function () {
            $.magnificPopup.open({
                items: {
                    src: '#wishlist-popup',
                    type: 'inline'
                }
            });
        }, 100);

        $.ajax({
            url: webtoffee_wishlist_ajax_add.add_to_wishlist,
            type: 'POST',
            data: {
                action: 'add_to_wishlist',
                act: 'clear',
                wt_nonce: webtoffee_wishlist_ajax_add.wt_nonce
            },
            success: function () {
                $('.header__main-wishlist span').text('Wishlist');
            }
        });
    });

    $(document).on('click', '.product-item .btn', function (e) {
        e.stopPropagation();
        var $this = $(this);
        var isInWishlistPopup = $this.closest('.wishlist-popup').length > 0;

        if (isInWishlistPopup) {
            $.magnificPopup.close();
        }

        setTimeout(function () {
            $.magnificPopup.open({
                items: {
                    src: '#order-one-click',
                    type: 'inline'
                },
                callbacks: {
                    afterClose: function () {
                        if (isInWishlistPopup) {
                            setTimeout(function () {
                                $.magnificPopup.open({
                                    items: {
                                        src: '#wishlist-popup',
                                        type: 'inline'
                                    }
                                });
                            }, 100);
                        }
                    }
                }
            });
        }, 100);
    });

    $(document).on('click', '.wishlist-popup__head .btn', function (e) {
        e.stopPropagation();
        var $this = $(this);
        var isInWishlistPopup = $this.closest('.wishlist-popup').length > 0;

        if (isInWishlistPopup) {
            $.magnificPopup.close();
        }

        setTimeout(function () {
            jQuery.post('/wp-admin/admin-ajax.php', {
                action: 'get_wishkist_share_link'
            }, function(response){
                jQuery('#wishlist-link').text(response);
                $.magnificPopup.open({
                    items: {
                        src: '#wishlist-share-popup',
                        type: 'inline'
                    },
                    fixedContentPos: true,
                    fixedBgPos: true,
                    callbacks: {
                        afterClose: function () {
                            if (isInWishlistPopup) {
                                setTimeout(function () {
                                    $.magnificPopup.open({
                                        items: {
                                            src: '#wishlist-popup',
                                            type: 'inline'
                                        }
                                    });
                                }, 100);
                            }
                        }
                    }
                });
            });
        }, 100);
    });

    checkIfWishlistIsEmpty();

    // slider refresh

    $(window).on('resize orientationchange', function () {
        if ($('.slick-slider').length) {
            setTimeout(function () {
                $('.slick-slider')[0].slick.refresh();
            }, 100);
        }
    });

    // select

    $('select.select').SumoSelect({
        forceCustomRendering: true
    });

    window.initSumo = function () {
        $('select.select').each(function () {
            $(this)[0].sumo.reload();
        });
        updateDataColor();
        updateOptionColors();
    };

    $('.search-select').on('sumo:opening', function () {
        $(this).closest('.input-wrapper').addClass('open');
    });
    $('.search-select').on('sumo:closing', function () {
        $(this).closest('.input-wrapper').removeClass('open');
    });

    $('.select, .search-select').change(function () {
        var val = $(this).val();
        if (!$(this).val() == '') {
            $(this).closest('.input-wrapper').removeClass('error err').addClass('active').find('.input').val(val);
            $(this).closest('.input-wrapper').find('label.error').remove();
            $(this).closest('.input-wrapper').find('.validate-error').remove();
        }
    });


  function updateParentClass(selectElement) {
        var $select = $(selectElement);
        var selectedValues = $select.val();

        if (selectedValues && selectedValues.length > 0) {
            $select.closest('.product-parameter__row').removeClass('no-selection');
        } else {
            $select.closest('.product-parameter__row').addClass('no-selection');
        }
    }

    $('.product-parameter__row .select').on('change', function() {
        updateParentClass(this);
    });


    // catalog filters

    $(document).on('click', '.catalog-filer__title', function () {
        $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
    });

    // catalog sort dropdown

    $(document).on('click', '.dropdown-sort-top', function () {
        $(this).closest('.dropdown-sort').toggleClass('open');
    });

    $(document).on('click', '.dropdown-sort-bot-item', function () {
        var val = $(this).html();
        var form = $(this).parents('form');
        var select = form.find('select');
        $(this)
            .closest('.dropdown-sort')
            .removeClass('open')
            .find('.dropdown-sort-top > .dropdown-sort-top-text')
            .html(val)
            .addClass('chosen');

        select.val($(this).data('value')).change();
        form.submit();
    });

    // product preview change pictures

    $(document).on('mouseover', '.product-item__color', function () {
        var color = $(this).data('color'),
            $image = $(this).closest('.product-item').find('.product-item__pic > img');
        $image.each(function () {
            var image_color = $(this).data('color');
            if (image_color === color) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
    });

    $(document).on('mouseleave', '.product-item__colors', function () {
        $(this).closest('.product-item').find('.product-item__pic > img').removeClass('active');
    });

    $(document).click(function () {
        $('.dropdown-sort').removeClass('open');
    });

    $(document).on('click', '.dropdown-sort', function (e) {
        e.stopPropagation();
    });

    // color select

    function updateDataColor() {
        var selectedOption = $('.color-select .select option:selected');
        var color = selectedOption.data('color');

        if (color) {
            var captionSpan = $('.color-select .SumoSelect .CaptionCont > span');
            captionSpan.attr('data-color', color);
            captionSpan.css('--selected-color', color);
        }
    }

    function updateOptionColors() {
        $('.color-select .select option').each(function (index) {
            var color = $(this).data('color');
            var optLi = $('.color-select .SumoSelect ul.options li.opt').eq(index);

            if (color) {
                optLi.css('--option-color', color);
            }
        });
    }

    $('.color-select .select').on('change', function () {
        updateDataColor();
    });

    updateDataColor();
    updateOptionColors();

    // product details

    $('.product-details__title').on('click', function () {
        $(this).toggleClass('active').next('.product-details__description').slideToggle();
    });

    // product share
    $('.product-buttons .btn-share').on('click touchstart', function () {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            $('#tooltip').addClass('show-tooltip');
            setTimeout(function () {
                $('#tooltip').removeClass('show-tooltip');
            }, 1000);
        }).catch(function (err) {
            console.log('Failed to copy: ', err);
        });
    });

    // wishlist share
    // var currentUrl = window.location.href;
    // $('#wishlist-link').text(currentUrl);
    $('#copy-icon').on('click touchstart', function () {
        var currentUrl = $('#wishlist-link').text();
        navigator.clipboard.writeText(currentUrl).then(function () {
            $('#copied-message').fadeIn(100);
            setTimeout(function () {
                $('#copied-message').fadeOut(200);
            }, 1000);
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
        });
    });

    // related-slider
    $('.related-slider').each(function () {
        var $slider = $(this);
        var $parentContainer = $slider.closest('.related-section');
        var $progressBar = $parentContainer.find('.related-progress');
        var $progressBarWrapper = $parentContainer.find('.related-progress-wrapper');
        var $prevArrow = $parentContainer.find('.related-prev');
        var $nextArrow = $parentContainer.find('.related-next');
        var $sliderWrapper = $parentContainer.find('.related-slider__wrapper');
        var $nav = $parentContainer.find('.related-slider__nav');

        function getSlidesToShow(slickInstance) {
            var slidesToShow = slickInstance.options.slidesToShow;

            if (slickInstance.options.responsive) {
                var responsiveSettings = slickInstance.options.responsive;
                var windowWidth = $(window).width();

                responsiveSettings.forEach(function (setting) {
                    if (windowWidth <= setting.breakpoint) {
                        slidesToShow = setting.settings.slidesToShow || slidesToShow;
                    }
                });
            }

            return slidesToShow;
        }

        function setProgressBarWidth() {
            var windowWidth = $(window).width();
            var wrapperOffsetLeft = $sliderWrapper.offset().left;
            var progressBarWidth = windowWidth - wrapperOffsetLeft;

            $progressBar.css('width', progressBarWidth + 'px');
        }

        function updateProgressBar(slick, nextSlide) {
            var slidesToShow = getSlidesToShow(slick);
            var totalSlides = slick.slideCount - slidesToShow;
            var stepCalc = (1 / totalSlides) * 100;
            var initialCalc = stepCalc * 1;
            var calc = initialCalc + (nextSlide / totalSlides) * (100 - initialCalc);
            var scaleValue = calc / 100;
            $progressBar
                .attr('aria-valuenow', calc)
                .css({
                    'transform-origin': 'left center',
                    'transform': 'scaleX(' + scaleValue + ')'
                });
        }

        $slider.on('init', function (event, slick) {
            var slidesToShow = getSlidesToShow(slick);
            var slidesCount = slick.slideCount;

            if (slidesCount <= slidesToShow) {
                $nav.hide();
                $progressBar.hide();
                $progressBarWrapper.hide();
            } else {
                $nav.show();
                $progressBar.show();
                $progressBarWrapper.show();
            }

            setProgressBarWidth();

            $(window).on('resize', function () {
                setProgressBarWidth();
            });
        });

        $slider.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows: true,
            swipeToSlide: true,
            touchThreshold: 10,
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 452,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            updateProgressBar(slick, nextSlide);
        });
        var slickInstance = $slider.slick('getSlick');
        var slidesToShow = getSlidesToShow(slickInstance);
        var totalSlides = slickInstance.slideCount - slidesToShow;
        var stepCalc = (1 / totalSlides) * 100;
        var initialCalc = stepCalc * 0.75;
        var initialScale = initialCalc / 100;

        $progressBar
            .attr('aria-valuenow', initialCalc)
            .css({
                'transform-origin': 'left center',
                'transform': 'scaleX(' + initialScale + ')'
            });
    });

    // reviews slider
    $('.reviews-slider').each(function () {
        var $slider = $(this);
        var $parentContainer = $slider.closest('.reviews-section');
        var $progressBar = $parentContainer.find('.reviews-progress');
        var $progressBarWrapper = $parentContainer.find('.reviews-progress-wrapper');
        var $prevArrow = $parentContainer.find('.reviews-prev');
        var $nextArrow = $parentContainer.find('.reviews-next');
        var $sliderWrapper = $parentContainer.find('.reviews-slider__wrapper');
        var $nav = $parentContainer.find('.reviews-slider__nav');

        function getSlidesToShow(slickInstance) {
            var slidesToShow = slickInstance.options.slidesToShow;

            if (slickInstance.options.responsive) {
                var responsiveSettings = slickInstance.options.responsive;
                var windowWidth = $(window).width();

                responsiveSettings.forEach(function (setting) {
                    if (windowWidth <= setting.breakpoint) {
                        slidesToShow = setting.settings.slidesToShow || slidesToShow;
                    }
                });
            }

            return slidesToShow;
        }

        function setProgressBarWidth() {
            var windowWidth = $(window).width();
            var wrapperOffsetLeft = $sliderWrapper.offset().left;
            var progressBarWidth = windowWidth - wrapperOffsetLeft;

            $progressBar.css('width', progressBarWidth + 'px');
        }

        function updateProgressBar(slick, nextSlide) {
            var slidesToShow = getSlidesToShow(slick);
            var totalSlides = slick.slideCount - slidesToShow;
            var stepCalc = (1 / totalSlides) * 100;
            var initialCalc = stepCalc * 1;
            var calc = initialCalc + (nextSlide / totalSlides) * (100 - initialCalc);
            var scaleValue = calc / 100;

            $progressBar
                .attr('aria-valuenow', calc)
                .css({
                    'transform-origin': 'left center',
                    'transform': 'scaleX(' + scaleValue + ')'
                });
        }

        $slider.on('init', function (event, slick) {
            var slidesToShow = getSlidesToShow(slick);
            var slidesCount = slick.slideCount;

            if (slidesCount <= slidesToShow) {
                $nav.hide();
                $progressBar.hide();
                $progressBarWrapper.hide();
            } else {
                $nav.show();
                $progressBar.show();
                $progressBarWrapper.show();
            }

            setProgressBarWidth();

            $(window).on('resize', function () {
                setProgressBarWidth();
            });
        });

        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows: true,
            swipeToSlide: true,
            touchThreshold: 10,
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
            responsive: [
                {
                    breakpoint: 1679,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            updateProgressBar(slick, nextSlide);
        });
        var slickInstance = $slider.slick('getSlick');
        var slidesToShow = getSlidesToShow(slickInstance);
        var totalSlides = slickInstance.slideCount - slidesToShow;
        var stepCalc = (1 / totalSlides) * 100;
        var initialCalc = stepCalc * 0.75;
        var initialScale = initialCalc / 100;

        $progressBar
            .attr('aria-valuenow', initialCalc)
            .css({
                'transform-origin': 'left center',
                'transform': 'scaleX(' + initialScale + ')'
            });
    });

    // faq

    $('.faq-item__head').on('click', function () {
        $(this).closest('.faq-item').toggleClass('active').siblings().removeClass('active');
        $(this).next('.faq-item__body').slideToggle().closest('.faq-item').siblings().find('.faq-item__body').slideUp();
    });

    // validation

    $('.validate-form').each(function () {
        var validate_form = $(this);
        validate_form.validate({
            rules: {
                email: {
                    email: true
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('error');
            },
            unhighlight: function (element) {
                $(element).parent().removeClass('error');
            },
            submitHandler: function (form) {
                if (validate_form.attr('id') == 'subscription-form') {
                    var data = validate_form.serializeArray().reduce(function (obj, item) {
                        obj[item.name] = {val: item.value, title: validate_form.find('[name="' + item.name + '"]').data('title')};
                        return obj;
                    }, {});

                    let info = getInfo();

                    $.extend(data, info);

                    let fd = new FormData();

                    fd.append('data', JSON.stringify(data));
                    let url = '/api.php';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: fd,
                        dataType: 'json',
                        //  data: $('#subscription-form').serialize(),
                        success: function (data) {
                            $.magnificPopup.open({
                                items: {
                                    src: '#reviews-popup-success'
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    function parseGetParams() {
        let $_GET = {};
        let __GET = window.location.search.substring(1).split('&');
        for (let i = 0; i < __GET.length; i++) {
            let getVar = __GET[i].split('=');
            $_GET[getVar[0]] = typeof (getVar[1]) == 'undefined' ? '' : getVar[1];
        }
        return $_GET;
    }

    function getInfo() {
        let keys = parseGetParams();

        let host_s = window.location.host + window.location.pathname.slice(0, -1);
        return {
            history: {title: '', val: history.length},
            js_user_agent: {title: '', val: getUserAgent(navigator.userAgent)},
            get: {title: 'Page', val: window.location.href},
            host: {title: '', val: host_s},
            utm_source: {
                title: 'Search engine',
                val: (typeof (keys['utm_source']) == 'undefined' ? '' : keys['utm_source'])
            },
            utm_campaign: {
                title: 'Campaign',
                val: (typeof (keys['utm_campaign']) == 'undefined' ? '' : keys['utm_campaign'])
            },
            utm_term: {
                title: 'Key',
                val: (typeof (keys['utm_term']) == 'undefined' ? '' : decodeURIComponent(keys['utm_term']))
            }
        };
    }

    function getUserAgent(u) {
        let ua = u.toLowerCase(),
            is = function (t) {
                return ua.indexOf(t) > -1;
            },
            g = 'gecko',
            w = 'webkit',
            s = 'safari',
            o = 'opera',
            m = 'mobile',
            h = document.documentElement,
            b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ?
                ('ie ie' + RegExp.$1) : is('firefox/2') ?
                    g + ' ff2' : is('firefox/3.5') ?
                        g + ' ff3 ff3_5' : is('firefox/3.6') ?
                            g + ' ff3 ff3_6' : is('firefox/3') ?
                                g + ' ff3' : is('gecko/') ?
                                    g : is('opera') ?
                                        o + (/version\/(\d+)/.test(ua) ?
                                            ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ?
                                                ' ' + o + RegExp.$2 : '')) : is('konqueror') ?
                                            'konqueror' : is('blackberry') ?
                                                m + ' blackberry' : is('android') ?
                                                    m + ' android' : is('chrome') ?
                                                        w + ' chrome' : is('iron') ?
                                                            w + ' iron' : is('applewebkit/') ?
                                                                w + ' ' + s + (/version\/(\d+)/.test(ua) ?
                                                                    ' ' + s + RegExp.$1 : '') : is('mozilla/') ?
                                                                    g : '', is('j2me') ?
                m + ' j2me' : is('iphone') ?
                    m + ' iphone' : is('ipod') ?
                        m + ' ipod' : is('ipad') ?
                            m + ' ipad' : is('mac') ?
                                'mac' : is('darwin') ?
                                    'mac' : is('webtv') ?
                                        'webtv' : is('win') ?
                                            'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ?
                                                'freebsd' : (is('x11') || is('linux')) ?
                                                    'linux' : '', 'js'];

        let c = b.join(' ');
        h.className += ' ' + c;
        return c;
    }

    $('[name="phone"]').on('input', function () {
        const input = $(this);
        let value = input.val();
        const pattern = /^[0-9\(\)\-\+\ ]*$/;
        if (value.startsWith(' ')) {
            value = value.trimStart();
        }
        if (!pattern.test(value)) {
            value = value.slice(0, -1);
        }
        value = value.replace(/\s{2,}/g, ' ');
        input.val(value);
    });

    // mobile menu button

    $('.mobile-btn').on('click', function () {
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');
        $('body').toggleClass('open-mobile-menu');
    });

    $('.mobile-menu__main li.menu-item-has-children.opened .sub-menu').css('display', 'block');
    $('.mobile-menu__main li.menu-item-has-children:not(.opened) .sub-menu').css('display', 'none');
    $('.mobile-menu__main li:not(.menu-item-has-children) a + span').remove();
    $('.mobile-menu__main .menu-item-has-children > span').on('click', function () {
        var menu_item = $(this).parent('li');
        $(this).next('ul').slideToggle();
        menu_item.toggleClass('opened');
    });

    // fixed filters button

    const $catalogItems = $('.catalog-items');
    const $catalogTopBar = $('.catalog-top__bar');
    const $pagination = $('.pagination');
    const $txtWrapper = $('.txt-wrapper');
    const $footer = $('.footer');
    const $catalogFiltersFixedBtn = $('.catalog-filters__fixed-btn');

    function checkBtnInView() {
        const catalogItemsInView = isInViewport($catalogItems);
        const catalogTopBarOutOfView = !isInViewport($catalogTopBar);
        const paginationOutOfView = !isInViewport($pagination);
        const txtWrapperOutOfView = !isInViewport($txtWrapper);
        const footerOutOfView = !isInViewport($footer);

        if (catalogItemsInView && catalogTopBarOutOfView && paginationOutOfView && txtWrapperOutOfView && footerOutOfView) {
            $catalogFiltersFixedBtn.addClass('active');
        } else {
            $catalogFiltersFixedBtn.removeClass('active');
        }
    }

    function isInViewport($element) {
        if (!$element.length) return false;
        const elementTop = $element.offset().top;
        const elementBottom = elementTop + $element.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    $(window).on('scroll resize', checkBtnInView);

    checkBtnInView();

// mobile filters
    $(document).on('click', '.catalog-products__filters-btn, .catalog-filters__fixed-btn', function () {
        $('.catalog-mob__filters').addClass('active');
        $('body').addClass('filters-opened');
    });

    $(document).on('click', '.catalog-mob__filters-close', function () {
        $('.catalog-mob__filters').removeClass('active');
        $('body').removeClass('filters-opened');
    });

    $('.header__main-wishlist').magnificPopup({
        callbacks: {
            beforeOpen: function () {
                $('body').addClass('wishlist-opened');
            },
            afterClose: function () {
                $('body').removeClass('wishlist-opened');
            }
        }
    });

    $.extend(true, $.magnificPopup.defaults, {
        fixedContentPos: true,
        fixedBgPos: true
    });


    // Load More
    $(document).on('click', '.load-more', function () {
        let $button = $(this);
        $button.text('Loading');
        let link = $('.pagination .current + li > a');
        if (link.length) {
            let newLink = link.attr('href').replace(/\?paged=(\d+)/, 'page/$1');
            $.ajax({
                url: newLink,
                type: 'GET',
                success: function (response, data) {
                    if ($('.catalog-items').length) {
                        $('.catalog-items').append($(response).find('.catalog-items').html());
                    } else if ($('.js-items').length) {
                        $('.js-items').append($(response).find('.js-items').html());
                    } else if ($('.reviews-main__wrapper').length) {
                        $('.reviews-main__wrapper').append($(response).find('.reviews-main__wrapper').html());
                    }

                    $('.pagination').html($(response).find('.pagination').html());
                    history.pushState("", document.title, newLink);
                },
                complete: function () {
                    $button.text('Load More');
                }
            });
        }
    });

    window.open_one_click_form = function () {
        $.magnificPopup.open({
            items: {
                src: '#order-one-click'
            },
            type: 'inline'
        }, 0);
    };

    window.open_success_popup = function () {
        $.magnificPopup.open({
            items: {
                src: '#order-one-click-success'
            }
        });

        setTimeout(function () {
            $.magnificPopup.close();
        }, 6000);
    };

    window.changeProductSlide = function (index) {
        $('.product-main__slider').slick('slickGoTo', index);
    }

    $(document).on('click', '.popup-btn-ok', function () {
        $.magnificPopup.close();
    });


    $('.product-main__slider .slick-slide img').each(function (index){
        if(index){
            let alttitle = $(this).attr('alt');
            $(this).attr('alt', alttitle + ' - ' + (index + 1));
            $(this).attr('title', alttitle + ' - ' + (index + 1));
        }
    });

    $('.product-item').each(function (i){
        $(this).find('.product-item__pic img').each(function (j){
            if(j){
                let alttitle = $(this).attr('alt');
                $(this).attr('alt', alttitle + ' - ' + (j + 1));
                $(this).attr('title', alttitle + ' - ' + (j + 1));
            }
            if(!j){
                $(this).attr('itemprop', 'contentUrl');
                $(this).closest('.product-item__pic').append('<meta content="' +  $(this).attr('width') + '" itemprop="width" />');
                $(this).closest('.product-item__pic').append('<meta content="' +  $(this).attr('height') + '" itemprop="height" />');
            }
        });

    });


    $('form.contacts-form').on('sent', function (){
        gtag("event", "Send_Form_Contact_Us", {send_to: "G-752ZFM0122"})
    });


    $('.instagram-gallery__actions .instagram-section__btn').attr('rel', "nofollow");

    // chat
    setTimeout(function() {
        let styleTag = $("<style>#podium-bubble, #podium-prompt { opacity: 1 !important; visibility: visible !important; }</style>");
        $("head").append(styleTag);
    }, 15000);

});
