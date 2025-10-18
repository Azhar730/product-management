📝 Project Description:

Build a backend API for a small marketplace platform where users can register, list products for sale, and place orders.
You can use any modern backend framework or language you’re comfortable with (e.g., Node.js express.js ).

🔧 Core Features
⿡ User Management

User registration (name, email, password, role = buyer/seller)

User login (JWT-based authentication)

Password must be hashed (e.g., bcrypt or similar)

Authenticated users can view and update their profile

⿢ Product Management (Seller Only)

Create a new product (title, description, price, stock)

Update or delete own products
 
View all products created by the seller

Everyone (buyers/sellers) can view all listed products

⿣ Order System (Buyer Only)

Place an order for a product

Reduce product stock automatically after successful order

View order history (user-specific)

⿤ Bonus (Optional)

Add pagination and filtering for products

Include product image upload (with any local or cloud storage solution)

Add a review/rating system