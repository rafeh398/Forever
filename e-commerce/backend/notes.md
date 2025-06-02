

During user registration, you only store the user's basic information (e.g., username, email, and hashed password) in the database, without generating or storing a refresh token. However, during user login, both an access token and a refresh token are generated. The refresh token is stored in the database to manage sessions and handle token revocation, while the access token is sent in the response body. The refresh token is also set in a secure HTTP-only cookie, which is sent with subsequent requests, allowing the user to refresh their session when the access token expires.

for logout remove refresh token from data base and clear cookie but question is whom to logout .so find current user using auth.middleware.js and log out that user only

auth.middleware.js => find current or logged in user.logged in user wo huga jo token bej rha huga request k sath ya headers se a rha huga wo token to apne decode krna wo ten jwt se or phr ager decode hue token waly user ki id db mein ha to user true ha


jb ADMIN  login huga then token admin k pass huga next request pe to hm aik middle ware bnaye ge jo check krega k ye admin ee ha (adminAuth.middleware.js)