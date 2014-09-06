// try to get the right function for animation
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

// animation start time
var start = null;
// the animation we are currently performing
var animation = null;
// the object we are animating
var animObj = null;

/// Update animations callback.
function step( timestamp ) {
    var progress;
    var maxtime = 500;

    if ( animObj === null ) return;
    if ( start === null ) start = timestamp; // why is === a thing

    progress = timestamp - start;

    if ( animation == "fadein" ) {
        animObj.style.opacity = progress / maxtime;
    } else if ( animation == "fadeout" ) {
        animObj.style.opacity = 1 - progress / maxtime;
    }

    if ( progress < maxtime ) {
        requestAnimationFrame( step );
    } else {
        start = null;

        if ( animation == "fadein" ) {
            animObj.style.opacity = 1;
        } else if ( animation == "fadeout" ) {
            animObj.style.opacity = 0;
        }

        animObj = null;
    }
}

/// Start the fade in animation for the given element.
function fadein( element ) {
    animation = "fadein";
    start = null;
    animObj = element;
    requestAnimationFrame( step );
}

/// Hide all <section>s and display the one with the given ID.
///
/// Works by manipulating `display` tag. If you add any more <section> tags you
/// might want to extend this code.
///
/// @param sectionid The `id` of the <section> tag to display
function show( sectionid ) {
    var allsections = document.getElementsByTagName( "section" );

    for ( i = 0; i < allsections.length; i++ ) { // why u no have foreach
        var sect = allsections[i];

        if ( sect.id == sectionid ) {
            sect.style.display = "block";

            fadein( sect );
        } else {
            sect.style.display = "none";
            sect.style.opacity = 0;
        }
    }
}