$(document).ready(function(){
    // Open the first accordion section by default
    var firstAccordionBody = $('.accordion-body').eq(0);
    firstAccordionBody.slideDown();
    $('.accordion-header').eq(0).find('i').removeClass('fa-plus').addClass('fa-minus'); // Change icon to fa-minus

    // Toggle accordion sections on click
    $('.accordion-header').click(function(){
        var accordionBody = $(this).next('.accordion-body');
        
        // Close all accordion bodies except the one being clicked
        $('.accordion-body').not(accordionBody).slideUp();
        $('.accordion-header').not($(this)).find('i').removeClass('fa-minus').addClass('fa-plus');

        // Toggle the accordion body of the clicked header
        accordionBody.slideToggle();

        // Toggle the icon class based on accordion body visibility
        $(this).find('i').toggleClass('fa-plus fa-minus');
    });


    // Click event for opening popup
    $('.gallery-image').click(function(){
        var imageUrl = $(this).attr('src');
        $('.popup-image').attr('src', imageUrl);
        $('.popup-overlay, .popup').fadeIn();
    });

    // Click event for closing popup
    $('.close, .popup-overlay').click(function(){
        $('.popup-overlay, .popup').fadeOut();
    });
});
