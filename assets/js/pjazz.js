function pjazz( loadFrom, loadTo, linksFrom ) {

    // set the source element
    if ( loadFrom == "" || loadFrom == null || loadFrom == undefined ) {
      loadFrom = "body";
      var targetElem = loadFrom;
    } else {
      var targetElem = loadFrom;
    }

    // set the target element
    function doLinkSource( contentElem ) {
      if ( contentElem == "" || contentElem == null || contentElem == undefined ) {
        if ( loadTo == "" || loadTo == null || loadTo == undefined ) {
          loadTo = "body";
          var contentElem = loadTo;
          contentElem = document.getElementsByTagName ( contentElem );
        } else {
          var contentElem = loadTo;
          contentElem = document.getElementById( contentElem );
        }
      }
      doLinks( contentElem );
    }
    doLinkSource();

    // set the links - this is a function so we need to be able to call it again
    function doLinks( contentElem ) {
      if ( linksFrom == "" || linksFrom == null || linksFrom == undefined ) {
        linksFrom = "body";
        var linkList = document.getElementsByTagName( linksFrom )[0];
      } else {
        var linkList = document.getElementById( linksFrom );
      }
      // console.log( linksFrom );
      // console.log( linkList.getElementsByTagName( 'a' ) );
      var pjazzLinks = new Array(),
          externalLinks = new Array(),
          tmpLinks = linkList.getElementsByTagName( 'a' );
      for ( var i = 0; i < tmpLinks.length; i++ ) {
        link = tmpLinks[ i ];
        if ( link.rel != "external" ) {
          pjazzLinks.push( link );
        } else if ( link.rel == "external" ) {
          externalLinks.push( link );
        }
      }
      // so what happens to links that aren't external and aren't meant to be pjazz'd?
      // @TODO: Check to see if the link's host matches window.host - I imagine that's a can of worms
      prepareOutboundLinks( externalLinks ); // send our newly created links to a function to open them in a new window
      doLoad( pjazzLinks, contentElem );
    }

    function prepareOutboundLinks( externalLinks ) { // this is the end of a chain so no need to callback
      for ( var i = 0; i < externalLinks.length; i++ ) {
        externalLinks[ i ].onclick = function( event ) {
          event.preventDefault();
          var eLink = this;
          window.open( eLink.href, eLink.innerHTML, '' );
        }
      }
    }

    var xhr = new XMLHttpRequest(),
        tmpNodes = document.implementation.createHTMLDocument();


    function doLoad( pjazzLinks, contentElem ) {
      for (var i = 0; i < pjazzLinks.length; i++ ) {
        pjazzLinks[ i ].onclick = function( event ) {
          event.preventDefault();
          var pjlink = this.href,
              getProt = window.location.protocol,
              getHost = window.location.host,
              getPort = window.location.port;

          pjlink = pjlink.replace( getProt + "/", "" )
                         .replace( getHost + "/", "" )
                         .replace( getPort, "" );

          xhr.open( 'GET', pjlink, true );
          xhr.send( null );

          xhr.onreadystatechange = function() {
            var state = xhr.readyState,
                status = xhr.status;

            if ( state == 4 && status == 200 ){ // state loaded && server status 200 OK
              doParse( contentElem );
            } else if (
              state == 0 |
              state == 1 |
              state == 2 |
              state == 3
            ) {
              // ignore these states
            } else if ( status == 301 ) {
              console.log( "This content has been permamently moved" );
            } else if ( status == 302 ) {
              console.log( "The server is sending a 302 http message but probably means a 303 and it has been temporarily moved" );
            } else if ( status == 308 ) {
              console.log( "This content has been permamently redirected" );
            } else if ( status == 400 ) {
              console.log( "Bad Request" );
            } else if ( status == 401 ) {
              console.log( "You are not authorised to see this content" );
            } else if ( status == 403 ) {
              console.log( "You are forbidden from seeing this content" );
            } else if ( status == 404 ) {
              console.log( "This content was not found" );
            } else if ( status == 500 ) {
              console.log( "There was a problem with the server" );
            } else {
              // if it doesn't fit in any of the above then print out the state and status
              console.log( "readystate = ", state, "server status = ", state );
            }
          }
          tmpNodes.pjlink = pjlink; // let the pjlink out for other uses
        }
      }
    }

    function doParse( contentElem ) {
      var elemText = xhr.response,
          elemNodes = "";

      // sanitise the response so we can actually get useful stuff out of it
      elemText = elemText.replace( /<!doctype html>/i, "" )
                         .replace( "<html>", "" )
                         .replace( "</html>", "" );
      elemTextHead = elemText.replace( /<body>[\s\S]*?<\/body>/, "" );
      elemTextBody = elemText.replace( /<head>[\s\S]*?<\/head>/, "");
      tmpNodes.head.innerHTML = elemTextHead;
      tmpNodes.body.innerHTML = elemTextBody;

      elemNodes = tmpNodes.head.children; // change the page title - outside of the loop as it will be done no matter what
      for ( var i = 0; i < elemNodes.length; i++ ) {
        var node = elemNodes[i];
        if ( node.tagName == "TITLE" ) {
          newTitle = node.innerText;
          document.getElementsByTagName( 'title' )[ 0 ].innerText = newTitle;
        }
      }

      if ( targetElem == "body" ) {
        elemNodes = tmpNodes.body.innerHTML;
        contentElem[ 0 ].innerHTML = elemNodes; // don't bother iterating through the nodes as we want everything
      } else {
        elemNodes = tmpNodes.body.children; // we have a target name so we have to iterate through it to find the content we want
        for ( var i = 0; i < elemNodes.length; i++ ) {
          var node = elemNodes[ i ],
          newTitle = "";
          if ( node.id == targetElem ) {
            contentElem.innerHTML = node.innerHTML;
          }
        }
      }
      // history.pushState( '', newTitle, tmpNodes.pjlink ); // this pushes our link to the history
      doLinkSource( contentElem ); // once the content has been loaded into the body we need to collect the links again
    }

    // call this once when the script runs to grab the external links
    // if the content reloads an external link then it's catered for by the doLinks function above
    // anything outside of the scope of the replaced content is covered by this function instead
    function prepareOutboundLinks() {
      var links = document.body.getElementsByTagName( 'a' ),
          externalLinks = new Array();
      for ( var i = 0; i < links.length; i++ ) {
        var link = links[ i ];
        if ( link.rel == "external" ) {
          externalLinks.push( link );
        }
      }
      for ( var j = 0; j < externalLinks.length; j++ ) {
        externalLinks[ j ].onclick = function( event ) {
          event.preventDefault();
          var eLink = this;
          window.open( eLink.href, eLink.innerHTML, '' );
        }
      }
    }
    prepareOutboundLinks();

}
