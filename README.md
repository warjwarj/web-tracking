install node and mongodb
'npm i' in main working dir to install package dependancys
'npm run devstart' to start server
logins created can be viewed from mongo compass, should have installed with mongo

bugs:

 - issue where not all markers are being drawn on page load is due to the browser clearing markers and api returning last dataset it sent to us. In order to fix redirect to a loading page in meantime and when countdown has elapsed direct them to the page

 - issue where multiple elements are being re-drawn, check for id on elements and draw if not there.

todo:

 - GET AN SSL CERTIFICATE - NOT SECURE WITHOUT

 - CHECK AUTHENTICATED ON REQUEST TO PROXY ROUTE
