"use strict";

$(document).ready(function () {
  // === slider ===
  var mySwiper = new Swiper('.our-projects .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.our-projects .swiper-next',
      prevEl: '.our-projects .swiper-prev'
    },
    breakpoints: {
      808: {
        slidesPerView: 2
      }
    }
  });
  var mySwiper_2 = new Swiper('.equipment-rental-box .swiper-container', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.equipment-rental-box .swiper-next',
      prevEl: '.equipment-rental-box .swiper-prev'
    }
  }); // === / slider ===
  // === Scroll top ===

$.fn.scrollToTop = function () {
    $(this).hide().removeAttr("href");

    if ($(window).scrollTop() != "0") {
      $(this).fadeIn("slow");
    }

    var scrollDiv = $(this);
    $(window).scroll(function () {
      if ($(window).scrollTop() == "0") {
        $(scrollDiv).fadeOut("slow");
      } else {
        $(scrollDiv).fadeIn("slow");
      }
    });
    $(this).click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
    });
  };
});

$("#scroll-top").scrollToTop();

// === / Scroll top ===

$(function () {
  // === tabs ===

  if ($(".tab__label").length > 0) {
    var tab = $(".tab__label"),
        tabCatalogElement = $('.catalog-box .grid-box'),
        tabCatalog = $(".catalog .tab__label");
    $(tab).on('click', function () {
      tab.removeClass('tab__label_active');
      $(this).addClass('tab__label_active');
    });
    $(tabCatalog).on('click', function () {
      var active = $(this).index();
      tabCatalogElement.hide();
      tabCatalogElement.eq(active).show();
    });
  } // === / tabs ===
  // === nav-mobile ===


  if ($(window).width() < 808) {
    var btnNav = $('.btn-nav'),
        nav = $('.nav-container');
    $(btnNav).on('click', function () {
      $(this).toggleClass('active');
      $(nav).toggleClass('nav-container_active');
    });
  } // === / nav-mobile ===

});