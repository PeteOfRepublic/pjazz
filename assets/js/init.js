window.onload = function(){

  var linkList = document.getElementById( 'links' ),
      pjazz = linkList.getElementsByTagName( 'a' ),
      contentElem = document.getElementById( 'content' ),
      targetElem = "content",
      xhr = new XMLHttpRequest(),
      tmpNodes = document.implementation.createHTMLDocument();

  var doParse = function() {
    var elemText = xhr.response,
        elemNodes = "";

    tmpNodes.body.innerHTML = elemText;
    elemNodes = tmpNodes.body.children;
    for ( var i = 0; i < elemNodes.length; i++ ) {
      var node = elemNodes[i];
      if ( node.id == targetElem ) {
        contentElem.innerHTML = node.innerHTML;
        history.pushState( '', 'Title', tmpNodes.pjlink );
      }
    }
  }

  for (var i = 0; i < pjazz.length; i++ ) {
    pjazz[i].onclick = function( event ) {
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
          doParse();
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
